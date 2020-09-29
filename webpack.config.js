const path = require('path'); // подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require('html-webpack-plugin'); //html плагин к конфигу вебпак
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // плагин для работы с css


module.exports = {
  entry: { main: './src/pages/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [ // rules — это массив правил
      // добавим в него объект правил для бабеля
      {
        // регулярное выражение, которое ищет все js файлы
        test: /\.js$/,
        // при обработке этих файлов нужно использовать babel-loader
        loader: 'babel-loader',
        // исключает папку node_modules, файлы в ней обрабатывать не нужно
        exclude: '/node_modules/'
      },
      {
        //обработка фото
        test: /.(png|svg|jpg|gif)$/,
        loader:'file-loader?name=./images/[name].[ext]'
      },
      {
        //обработка шрифтов
        test: /.(eot|ttf|woff|woff2)$/,
          loader:'file-loader?name=./vendor/[name].[ext]'
      },
      // правило для работы с html
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        // применять это правило только к CSS-файлам
        test: /\.css$/,
        loader:  [MiniCssExtractPlugin.loader, {loader: 'css-loader', options: {importLoaders: 1}}, 'postcss-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html' // путь к файлу index.html
    }),
    new MiniCssExtractPlugin()
  ]
}
