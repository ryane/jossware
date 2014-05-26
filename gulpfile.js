var gulp = require('gulp'),
    clean = require('gulp-clean'),
    cp = require('child_process'),
    sass = require('gulp-ruby-sass'),
    rename = require('gulp-rename'),
    minifycss = require('gulp-minify-css')
    browserSync = require('browser-sync');

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build',
    stylesBuild: '<span style="color: grey">Running:</span> styles',
    jekyllBuildCompleted: '<span style="color: grey">Completed:</span> $ jekyll build'
};

gulp.task('styles', function() {
  browserSync.notify(messages.stylesBuild);
  return gulp.src('_scss/main.scss')
    .pipe(sass({ style: 'expanded' }))
    .pipe(gulp.dest('css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('css'));
});

gulp.task('clean', function() {
  return gulp.src([ 'css', '_site' ], { read: false })
    .pipe(clean());
});

gulp.task('watch', function() {
  gulp.watch('_scss/**/*.scss', ['styles']);
  gulp.watch(['_layouts/*.html', '_posts/*', '_config.yml', 'css/*'],
             ['jekyll-rebuild']);
});

gulp.task('jekyll-build', function (done) {
  browserSync.notify(messages.jekyllBuild);
  return cp.spawn('jekyll', ['build'], { stdio: 'inherit' })
    .on('close', done);
});

gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
  browserSync.notify(messages.jekyllBuildCompleted);
  browserSync.reload();
});

gulp.task('browser-sync', ['styles', 'jekyll-build'], function() {
  browserSync.init(null, {
    server: {
      baseDir: '_site'
    },
    host: "localhost"
  });
});

gulp.task('default', [ 'clean', 'browser-sync', 'watch' ]);
