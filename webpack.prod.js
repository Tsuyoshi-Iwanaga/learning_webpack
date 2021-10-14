const { merge } = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const commonConfig = require('./webpack.common')

module.exports = merge(commonConfig, {
  mode: 'production',
  optimization: {
    minimizer: [
      new TerserPlugin({
        //ライブラリのライセンスコメントを抽出したファイルを生成しない
        extractComments: false,
        terserOptions: {
          compress: {
            //consoleの記述を削除する
            drop_console: true,
          }
        }
      })
    ]
  }
})