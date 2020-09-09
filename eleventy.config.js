module.exports = function(eleventyConfig) {
  return {
    dir: {
      input: 'content',
      includes: '../partials',
      layouts: '../layouts',
      data: '../data',
      output: 'docs'
    }
  };
};