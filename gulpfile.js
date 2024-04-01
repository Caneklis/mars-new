import gulp from 'gulp';
import { path } from './gulp/config/path.js';
import { plugins } from './gulp/config/plugins.js';

global.app = {
  path: path,
  gulp: gulp,
  plugins: plugins
};

import { clean } from './gulp/tasks/clean.js';
import { copy } from './gulp/tasks/copy.js';
import { fonts } from './gulp/tasks/fonts.js';
import { favicon } from './gulp/tasks/favicon.js';
import { nunjucks, nunjucksChanged } from './gulp/tasks/html.js';
import { styles } from './gulp/tasks/styles.js';
import { svg, svgSprite } from './gulp/tasks/svg.js';
import { liveServer, reload } from './gulp/tasks/server.js';
import { scripts } from './gulp/tasks/scripts.js';
import { optimazeImages } from './gulp/tasks/optimazeImages.js';

function watch() {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.html, gulp.series(nunjucks, reload));
  gulp.watch(path.watch.styles, styles);
  gulp.watch(path.watch.svg, svg);
  gulp.watch(path.watch.svg, svgSprite);
  gulp.watch(path.watch.js, scripts);
}

const build = gulp.series(clean, copy, fonts, favicon, nunjucks, styles, svg, svgSprite, scripts, optimazeImages, gulp.parallel(liveServer, watch, reload));

gulp.task('default', build);
