const path = require('path')
const  HtmlWebpackPlugin  = require('html-webpack-plugin')
module.exports = {
    entry: './src/main.js',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test:/\.vue$/,
                loader: "vue-loader",
                options: {
                    transformToRequire: {
                        video: ['src', 'poster'],
                        source: 'src',
                        img: 'src',
                        image: 'xlink:href'
                    }
                }
            },
            {
                test:/\.less$/,
                loader: "style-loader!css-loader!less-loader"
            },

            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:'./public/index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
        }),
    ]
}