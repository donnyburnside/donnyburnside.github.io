const fs = require('fs');

module.exports = function(eleventyConfig) {
  // Enable 404 in development environment
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready(err, bs) {
        bs.addMiddleware('*', (req, res) => {
          // Add 404 content
          const content_404 = fs.readFileSync('./dist/404.html');
          res.write(content_404);

          // Add 404 http status code
          res.writeHead(404);

          // Send the response
          res.end();
        });
      }
    }
  });

  // Return the directories
  return {
    dir: {
      input: './content',
      includes: '../includes',
      layouts: '../layouts',
      data: '../data',
      output: './dist'
    }
  };
}