// webpack v4
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const dist = path.resolve(__dirname, 'dist')

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production'
  process.env.NODE_ENV = argv.mode

  const config = {
    entry: './src/index.ts',
    output: {
      path: dist,
      filename: '[name].[contenthash].js',
    },
    resolve: {
      extensions: ['.ts', '.js', '.vue'],
    },
    target: 'web',
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        // Expose a production option to the template
        production: process.env.NODE_ENV === 'production',
        filename: 'index.html',
      }),
      new CleanWebpackPlugin(),
      new VueLoaderPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.(postcss|css)$/,
          use: [
            'style-loader',
            'vue-style-loader',
            'css-loader',
            'postcss-loader',
          ],
        },
        {
          test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/',
              },
            },
          ],
        },
        {
          test: /\.vue$/,
          use: ['vue-loader'],
        },
        {
          test: /\.tsx?$/,
          loader: 'babel-loader',
          options: {
            plugins: [['classy-ui/plugin', { output: 'dist' }]],
          },
        },
      ],
    },
  }

  if (isProduction) {
    Object.assign(config, {
      optimization: {
        minimize: true,
        minimizer: [
          new TerserJSPlugin({
            terserOptions: { output: { comments: false } },
            extractComments: false,
          }),
          new JavaScriptObfuscator({
            compact: true,
            controlFlowFlattening: false,
            deadCodeInjection: false,
            debugProtection: false,
            debugProtectionInterval: false,
            disableConsoleOutput: true,
            identifierNamesGenerator: 'hexadecimal',
            log: false,
            renameGlobals: false,
            rotateStringArray: true,
            selfDefending: true,
            stringArray: true,
            stringArrayEncoding: false,
            stringArrayThreshold: 0.75,
            unicodeEscapeSequence: false,
          }),
          new OptimizeCSSAssetsPlugin({}),
        ],
      },
    })
  } else {
    Object.assign(config, {
      stats: 'minimal',
      devtool: 'source-map',
      devServer: {
        contentBase: dist,
        compress: true,
        port: 1337,
        overlay: true,
        historyApiFallback: true,
      },
    })
  }
  return config
}
