const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development', // мод настроек
    entry: ["@babel/polyfill",'./client/src/index.jsx'],  // путь к входному файлу
    output: {
        path: path.resolve(__dirname, "dist"), // папка где будет сборка
        filename: '[name].[hash].js',// файл в котором будет хранится сборка всех js файлов

    },
    devServer: {
        port: 5000
    },
    plugins: [
        new HTMLWebpackPlugin({ template: './client/public/index.html' }), //template = путь к html файлу.Переносит html в папку dist и импорт все бандлы которые будет собирать вебпак
        new CleanWebpackPlugin() // Очищает бандлы которые не используются(были созданы в результаты "filename" регулярных выражений)
    ],
    module: {
        rules: [
            {
                test: /\.(css|scss)$/, // регулярные выражения указывающее какие файлы будут использоваться для стилей
                use: ['style-loader', "css-loader", "sass-loader"]  // подключаем loaders
            },
            {
                test: /\.(jpg|jpeg|png|svg)/,  // настройка импорта файлов
                use: ['file-loader']  // подключаем loaders
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.m?jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env',"@babel/preset-react"]
                    }
                }
            }
        ]
    }
}