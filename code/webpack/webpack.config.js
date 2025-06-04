const path = require("path");
const webpack = require("webpack");

const config = (env, argv) => {
  console.log("argv.mode:", argv.mode);

  // We define a global constant via DefinePlugin of webpack, allowing us to use different backend url
  // depending on the current mode. This is similar to vite env MODE
  const backend_url =
    argv.mode === "production"
      ? "https://notes2023.fly.dev/api/notes"
      : "http://localhost:3001/notes";

  return {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "main.js",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    devServer: {
      static: path.resolve(__dirname, "build"),
      compress: true,
      port: 3000,
    },
    plugins: [
      new webpack.DefinePlugin({
        BACKEND_URL: JSON.stringify(backend_url),
      }),
    ],
    devtool: "source-map",
  };
};

module.exports = config;
