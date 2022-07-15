require('dotenv').config({ path: `.env/.env.${process.env.NODE_ENV}` })


module.exports = function (eleventyConfig) {

  if(process.env.NODE_ENV !== 'production'){
    // 画像通常コピー
    eleventyConfig.addPassthroughCopy({"src/img": `${process.env.ASSETS_DIR}/img`});

    eleventyConfig.addPassthroughCopy({"src/js/app.js": `${process.env.ASSETS_DIR}/js/app.js`});
    eleventyConfig.addPassthroughCopy({"src/scss/common.scss": `${process.env.ASSETS_DIR}/scss/common.scss`});

  }else{
      eleventyConfig.ignores.add("src/template/__tests__")
      // オリジナル画像を圧縮してコピー / jpg pngの場合は webpを生成
      CopyFilesRecursively('src/img',`${process.env.OUTPUT_DIR}/${process.env.DEST_DIR}/img`)
  }

  return {
    templateFormats: ['liquid', 'html'],
    htmlTemplateEngine: 'liquid',
    dir: {
      input: 'src/liquid',
      output: `${process.env.OUTPUT_DIR}`,
      // includes: "_includes",
      // layouts: "_layouts",
      // data: "_data"
    }
  }
}
