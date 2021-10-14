const path = require("path")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  watch: true,
  // entry: './src/js/app.js', 単一エントリーポイント
  entry: {
    app: './src/js/app.js',
    search: './src/js/search.js',
  },
  output: {
    //絶対パスを指定、OSにより指定が異なるのでpathモジュールを使う
    path: path.resolve(__dirname, 'public'), 
    filename: 'js/[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src/js'),
        use: 'babel-loader',
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'src/scss'),
        //複数のローダーがある場合は配列で記載する、ローダーは記載順とは逆から読み込まれるので注意
        use: [
          // MiniCssExtractPlugin.loader,
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/,
        type: 'asset/inline' //Asset Modulesのタイプ、url-loaderと同じことをやりたければasset/inlineを指定
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      //output.pathを起点にCSSが出力される
      filename: './css/style.css'
    }),
    // new BundleAnalyzerPlugin()
  ]
}