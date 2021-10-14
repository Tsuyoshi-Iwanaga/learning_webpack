const path = require("path")

module.exports = {
  mode: 'development', //develop production none
  entry: './src/js/app.js', //エントリーポイント
  output: {
    //絶対パスを指定、OSにより指定が異なるのでpathモジュールを使う
    path: path.resolve(__dirname, 'public'), 
    filename: 'js/bundle.js',
  }
}