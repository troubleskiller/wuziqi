const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: "./src/index.jsx",
    mode: "development",
    stats: "errors-only",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.[contenthash:8].js"
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
            "~": path.resolve(__dirname)
        },
        extensions: [".js", ".jsx"],
        mainFiles: ["index.js", "index.jsx"],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-env",
                                "@babel/preset-react",
                            ]
                        }
                    }]
            },
            {
                test: /\.(css|less|scss)$/,
                exclude: /node_modules/,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public/index.html"),
            filename: "index.html"
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
        },
        historyApiFallback: true,
        hot: true,
        compress: true,
        port: 3000,
        compress: true,
    }
}