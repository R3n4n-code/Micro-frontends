const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;


const CARDAPIO_URL = process.env.URL_MICRO_CARDAPIO || "http://localhost:3001";
const PEDIDO_URL = process.env.URL_MICRO_PEDIDO || "http://localhost:3002";

module.exports = {
    entry: "./src/index.js",

  
    mode: process.env.NODE_ENV === "production" ? "production" : "development",

    devServer: {
        port: 3000, 
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            favicon: "./src/favicon.png",
        }),

        new ModuleFederationPlugin({
            name: "Restaurante",

            remotes: {
                microCardapio: `microCardapio@${CARDAPIO_URL}/remoteEntry.js`,
                microPedido: `microPedido@${PEDIDO_URL}/remoteEntry.js`,
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
