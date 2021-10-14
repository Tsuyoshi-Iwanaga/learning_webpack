# webpack

## 動作環境

```
Node.js v14.15.4
npm v8.0.0
webpack v5.30.0
webpack-cli v4.6.0
```

## 1. webpackの概要

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

