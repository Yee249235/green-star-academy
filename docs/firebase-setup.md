# 开启云同步（Firebase，免费，约 5 分钟）

完成后，手机和电脑登录同一个 Google 账号，星星、练习记录、阅读次数、学习时长会自动同步。
不做这一步也能正常使用网站，记录只保存在当前浏览器里，可用「设置 → 数据备份」手动搬运。

## 1. 创建 Firebase 项目
1. 打开 https://console.firebase.google.com/ ，用 Google 账号登录。
2. 点「创建项目」（Create a project），名字填 `green-star-academy`。
3. Google Analytics 可以关闭，点「创建项目」。

## 2. 添加网页应用，拿到配置
1. 项目首页点 `</>`（网页）图标。
2. 应用名称填 `green-star-academy`，**不要**勾选 Firebase Hosting，点「注册应用」。
3. 页面会显示一段 `const firebaseConfig = { … }`，把整段复制下来。

## 3. 打开 Google 登录
1. 左侧菜单「构建 → Authentication」→「开始使用」。
2. 「登录方法」里选择 **Google**，启用，选一个支持邮箱，保存。
3. 「设置 → 已获授权的网域」里点「添加网域」，填 `yee249235.github.io`。

## 4. 创建数据库并设置规则
1. 打开 Firestore 页面，再点「创建数据库」。新版控制台的菜单名称常有变化，最稳的方法是直接在浏览器打开 `https://console.firebase.google.com/project/你的项目ID/firestore`；项目 ID 可以在「项目设置」里看到。也可以在控制台顶部的搜索框输入 `Firestore`，或在左侧「数据库和存储」（Databases & Storage）分类里找。手机上左侧菜单默认收起，要先点左上角的 ☰。
2. 位置选 `asia-northeast1`（东京），以「生产模式」创建。
3. 打开「规则」标签，把仓库里 `firestore.rules` 的内容整段粘贴进去，点「发布」。
   规则的意思是：只有登录的本人能读写自己的记录，其他人都不能访问。

## 5. 把配置交给 Claude（或自己填）
把第 2 步复制的 `firebaseConfig` 发给 Claude，或者自己粘贴到 `src/data/firebase-config.js`：

```js
export const firebaseConfig = {
  apiKey: '…',
  authDomain: '….firebaseapp.com',
  projectId: '…',
  appId: '…',
};
```

推送后网站自动更新。之后在「设置 → 账号与云同步」点「使用 Google 登录」即可。
这些配置值不是密码，放在公开仓库里是正常做法；数据安全由第 4 步的规则保证。

免费额度（Spark 方案）：每天 5 万次读取、2 万次写入、1 GiB 存储，个人使用远远用不完；超出也只会暂停到第二天，不会扣费。
