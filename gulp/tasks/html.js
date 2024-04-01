import nunjucksRender from "gulp-nunjucks-render";
import gulpif from "gulp-if";
import changed from "gulp-changed";
import prettify from "gulp-prettify";
import frontMatter from "gulp-front-matter";
import plumber from "gulp-plumber";

import markdown from "nunjucks-markdown";
import { marked } from "marked";

const manageEnvironment = function (env) {
  markdown.register(env, marked);
};

const renderHtml = (onlyChanged) => {
  nunjucksRender.nunjucks.configure({
    watch: false,
    trimBlocks: true,
    lstripBlocks: false,
  });

  return app.gulp
    .src(["src/templates/**/[^_]*.html"])
    .pipe(plumber())
    .pipe(gulpif(onlyChanged, changed("build")))
    .pipe(frontMatter({ property: "data" }))
    .pipe(
      nunjucksRender({
        //PRODUCTION: config.production,
        path: "src/templates",
        manageEnv: manageEnvironment,
        data: {
          base_path: "/",
        },
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
    .pipe(app.gulp.dest("build"));
};

export const nunjucks = () => renderHtml();
export const nunjucksChanged = () => renderHtml(true);
