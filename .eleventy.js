module.exports = function(eleventyConfig) {
    // Copy the assets directory to _site/assets
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
