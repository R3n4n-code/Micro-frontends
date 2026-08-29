const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
    entry: "./src/index.js",

    mode: "development",

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
                microCardapio:
                    "microCardapio@http://localhost:3001/remoteEntry.js",

                microPedido:
                    "microPedido@http://localhost:3002/remoteEntry.js",
            },

            shared: {
                react: {
                    singleton: true,
                },

                "react-dom": {
                    singleton: true,
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