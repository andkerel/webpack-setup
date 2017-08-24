module.exports = {
  parser: 'sugarss',
  map: false,
  plugins: {
    'postcss-import': {},
    //'cssnext': {}, //plugin pack, contains plugins that allow you to use future CSS features today.
    'autoprefixer': {browsers: "last 2 versions"},
    'cssnano': {safe: true}
  }
}