const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;


const isProduction = process.env.NODE_ENV === "production";


const CARDAPIO_URL = isProduction 
    ? process.env.URL_CARDAPIO 
    : "http://localhost:3001";

const PEDIDO_URL = isProduction 
    ? process.env.URL_PEDIDO 
    : "http://localhost:3002";

module.exports = {
    entry: "./src/index.js",

   
    mode: isProduction ? "production" : "development",

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
                    requiredVersion: "auto", 
                },
                "react-dom": {
                    singleton: true,
                    requiredVersion: "auto",
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
