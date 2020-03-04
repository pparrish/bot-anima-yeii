module.exports = {
  // Lint js files
  'src/**/*.js': filenames => {
    return [
      `npm run test ${filenames.join(' ')}`,
      `npm run git fix ${filenames.join(' ')}`,
      `git add ${filenames.join(' ')}`,
    ]
  },
  'src/**/!(*test|*steps).js': filenames => {
    const lintDoc = filenames.map(file => {
      if (file.endsWith('.config.js')) return ''
      return `documentation lint ${file}`
    })
    return lintDoc
  },
}
