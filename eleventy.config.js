module.exports = function(config) {
  // Set the directories
  return {
    dir: {
      input: './src/content',
      includes: '../includes',
      layouts: '../layouts',
      data: '../data',
      output: './dist'
    }
  }
}