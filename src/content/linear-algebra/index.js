// 线性代数：章节目录（以水本久《線形代数学の基礎》与考试大纲为路标）
import { sampleMatrixOps } from './sample-matrix-ops.js';

export const linearAlgebra = {
  id: 'la',
  name: { zh: '线性代数', ja: '線形代数', kana: 'せんけいだいすう' },
  textbook: '水本久《線形代数学の基礎》',
  chapters: [
    { id: 'vectors', no: 1, name: { zh: '向量', ja: 'ベクトル', kana: 'ベクトル' } },
    { id: 'matrices', no: 2, name: { zh: '矩阵', ja: '行列', kana: 'ぎょうれつ' } },
    { id: 'matrix-operations', no: 3, name: { zh: '矩阵运算', ja: '行列の演算', kana: 'ぎょうれつのえんざん' }, ...sampleMatrixOps },
    { id: 'linear-systems', no: 4, name: { zh: '线性方程组', ja: '連立一次方程式', kana: 'れんりついちじほうていしき' } },
    { id: 'elementary-operations', no: 5, name: { zh: '矩阵的基本变形', ja: '行列の基本変形', kana: 'ぎょうれつのきほんへんけい' } },
    { id: 'inverse', no: 6, name: { zh: '逆矩阵', ja: '逆行列', kana: 'ぎゃくぎょうれつ' } },
    { id: 'determinants', no: 7, name: { zh: '行列式', ja: '行列式', kana: 'ぎょうれつしき' } },
    { id: 'independence', no: 8, name: { zh: '向量的线性无关与线性相关', ja: 'ベクトルの一次独立・一次従属', kana: 'ベクトルのいちじどくりつ・いちじじゅうぞく' } },
    { id: 'vector-spaces', no: 9, name: { zh: '向量空间', ja: 'ベクトル空間', kana: 'ベクトルくうかん' } },
    { id: 'basis-dimension', no: 10, name: { zh: '基底与维数', ja: '基底と次元', kana: 'きていとじげん' } },
    { id: 'linear-maps', no: 11, name: { zh: '线性映射', ja: '線形写像', kana: 'せんけいしゃぞう' } },
    { id: 'eigen', no: 12, name: { zh: '特征值与特征向量', ja: '固有値・固有ベクトル', kana: 'こゆうち・こゆうベクトル' } },
    { id: 'diagonalization', no: 13, name: { zh: '矩阵的对角化', ja: '行列の対角化', kana: 'ぎょうれつのたいかくか' } },
    { id: 'inner-product', no: 14, name: { zh: '内积', ja: '内積', kana: 'ないせき' } },
    { id: 'orthogonalization', no: 15, name: { zh: '正交化', ja: '直交化', kana: 'ちょっこうか' } },
    { id: 'quadratic-forms', no: 16, name: { zh: '二次型', ja: '二次形式', kana: 'にじけいしき' } },
  ],
};
