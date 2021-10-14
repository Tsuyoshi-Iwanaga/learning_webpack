# webpack

## 動作環境

```
Node.js v14.15.4
npm v6.14.10
webpack v5.30.0
webpack-cli v4.6.0
```

## webpackの概要

フロントエンド開発用の**モジュールバンドラ**
複数のJSファイル(モジュール)の依存性を解決し、一つにまとめてくれるツール

また**ローダー**や**プラグイン**といった仕組みを用いることで、上記以外の色々な処理を挟むことができる

webpackでよく使われる用語は次の通り

* モジュール : webpackでまとめる元となるファイル(JS以外にもCSSや画像もモジュールとして扱える)
* エントリーポイント : webpackがファイルをまとめる際に最初に解析を始めるファイル
* バンドル : webpackでまとめられたファイル
* ビルド : バンドルを生成するまでの一連の処理

### package.jsonの生成

```shell
cd webpack-sample
npm init -y #-yをつけるとデフォルトの雛形を使ってpackage.jsonが生成される
```

```json
{
  "name": "learning_webpack",
  "version": "1.0.0",
  "description": "## 動作環境",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/Tsuyoshi-Iwanaga/learning_webpack.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/Tsuyoshi-Iwanaga/learning_webpack/issues"
  },
  "homepage": "https://github.com/Tsuyoshi-Iwanaga/learning_webpack#readme"
}
```

不要な記述は削除して問題なし

```json
{
  "name": "learning_webpack",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

### webpackのインストール

```shell
npm install --save-dev webpack@5.30.0 webpack-cli@4.6.0
```

```json
{
  "name": "learning_webpack",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "devDependencies": {
    "webpack": "^5.30.0",
    "webpack-cli": "^4.6.0"
  }
}
```

### 試しにjqueryをインストールしてみる

```shell
npm install --save jquery@3.6.0
```

```json
{
  "name": "learning_webpack",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "devDependencies": {
    "webpack": "^5.30.0",
    "webpack-cli": "^4.6.0"
  },
  "dependencies": {
    "jquery": "^3.6.0"
  }
}
```

### devDependenciesとdependenciesの違いについて

簡単に言うとバンドルを生成するために必要なモジュールはdevDependencies、出力されるバンドル自体に含めたいモジュールはdependenciesに指定しておく
そうして分類しておくと例えば本番環境ではdevDependenciesはインストールしないみたいな運用も可能になる

モジュールのインストール時に--save-devをつけるとdevDependencies、--saveをつけるとdependenciesになる

### npmスクリプトへの登録

webpackは以下のコマンドで実行することが可能

```shell
node_modules/.bin/webpack
```

ただし通常はnpm scriptsというものを経由して実行する
package.jsonを下記のように更新する

```json
  "scripts": {
    "build": "webpack"
  },
```

```shell
npm run build
```

npm scripts経由で実行することでプロジェクト内でよく使われるコマンドを明示することができる
これにより新しい開発メンバーが入ってきた場合にもどのようなコマンドを使ってビルドすれば良いのか分かりやすくなる

### webpack.config.js(設定ファイル)を作成する

プロジェクト直下に下記のようなファイルを作成する

```js
const path = require("path")

module.export = {
  mode: 'development', //develop production none
  entry: './src/js/app.js', //エントリーポイント
  output: {
    //絶対パスを指定、OSにより指定が異なるのでpathモジュールを使う
    path: path.resoleve(__dirname, 'public'), 
    filename: 'js/bundle.js',
  }
}
```

modeは必須、developmentを指定するとソースマップが出力されるなど開発に便利なバンドルを生成する
一方productionでは圧縮やモジュールの最適化など本番で使うのに適したバンドルを生成する

### モジュールを作成してみる

src/js/modules/math.js

```js
export function add(num1, num2) {
  return num1 + num2
}

export function subtract(num1, num2) {
  return num1 - num2
}
```

### エントリーポイントを作成する

src/js/app.js

```js
import $ from 'jquery'
import { add, subtract } from './modules/math'

const item1Price = 400
const item2Price = 600
const coupon = 300
const totalPrice = add(item1Price, item2Price)
const priceAfterApplyCoupon = subtract(totalPrice, coupon)

$('body').text(priceAfterApplyCoupon)
```

### exportとimportについて

ES Modulesという仕様での書き方、現在はこの書き方でモジュールを扱うのが一般的

例えばこのようなモジュールがあったとする

```js
export const add = (n, n2) => n + n2
export const sub = (n, n2) => n - n2
```

以下のように読み込み先ではいろんな記述ができる

```js
//addだけを読み込む(subは読み込まれない)
import { add } from './math.js'

//addとsubを読み込む、subはSubとして別名をつける
import { add, sub as Sub } from './math.js'

//エクスポートされたものをまとめて読み込む、math.addやmath.subのように使える
import * as math from './math.js'
```

また読み込み元でデフォルトエクスポートを指定することも可能

```js
const add = (n, n2) => n + n2
const sub = (n, n2) => n - n2
export default { add, sub }
```

```js
import math from './math.js'//math.addやmath.subのように使える
```

デフォルトとそれ以外のエクスポートが混在していても以下のように別々に読み込める

```js
export const add = (n, n2) => n + n2
const sub = (n, n2) => n - n2
export default sub
```

```js
import sub, { add } form './math.js'
```

### バンドラを生成しHTMLに読み込ませてみる

```shell
npm run build
```

public/index.html

```html
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<title>getting started webpack</title>
</head>
<body>
<script src="js/bundle.js"></script>
</body>
</html>
```

## ローダー

ローダーは**色々な形式のファイルをバンドルできるように変換する**プログラム
例えばCSSや画像などはそのままだとバンドルに含めることはできないのでwebpackでバンドルする前に一度ローダーでファイルを変換する必要がある

### babel-loader

ES6以降のコードをES5のコードに変換する

```shell
npm install --save-dev babel-loader@8.2.2 @babel/core@7.13.10 @babel/preset-env@7.13.12
```

* @babel/core : Babelの本体
* @babel/preset-env : Babelの変換処理を実行する際に使うプラグイン
* babel-loader :  webpackにてbabelを使うためのローダー

webpack.config.js

```js
module.exports = {
  mode: 'development', //develop production none
  entry: './src/js/app.js', //エントリーポイント
  output: {
    //絶対パスを指定、OSにより指定が異なるのでpathモジュールを使う
    path: path.resolve(__dirname, 'public'), 
    filename: 'js/bundle.js',
  },
  modules: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src/js'),//ローダーの変換対象となるディレクトリ
        use: 'babel-loader',
      }
    ]
  }
}
```

babel.config.js (Babelの設定ファイル、webpack.config.jsにも書けるが可読性のためにファイルを分ける)

```js
module.exports = {
  presets: ['@babel/preset-env']
}
```

