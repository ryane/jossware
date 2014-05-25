var gulp = require('gulp'),
    notify = require('gulp-notify'),
    clean = require('gulp-clean'),
    cp = require('child_process'),
    sass = require('gulp-ruby-sass'),
    rename = require('gulp-rename'),
    minifycss = require('gulp-minify-css');

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

gulp.task('styles', function() {
  return gulp.src('_scss/main.scss')
    .pipe(sass({ style: 'expanded' }))
    .pipe(gulp.dest('css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('clean', function() {
  return gulp.src([ 'css', '_site' ], { read: false })
    .pipe(clean());
});

gulp.task('watch', function() {
  gulp.watch('_scss/**/*.scss', ['styles']);
  gulp.watch(['_layouts/*.html', '_posts/*', '_config.yml', 'css/*'],
             ['jekyll-build']);
});

gulp.task('jekyll-build', function (done) {
  return cp.spawn('jekyll', ['build'], { stdio: 'inherit' })
    .on('close', done);
});

gulp.task('default', [ 'clean' ], function() {
  gulp.start('styles', 'jekyll-build')
});
