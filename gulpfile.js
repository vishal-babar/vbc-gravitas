var gulp = require('gulp'),
		cssmin = require('gulp-cssmin'),
		rename = require('gulp-rename'),
		uglify = require('gulp-uglify'),
		bs = require('browser-sync').create();

var cssSrc = ['css/styles.css'],
		jsSrc = ['js/script.js'];

gulp.task('css', function() {
	gulp.src(cssSrc)
			.pipe(cssmin())
			.pipe(rename({
				suffix: '.min'
			}))
			.pipe(gulp.dest('css'))
			.pipe(bs.reload({ stream: true }));
});

gulp.task('js', function() {
	gulp.src(jsSrc)
			.pipe(uglify())
			.pipe(rename({
				suffix: '.min'
			}))
			.pipe(gulp.dest('js'));
});

gulp.task('browser-sync', function() {
    bs.init({
        server: {
            baseDir: "../"
        }
    });
});

gulp.task('js-watch', ['js'], bs.reload);

gulp.task('watch', ['browser-sync'], function() {
	gulp.watch(cssSrc, ['css']);
	gulp.watch(jsSrc, ['js-watch']);
	gulp.watch('*.html').on('change', bs.reload);
});

gulp.task('default', ['css', 'js', 'watch']);
