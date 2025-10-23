export default {
  plugins: {
    'postcss-import': {},
    'autoprefixer': {},
    'cssnano': {
      preset: ['advanced', {
        discardComments: { removeAll: true },
        reduceIdents: true,
        mergeIdents: true,
        mergeRules: true,
        minifySelectors: true,
        normalizeWhitespace: true,
        cssDeclarationSorter: true
      }]
    }
  }
}
