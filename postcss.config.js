export default {
  plugins: {
    'postcss-import': {},
    'autoprefixer': {},
    'cssnano': {
      preset: ['default', {
        discardComments: { removeAll: true }
      }]
    }
  }
}
