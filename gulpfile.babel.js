import gulp from 'gulp';
import argv from 'yargs';
import direque from 'require-dir';
import named from 'vinyl-named';
import webpack from 'webpack-stream';
import postcss from 'gulp-postcss';
import cssnano from 'gulp-cssnano';
import cached from 'gulp-cached';
import imagemin from 'gulp-imagemin';
import bsync from 'browser-sync';

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
	.pipe(cached())
	.pipe(imagemin())
	.pipe(gulp.dest($.images.dest))
	.pipe(Browser.stream());
}
function Build(done) {
	gulp.parallel(Pages, Assets, Styles, Scripts, Images, done);
}
function watch() {
	gulp.watch($.pages.watch, Pages);
	gulp.watch($.assets.watch, Assets);
	gulp.watch($.styles.watch, Styles);
	gulp.watch($.scripts.watch, Scripts);
	gulp.watch($.images.watch, Images);
}
function serve() {
	Browser.init(_.browsersync);
	if (argv.watch) {
		gulp.parallel(Watch);
	}
}

gulp.task('pages', Pages);
gulp.task('assets', Assets);
gulp.task('styles', Styles);
gulp.task('scripts', Scripts);
gulp.task('images', Images);

// gulp yargs require-dir vinyl-named gulp-webpack gulp-postcss gulp-cssnano gulp-cached gulp-imagemin browser-sync gulp-inline