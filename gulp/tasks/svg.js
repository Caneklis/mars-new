import svgo from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import rename from 'gulp-rename';

export const svg = () =>
  app.gulp
    .src([app.path.src.svg, `!${app.path.src.svgSprite}`])
    .pipe(svgo())
    .pipe(app.gulp.dest(app.path.build.svg));

export const svgSprite = () => {
  return app.gulp
    .src(app.path.src.svgSprite)
    .pipe(svgo())
    .pipe(
      svgstore({
        inlineSvg: true
      })
    )
    .pipe(rename('sprite.svg'))
    .pipe(app.gulp.dest(app.path.build.svgSprite));
};
