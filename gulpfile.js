const { src, dest, parallel, series, watch, task } = require("gulp");
const fs = require("fs");
const nunjucksRender = require("gulp-nunjucks-render");
const plumber = require("gulp-plumber");
const gulpif = require("gulp-if");
const changed = require("gulp-changed");
const prettify = require("gulp-prettify");
const frontMatter = require("gulp-front-matter");
const sass = require("gulp-sass");
const sourcemap = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const sync = require("browser-sync").create();
const del = require("del");

const babel = require("gulp-babel");
const uglify = require("gulp-uglify-es").default;
const concat = require("gulp-concat");

const svgstore = require("gulp-svgstore");
const webp = require("gulp-webp");
const imagemin = require("gulp-imagemin");

// HTML

const html = () => {
  return src("src/*.html").pipe(dest("build")).pipe(sync.stream());
};

exports.html = html;

const renderHtml = (onlyChanged) => {
  nunjucksRender.nunjucks.configure({
    watch: false,
    trimBlocks: true,
    lstripBlocks: false,
  });

  return src(["src/templates/**/[^_]*.html"])
    .pipe(plumber())
    .pipe(gulpif(onlyChanged, changed("build")))
    .pipe(frontMatter({ property: "data" }))
    .pipe(
      nunjucksRender({
        //PRODUCTION: config.production,
        path: "src/templates",
      })
    )
    .pipe(
      prettify({
        indent_size: 2,
        wrap_attributes: "auto", // 'force'
        preserve_newlines: false,
        // unformatted: [],
        end_with_newline: true,
      })
    )
    .pipe(dest("build"));
};

// exports.renderHtml = renderHtml;

const nunjucks = () => renderHtml();

exports.nunjucks = nunjucks;

const nunjucksChanged = () => renderHtml(true);

exports.nunjucksChanged = nunjucksChanged;

task("nunjucks", () => renderHtml());
task("nunjucks:changed", () => renderHtml(true));

//Styles

const styles = () => {
  return src("src/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(dest("build/css"))
    .pipe(sync.stream());
};

exports.styles = styles;

// libs

const libs = () => {
  return src(
    [
      "node_modules/jquery/dist/jquery.min.js", // Пример подключения библиотеки
      "node_modules/slick-carousel/slick/slick.js",
      "node_modules/aos/dist/aos.js",
      "node_modules/mixitup/dist/mixitup.js",
    ],
    { allowEmpty: true }
  )
    .pipe(plumber())
    .pipe(concat("libs.min.js"))
    .pipe(uglify())
    .pipe(dest("build/js/"))
    .pipe(sync.stream());
};

exports.libs = libs;

// Scripts

const scripts = () => {
  return src(
    [
      "src/js/common.js", // Пользовательские скрипты
    ],
    { allowEmpty: true }
  )
    .pipe(plumber())
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(concat("common.min.js"))
    .pipe(uglify())
    .pipe(dest("build/js/"))
    .pipe(sync.stream());
};

exports.scripts = scripts;

const images = () => {
  return src("src/img/**/*.{png,jpg,svg,webmanifest,ico}")
    .pipe(
      imagemin([
        imagemin.optipng({
          optimizationLevel: 3,
        }),
        imagemin.mozjpeg({
          quality: 80,
          progressive: true,
        }),
        imagemin.svgo(),
      ])
    )

    .pipe(dest("build/img"));
};

exports.images = images;

const webpGenerate = () => {
  return src("src/img/**/*.{png,jpg}")
    .pipe(
      webp({
        quality: 90,
      })
    )
    .pipe(dest("src/img"));
};

exports.webpGenerate = webpGenerate;

const sprite = () => {
  return src("src/img/icons/icon-*.svg")
    .pipe(
      svgstore({
        inlineSvg: true,
      })
    )
    .pipe(rename("sprite.svg"))
    .pipe(dest("build/img"));
};

exports.sprite = sprite;

// Server

const server = (done) => {
  sync.init(
    {
      ui: false,
      notify: false,
      server: {
        baseDir: "build",
      },
    },
    done
  );
};

exports.server = server;

//Reload

const reload = (done) => {
  sync.reload();
  done();
};

exports.reload = reload;

const clean = () => {
  return del("build");
};

exports.clean = clean;

const copy = () => {
  return src(["src/fonts/**/*.{woff,woff2}", "src/favicon/**"], {
    base: "src",
  }).pipe(dest("build"));
};

exports.copy = copy;

// Watch files

const watchFiles = () => {
  watch("src/*.html", parallel(html));
  watch("src/sass/**/*.scss", parallel(styles));
  watch("src/js/**/*.js", parallel(scripts));
  watch("src/img/icon-*.svg", parallel(sprite));
  watch(
    "src/templates/**/[^_]*.+(html|nunjucks)",
    parallel("nunjucks:changed", reload)
  );
  watch("src/templates/**/*.+(html|nunjucks)", parallel("nunjucks", reload));
  watch("src/fonts/**/*", series(copy));
};

exports.watchFiles = watchFiles;

// const build = () => {
//   series(
//     //html,
//     clean,
//     copy,
//     nunjucks,
//     styles,
//     libs,
//     scripts,
//     copy,
//     images,
//     sprite
//     //webpGenerate,
//   )();
// };

const build = () => {
  return series(
    //html,
    clean,
    copy,
    nunjucks,
    styles,
    libs,
    scripts,
    copy,
    images,
    sprite
    //webpGenerate,
  )();
};

// Default

exports.default = parallel(build, watchFiles, server);
