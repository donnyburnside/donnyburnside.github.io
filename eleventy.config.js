module.exports = function(eleventyConfig) {
  return {
    dir: {
      input: 'content',
      includes: '../views/partials',
      layouts: '../views/layouts',
      data: '../data',
      output: 'build'
    }
  };
};