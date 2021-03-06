const purgecss = require('@fullhuman/postcss-purgecss')({
  // Specify the paths to all of the template files in your project
  content: ['./src/**/*.html', './src/**/*.vue'],
  whitelistPatterns: [/^theme-.*/, /^fa-.*/],
  // Include any special characters you're using in this regular expression
  defaultExtractor: content => content.match(/[\w-/:%]+(?<!:)/g) || [],
})

module.exports = {
  plugins: [
    require('postcss-nested'),
    require('autoprefixer')(),
    require('postcss-normalize')(),
    ...(process.env.NODE_ENV === 'production' ? [purgecss] : []),
  ],
}
