/* Browser-friendly CommonJS bundle that exports solid-file-client */

const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');
const { context, mode, entry, module: _module, devtool } = require('./webpack.common.config');

const outputDir = './dist/more/bundle'; // './browser';

module.exports = {
  context,
  mode,
  entry,
  output: {
    filename: 'index.js',
    path: path.resolve(outputDir),
    libraryExport: 'default',
    library: 'exports',
    libraryTarget: 'window',
  },
  module: _module,
  plugins: [
    // Replace the assignment to window by a module export
    new ReplaceInFileWebpackPlugin([
      {
        dir: outputDir,
        files: ['index.js'],
        rules: [
          {
            search: 'window["exports"]',
            replace: 'module.exports',
          },
        ],
      },
    ]),
    new CleanWebpackPlugin([outputDir]),
  ],
  devtool,
};
