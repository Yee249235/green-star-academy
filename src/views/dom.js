// 极简模板工具：html`` 自动转义插值，raw() 标记已是安全 HTML 的片段
const RAW = Symbol('raw');

export function raw(str) {
  return { [RAW]: true, value: String(str) };
}

export function esc(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function render(value) {
  if (value == null || value === false) return '';
  if (Array.isArray(value)) return value.map(render).join('');
  if (typeof value === 'object' && value[RAW]) return value.value;
  return esc(value);
}

export function html(strings, ...values) {
  let out = strings[0];
  values.forEach((v, i) => {
    out += render(v) + strings[i + 1];
  });
  return raw(out);
}

/** 把 html`` 结果写进元素 */
export function mount(el, fragment) {
  el.innerHTML = render(fragment);
}
