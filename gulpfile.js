var path = require('path');
var gulp = require('gulp');
var babel = require('gulp-babel');
var connect = require('gulp-connect');

var dirs = {
	src: 'src',
	dest: 'build'
};

gulp.task('build', ['css', 'vendor', 'js', 'html'], function () {

});

gulp.task('js', function () {
	return gulp.src(dirs.src + '/**/*.js')
		.pipe(babel())
		.pipe(gulp.dest(dirs.dest))
		.pipe(connect.reload());
});

gulp.task('vendor', function () {
	return gulp.src('node_modules/systemjs/dist/system.js')
		.pipe(gulp.dest(dirs.dest + '/vendor'));
});

gulp.task('html', function () {
	return gulp.src(dirs.src + '/index.html')
		.pipe(gulp.dest(dirs.dest))
		.pipe(connect.reload());
});

gulp.task('css', function () {
	return gulp.src(dirs.src + '/namegen.css')
		.pipe(gulp.dest(dirs.dest))
		.pipe(connect.reload());
});

gulp.task('serve', ['build'], function () {
	connect.server({
		root: dirs.dest,
		port: 3000,
		livereload: true
	});
});

gulp.task('watch', ['serve'], function () {
	gulp.watch([dirs.src + '/**/*.css'], {
		interval: 500
	}, ['css']);
	gulp.watch([dirs.src + '/**/*.html'], {
		interval: 500
	}, ['html']);
	gulp.watch([dirs.src + '/**/*.js'], {
		interval: 500
	}, ['js']);
});

gulp.task('default', ['watch']);