var gulp = require('gulp'),
    clean = require('gulp-clean'),
    cp = require('child_process'),
    sass = require('gulp-ruby-sass'),
    rename = require('gulp-rename'),
    minifycss = require('gulp-minify-css')
    browserSync = require('browser-sync');

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build',
    cssBuild: '<span style="color: grey">Running:</span> css',
    jsBuild: '<span style="color: grey">Running:</span> javascript',
    jekyllBuildCompleted: '<span style="color: grey">Completed:</span> $ jekyll build',
    browserReload: '<span style="color: grey">Running:</span> browser-reload'
};

gulp.task('css', function() {
  browserSync.notify(messages.cssBuild);
  return gulp.src('_scss/**/*.scss')
    .pipe(sass({ style: 'expanded' }))
    .pipe(gulp.dest('css'))
    .pipe(gulp.dest('_site/css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('css'));
});

gulp.task('css-and-reload', ['css'], function() {
  browserSync.notify(messages.browserReload);
  browserSync.reload();
});

gulp.task('js', function() {
  browserSync.notify(messages.jsBuild);
  return gulp.src('_js/**/*.js')
    .pipe(gulp.dest('js'))
    .pipe(gulp.dest('_site/js'))
});

gulp.task('js-and-reload', ['js'], function() {
  browserSync.notify(messages.browserReload);
  browserSync.reload();
});

gulp.task('clean', function() {
  return gulp.src([ 'css', 'js', '_site' ], { read: false })
    .pipe(clean());
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

gulp.task('watch', function() {
  gulp.watch('_scss/**/*.scss', ['css-and-reload']);
  gulp.watch('_js/**/*.js', ['js-and-reload']);
  gulp.watch(['_layouts/*.html',
              '_includes/*.html',
              '_posts/*',
              '_config.yml',
              'index.html',
              'blog/*'],
             ['jekyll-rebuild']);
});

gulp.task('browser-sync', ['css', 'js', 'jekyll-build'], function() {
  browserSync.init(null, {
    server: {
      baseDir: '_site'
    },
    host: "localhost"
  });
});

gulp.task('deploy', ['jekyll-build'], function (done) {
  return cp.spawn('rsync',
                  ['-avz', '--delete', '_site/',
                   'jossware.com:/home/ryane/jossware.com'],
                  { stdio: 'inherit' })
    .on('close', done);
});

gulp.task('default', [ 'clean', 'browser-sync', 'watch' ]);
