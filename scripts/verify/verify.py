#!/usr/bin/env python3
"""用 SymPy 独立验算每道例题的标准答案。

用法：node scripts/export-verify.js | python3 scripts/verify/verify.py
任何一题不一致 → 打印详情并以状态 1 退出（构建与发布中止）。

支持的 verify 类型：
  limit       {expr, var, to, dir?('+'|'-'), expected}
  recurrence  {a1, next(用 a 表示 a_n), expected}       数值迭代后与 expected 比较
  sequence    {formula(用 k 表示项数), a1, next, terms}  通项公式与递推逐项一致
  ivt         {f, a, b}                                端点异号且区间内确有实根
  equal       {lhs, rhs}                               两个表达式（或矩阵、列表）相等；lhs 可写 diff/integrate/Matrix 等计算
  antiderivative {integrand, answer, var?}             d(answer)/dx 与被积函数恒等（不定积分）
  ode         {ode, solution}                          用 checkodesol 检查解满足微分方程（y 写作 y(x)）
  eigen       {matrix, values}                         特征值（含重数）一致
  all         {items: [...]}                           多项同时成立
"""
import json
import sys

import sympy as sp

x, y, z, t, k = sp.symbols('x y z t k', real=True)
n = sp.Symbol('n', positive=True)
a = sp.Symbol('a', real=True)
r = sp.Symbol('r', positive=True)
theta, u, v, w, s, m, lam = sp.symbols('theta u v w s m lambda', real=True)
phi, rho = sp.symbols('phi rho', real=True)
C1, C2, C = sp.symbols('C1 C2 C')
f_ = sp.Function('f')
y_ = sp.Function('y')
NS = {'phi': phi, 'rho': rho, 'C1': C1, 'C2': C2, 'C': C, 'r': r, 'theta': theta, 'u': u, 'v': v, 'w': w, 's': s, 'm': m, 'lam': lam, 'f': f_, 'Matrix': sp.Matrix, 'Rational': sp.Rational, 'x': x, 'y': y, 'z': z, 't': t, 'k': k, 'n': n, 'a': a, 'e': sp.E, 'E': sp.E, 'pi': sp.pi, 'oo': sp.oo}


def S(s):
    return sp.sympify(s, locals=NS)


def same(got, expected):
    if isinstance(got, (list, tuple)) or isinstance(expected, (list, tuple)):
        if not isinstance(got, (list, tuple)) or not isinstance(expected, (list, tuple)) or len(got) != len(expected):
            return False
        return all(same(sp.sympify(g), sp.sympify(e)) for g, e in zip(got, expected))
    if isinstance(got, sp.MatrixBase) or isinstance(expected, sp.MatrixBase):
        try:
            return got.shape == expected.shape and (got - expected).applyfunc(sp.simplify).is_zero_matrix
        except Exception:
            return False
    if got == expected:
        return True
    if got.has(sp.oo, -sp.oo, sp.zoo, sp.nan) or expected.has(sp.oo, -sp.oo):
        return False
    try:
        return sp.simplify(got - expected) == 0
    except Exception:
        return False


def check(v):
    kind = v['type']
    if kind == 'all':
        msgs = [check(i) for i in v['items']]
        bad = [m for m in msgs if m]
        return '；'.join(bad) if bad else None

    if kind == 'limit':
        var = NS[v['var']]
        to = S(v['to'])
        d = v.get('dir', '+-')
        expr = S(v['expr'])
        if d == '+-' and to in (sp.oo, -sp.oo):
            d = '+' if to == -sp.oo else '-'
        got = sp.limit(expr, var, to, dir=d)
        exp = S(v['expected'])
        return None if same(got, exp) else f"极限 {v['expr']}（{v['var']}→{v['to']}{'' if d == '+-' else d}）SymPy 得到 {got}，答案写的是 {exp}"

    if kind == 'recurrence':
        val = sp.N(S(v['a1']), 60)
        nxt = S(v['next'])
        for _ in range(200):
            val = sp.N(nxt.subs(a, val), 60)
        exp = sp.N(S(v['expected']), 60)
        return None if abs(val - exp) < sp.Float('1e-30') else f"递推数列数值极限约为 {sp.N(val, 15)}，答案写的是 {v['expected']}"

    if kind == 'sequence':
        nxt = S(v['next'])
        formula = S(v['formula'])
        val = S(v['a1'])
        for i in range(1, int(v.get('terms', 8)) + 1):
            f_i = sp.nsimplify(formula.subs(k, i))
            if sp.simplify(f_i - val) != 0:
                return f"通项公式第 {i} 项为 {f_i}，递推得到 {val}"
            val = sp.simplify(nxt.subs(a, val))
        return None

    if kind == 'ivt':
        f = S(v['f'])
        lo, hi = S(v['a']), S(v['b'])
        fa, fb = f.subs(x, lo), f.subs(x, hi)
        if not (fa * fb < 0):
            return f"端点函数值 f(a)={fa}, f(b)={fb} 不异号"
        roots = [r for r in sp.real_roots(sp.Poly(f, x))] if f.is_polynomial(x) else []
        if f.is_polynomial(x) and not any(lo < r < hi for r in roots):
            return '区间内没有实根'
        return None

    if kind == 'equal':
        lhs, rhs = S(v['lhs']), S(v['rhs'])
        if same(lhs, rhs):
            return None
        try:
            if sp.simplify(sp.expand_log(sp.expand_trig(lhs - rhs), force=True)) == 0:
                return None
        except Exception:
            pass
        return f"{v['lhs']} = {lhs}，与 {v['rhs']} 不一致"

    if kind == 'less':
        lv, rv = sp.N(S(v['lhs']), 30), sp.N(S(v['rhs']), 30)
        return None if lv < rv else f"{v['lhs']} ≈ {lv} 不小于 {v['rhs']} ≈ {rv}"

    if kind == 'antiderivative':
        var = NS[v.get('var', 'x')]
        d = sp.simplify(sp.diff(S(v['answer']), var) - S(v['integrand']))
        if d != 0:
            d = sp.simplify(sp.trigsimp(d))
        return None if d == 0 else f"对答案 {v['answer']} 求导与被积函数 {v['integrand']} 相差 {d}"

    if kind == 'ode':
        L = {**NS, 'y': y_}
        ok, rest = sp.checkodesol(sp.sympify(v['ode'], locals=L), sp.sympify(v['solution'], locals=L))
        return None if ok else f"解 {v['solution']} 不满足方程（代入后余下 {rest}）"

    if kind == 'eigen':
        got = sp.Matrix(S(v['matrix'])).eigenvals()
        exp = {}
        for val in v['values']:
            e = S(val)
            exp[e] = exp.get(e, 0) + 1
        ok = len(got) == len(exp) and all(any(sp.simplify(g - e) == 0 and got[g] == m for g in got) for e, m in exp.items())
        return None if ok else f"特征值应为 {got}，答案写的是 {v['values']}"

    return f"未知的 verify 类型：{kind}"


def main():
    items = json.load(sys.stdin)
    failed = 0
    for it in items:
        try:
            msg = check(it['verify'])
        except Exception as exc:  # noqa: BLE001
            msg = f'验算出错：{exc}'
        if msg:
            failed += 1
            print(f"  ✗ {it['id']}\n    {msg}", file=sys.stderr)
    if failed:
        print(f'\n✗ SymPy 验算失败：{failed} / {len(items)} 题', file=sys.stderr)
        sys.exit(1)
    print(f'✓ SymPy 验算通过：{len(items)} 题')


if __name__ == '__main__':
    main()
