const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const webpack = require("webpack");

module.exports = {
    entry: "./src/index.js",
    mode: "production",

    plugins: [
        new webpack.EnvironmentPlugin({
            URL_MICRO_CARDAPIO: '', 
            URL_MICRO_PEDIDO: ''
        }),

        new HtmlWebpackPlugin({
            template: "./src/index.html",
            favicon: "./src/favicon.png",
        }),

        new ModuleFederationPlugin({
            name: "Restaurante",

           
            remotes: {
                microCardapio: `microCardapio@${process.env.URL_MICRO_CARDAPIO}/remoteEntry.js`,
                microPedido: `microPedido@${process.env.URL_MICRO_PEDIDO}/remoteEntry.js`,
            },

            shared: {
                react: {
                    singleton: true,
                    requiredVersion: false,
                },
                "react-dom": {
                    singleton: true,
                    requiredVersion: false,
                },
            },
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
