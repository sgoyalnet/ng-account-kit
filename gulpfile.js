var gulp = require ("gulp");
var uglify = require('gulp-uglify');
var runSequence = require('run-sequence');
var rename = require("gulp-rename");
var del = require('del');

gulp.task('default', function(){
	runSequence ('clean:dist',['scripts']);
});
gulp.task('clean:dist', function() {
  return del.sync('dist');
});
gulp.task('scripts', function () {
	return gulp.src('src/*.js')
				.pipe(uglify({mangle:true}))
				.pipe(rename('ng-account-kit.min.js'))
        .pipe(gulp.dest('dist'));
});
