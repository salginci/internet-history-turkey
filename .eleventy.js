const holidays = require('./src/_data/holidays.js');

module.exports = function(eleventyConfig) {
    // Copy assets to output directory
    eleventyConfig.addPassthroughCopy("assets");
    
    // Watch for changes in assets
    eleventyConfig.addWatchTarget("assets/");

    // Add holiday data to global data
    eleventyConfig.addGlobalData("holidays", holidays);

    // Debug: Print the number of items in the holidays global data
    console.log("Number of holidays added as global data:", holidays.length);

    // EXCLUDE tatiller.hbs from template processing to prevent potential data duplication issues
    eleventyConfig.addPassthroughCopy("src/tatiller.hbs");

    // Add custom Handlebars helper for JSON stringification
    eleventyConfig.addHandlebarsHelper("json", function(context) {
        return JSON.stringify(context);
    });

    // Add custom Handlebars helper to filter unique holidays
    eleventyConfig.addHandlebarsHelper("uniqueHolidays", function(holidaysArray) {
        const uniqueHolidaysMap = new Map();
        holidaysArray.forEach(holiday => {
            // Create a compound key based on title, month index, and day (and year if needed)
            // Use year in the key to distinguish holidays on the same date in different years
            const uniqueKey = `${holiday.title}-${holiday.monthIndex}-${holiday.day}-${holiday.year}`;
            if (!uniqueHolidaysMap.has(uniqueKey)) {
                uniqueHolidaysMap.set(uniqueKey, holiday);
            }
        });
        return Array.from(uniqueHolidaysMap.values());
    });

    // Create individual holiday pages programmatically
    // eleventyConfig.addCollection("holidayPages", function(collection) {
    //     console.log("Creating holidayPages collection...");
    //     const holidaysData = eleventyConfig.getGlobalData().holidays;
    //     console.log("Holidays data:", holidaysData);
    //     const pages = holidaysData.map(holiday => ({
            
    //         url: `/tatil/${holiday.slug}/`,
    //         // Use the holiday detail include file as the template content
    //         content: `{{> "holiday-detail.hbs" holiday=holiday }}` + "\n",
    //         data: {
    //             holiday: holiday, // Make individual holiday data available as 'holiday'
    //             layout: "layout.hbs",
    //             showClock: true
    //         }
    //     }));
    //     console.log("Generated holiday page objects:", pages);
    //     return pages;
    // });

    return {
        dir: {
            input: "src",
            output: "_site",
            includes: "_includes",
            layouts: "layouts"
        },
        templateFormats: ["hbs", "md", "html"],
        htmlTemplateEngine: "hbs"
    };
};
