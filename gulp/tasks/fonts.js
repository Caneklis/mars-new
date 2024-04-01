export const fonts = () => {
  return app.gulp
    .src("src/fonts/*.{woff,woff2}")
    .pipe(app.gulp.dest("build/fonts/"));
};
