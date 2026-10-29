const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
    entry: "./src/index.js",

    mode: "development",

    devServer: {
        port: 3001,

        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),

        new ModuleFederationPlugin({
            name: "microCardapio",

            filename: "remoteEntry.js",

            exposes: {
                "./Grid": "./src/Grid.jsx",
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