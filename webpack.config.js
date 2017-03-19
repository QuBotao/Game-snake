var webpack  = require('webpack');
var providePlugin = new webpack.ProvidePlugin({$: 'jquery','jQuery': 'jquery', 'window.jQuery': 'jquery'});
// 插件 功能 压缩代码
var uglifyPlugin = new webpack.optimize.UglifyJsPlugin({minimize: true});
// var commonPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

//对CSS代码进行独立打包
// var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var extractTextPlugin = new ExtractTextPlugin('[name].css', {allChunks: true});

module.exports = {
    entry: {entry: './entry.js'},
    output: {
        path: './output/entry',
        filename: '[name].js',
    },
    module: {
        loaders: [
            {test: /\.js$/, loader: 'babel-loader'},
            {test: /\.css$/, loader: 'style-loader!css-loader'}, 
            {test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},           
            {test: /\.(jpg|png|gif)$/, loader: 'url-loader?limit=8192'}
        ]         
    },
    plugins: [uglifyPlugin]    
}