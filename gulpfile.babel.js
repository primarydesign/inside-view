import gulp from 'gulp';
import {argv} from 'yargs';
import direque from 'require-dir';
import named from 'vinyl-named';
import webpack from 'webpack-stream';
import postcss from 'gulp-postcss';
import cssnano from 'gulp-cssnano';
import cached from 'gulp-cached';
import imagemin from 'gulp-imagemin';
import bsync from 'browser-sync';
import commence from 'run-sequence';

const Uppsta = direque('./gulp' ,{recurse: true});
const Library = Uppsta.Library;
const Browser = bsync.create();
const $ = Uppsta.configure.paths;
const _ = Uppsta.Options;

function Pages() {
	return gulp.src($.pages.globs)
	.pipe(gulp.dest($.pages.dest))
	.pipe(Browser.stream());
}
function Assets() {
	return gulp.src($.assets.globs)
	.pipe(gulp.dest($.assets.dest))
	.pipe(Browser.stream());
}
function Styles() {
	return gulp.src($.styles.globs)
	.pipe(postcss(_.postcss))
	.pipe(cssnano(_.cssnano))
	.pipe(gulp.dest($.styles.dest))
	.pipe(Browser.stream());
}
function Scripts() {
	return gulp.src($.scripts.globs)
	.pipe(named())
	.pipe(webpack(_.webpack))
	.pipe(gulp.dest($.scripts.dest))
	.pipe(Browser.stream());
}
function Images() {
	return gulp.src($.images.globs)
	.pipe(require('gulp-print')())
	.pipe(imagemin())
	.pipe(gulp.dest($.images.dest))
	.pipe(Browser.stream());
}
function Build(done) {
	commence(['pages', 'assets', 'styles', 'scripts', 'images'], done);
}
function Watch() {
	if (argv.s) commence('serve');
	gulp.watch($.pages.watch, Pages).on('change', Browser.reload);
	gulp.watch($.assets.watch, Assets).on('change', Browser.reload);
	gulp.watch($.styles.watch, Styles).on('change', Browser.reload);
	gulp.watch($.scripts.watch, Scripts).on('change', Browser.reload);
	gulp.watch($.images.watch, Images).on('change', Browser.reload);
}
function Serve() {
	return Browser.init(_.browsersync);
}

gulp.task('pages', Pages);
gulp.task('assets', Assets);
gulp.task('styles', Styles);
gulp.task('scripts', Scripts);
gulp.task('images', Images);
gulp.task('build', Build);
gulp.task('watch', Watch);
gulp.task('serve', Serve);

// gulp yargs require-dir vinyl-named gulp-webpack gulp-postcss gulp-cssnano gulp-cached gulp-imagemin browser-sync gulp-inline