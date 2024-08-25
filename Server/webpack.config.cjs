const path = require("path");

module.exports = {
  entry: "./index.js", // Replace with your entry file
  output: {
    filename: "bundle.js",
    path: path.resolve("dist"), // No need for __dirname in ES modules
  },
  mode: "development", // Can be 'development' or 'production'
};
