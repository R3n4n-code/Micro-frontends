const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const webpack = require("webpack");
// webpack de nosso host usando variaveis de ambiente para darmos deploy no vercel
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
                    singleton: false,
                    eager: true,
                    requiredVersion: false,
                    strictVersion: false
                },
                "react-dom": {
                    singleton: false,
                    eager: true,
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
               
                options: {
                    presets: [
                        "@babel/preset-env",
                        ["@babel/preset-react", { 
                            runtime: "automatic",
                            development: false 
                        }]
                    ]
                }
            },
        },
    ],
},
};
