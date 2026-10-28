const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
    entry: "./src/index.js",

    mode: "development",

    devServer: {
        port: 3002,

        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),

        new ModuleFederationPlugin({
            name: "microPedido",

            filename: "remoteEntry.js",

            exposes: {
                "./Pedido": "./src/Pedido.jsx",
            },

            shared: {
                react: {
                    singleton: false,
                    eager: false,
                    requiredVersion: false,
                    strictVersion: false
                },
                "react-dom": {
                    singleton: false,
                    eager: false,
                    requiredVersion: false,
                    strictVersion: false
                }
            }
        }),
    ],

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },
};