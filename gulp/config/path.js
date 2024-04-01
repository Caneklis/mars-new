// import * as nodePath from "path";
// const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./build`;
const srcFolder = `./src`;

export const path = {
  src: {
    files: `${srcFolder}/files/**/*.*`,
    fonts: `${srcFolder}/fonts/**/*.*`,
    favicon: `${srcFolder}/favicon/*.*`,
    html: `${srcFolder}/templates/**/[^_]*.html`,
    styles: `${srcFolder}/sass/**/style.scss`,
    js: `${srcFolder}/js/**/*.js`,
    svg: `${srcFolder}/img/**/*.svg`,
    svgSprite: `${srcFolder}/img/icons/*.svg`
  },
  build: {
    files: `${buildFolder}/files/`,
    fonts: `${buildFolder}/fonts/`,
    favicon: `${buildFolder}/favicon/`,
    html: `${buildFolder}/`,
    styles: `${buildFolder}/sass/**/*.scss`,
    js: `${buildFolder}/js`,
    svg: `${buildFolder}/img/`,
    svgSprite: `${buildFolder}/img/`
  },
  watch: {
    files: `${srcFolder}/files/**/*.*`,
    fonts: `${srcFolder}/fonts/**/*.*`,
    html: `${srcFolder}/templates/**/*.html`,
    styles: `${srcFolder}/sass/**/*.scss`,
    js: `${srcFolder}/js/**/*.js`,
    svg: `${srcFolder}/img/**/*.svg`,
    svgSprite: `${srcFolder}/img/sprite/*.svg`
  },
  clean: buildFolder,
  srcFolder: srcFolder
  // rootFolder: rootFolder
};

// export const paths = (done) => {
//   gulp
//     .src(["source/fonts/*.{woff2,woff}", "source/*.ico"], {
//       base: "source",
//     })
//     .pipe(gulp.dest("build"));
//   done();
// };
