import plumber from 'gulp-plumber';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import postcss from 'gulp-postcss';
import csso from 'postcss-csso';
import autoprefixer from 'autoprefixer';
import rename from 'gulp-rename';
import { liveServer } from './server.js';

const sass = gulpSass(dartSass);

export const styles = () => {
  return app.gulp
    .src('src/sass/**/*.scss', { sourcemaps: true })
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer(), csso()]))
    .pipe(rename('style.min.css'))
    .pipe(app.gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(app.plugins.browserSync.stream());
};
