const path = require('path');
const dartSass = require('eleventy-plugin-dart-sass');
const esbuild = require("esbuild");

require('dotenv').config({ path: `.env/.env.${process.env.NODE_ENV}` })



module.exports = function (eleventyConfig) {

    // img copy
    eleventyConfig.addPassthroughCopy({"src/img": `/${process.env.ASSETS_DIR}`});

    // js esbuild
    eleventyConfig.on("afterBuild", () => {
      return esbuild.build({
        entryPoints: ["src/js/app.js"],
        outdir: `${process.env.OUTPUT_DIR}/${process.env.ASSETS_DIR}`,
        bundle: true,
        minify: process.env.NODE_ENV === "production",
        sourcemap: process.env.NODE_ENV !== "production",
        plugins: []
      });
    });
    // eleventyConfig.addPassthroughCopy({"src/js/app.js": `${process.env.ASSETS_DIR}/app.js`});

    // dart sass
    eleventyConfig.addPlugin(dartSass,{
      sassLocation: path.normalize(
        path.join(__dirname,  "src/scss/")
      ),
      outDir: `${process.env.OUTPUT_DIR}`,
      outPath: `/${process.env.ASSETS_DIR}/`,
      sassIndexFile: "common.scss",
      outFileName: "common"
    });


  return {
    templateFormats: ['liquid', 'html','njk'],
    htmlTemplateEngine: 'liquid',
    dir: {
      input: 'src/liquid',
      output: `${process.env.OUTPUT_DIR}`,
      includes: "_includes",
      layouts: "_layouts",
      // data: "_data"
    }
  }
}
