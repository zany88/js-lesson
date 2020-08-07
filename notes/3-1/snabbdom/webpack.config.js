const path = require('path')
const webpack = require('webpack')

module.exports = {
    mode: 'none',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },{
                test: /.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },

        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}
