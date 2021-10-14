const path = require("path")

module.exports = {
  mode: 'development', //develop production none
  entry: './src/js/app.js', //エントリーポイント
  output: {
    //絶対パスを指定、OSにより指定が異なるのでpathモジュールを使う
    path: path.resolve(__dirname, 'public'), 
    filename: 'js/bundle.js',
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
        use: [ 'style-loader', 'css-loader', 'sass-loader' ],
      }
    ]
  }
}