module.exports = function(eleventyConfig) {
    // Copy the css directory to _site/css
    eleventyConfig.addPassthroughCopy("assets");

    return {
        dir: {
            input: "src",
            includes: "_includes",
            layouts: "layouts",
            output: "_site"
        },
        templateFormats: ["hbs", "md", "html"],
        htmlTemplateEngine: "hbs",
        passthroughFileCopy: true
    };
};
