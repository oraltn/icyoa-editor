module.exports = {
        entry: './src/app.js',
        output: {
                filename: 'bundle.js'
        },
        devtool: 'inline-source-map',
        module: {
                loaders: [
                        {test: /.js$/, use: 'babel-loader', exclude: /node_modules/}
                ]
        }
}
