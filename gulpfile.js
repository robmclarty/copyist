'use strict';

// NOTE: This file depends on gulp and gulp-cli v4.0
// Reference: https://github.com/gulpjs/gulp/tree/4.0
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const minifycss = require('gulp-cssnano');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const gulpif = require('gulp-if');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const argv = require('yargs').argv;

const autoprefixerBrowsers = [
  'last 3 versions',
  'ie >= 9',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

// Concatenate all app JS files, parse JSX and ES6 using Babel, write
// sourcemaps, use browserify for CommonJS and output to 'build/application.js'
// as ES5.
gulp.task('build:app', function () {
  const isProduction = process.env.NODE_ENV === 'production';
  const browserifyOptions = {
    entries: ['./src/app'],
    debug: true,
    fullPaths: false
  };
  const babelifyOptions = {
    presets: ['es2015', 'react'],
    plugins: ['babel-plugin-transform-object-rest-spread']
  };
  const stream = browserify(browserifyOptions)
    .transform(envify())
    .transform(babelify.configure(babelifyOptions));

  return stream
    .bundle()
    .pipe(source('application.js'))
    .pipe(buffer())
    .pipe(gulpif(!isProduction, sourcemaps.init({ loadMaps: true })))
      .pipe(gulpif(isProduction, uglify()))
    .pipe(gulpif(!isProduction, sourcemaps.write('.')))
    .pipe(gulp.dest('./build'));
});

// Simply copy the base example html file to the build/ folder.
gulp.task('build:html', function () {
  return gulp
    .src('./src/app/index.html')
    .pipe(gulp.dest('./build'));
});

// Compile all SASS into CSS along with auto-prefixing and rev-replace static
// assets. Minify and output to the public folder.
gulp.task('build:styles', function () {
  const isProduction = process.env.NODE_ENV === 'production';

  return gulp
    .src('./src/styles/main.scss')
    .pipe(gulpif(!isProduction, sourcemaps.init({ loadMaps: true })))
      .pipe(concat('application.scss'))
      .pipe(sass({ style: 'expanded' }))
      .pipe(autoprefixer(autoprefixerBrowsers))
      .pipe(gulpif(isProduction, minifycss()))
    .pipe(gulpif(!isProduction, sourcemaps.write()))
    .pipe(gulp.dest('./build'));
});

// Wipe out any existing files and folders in the build/ directory so we can
// start again fresh.
gulp.task('clean', function () {
  return del(['./build/**/*']);
});

// Set NODE_ENV to 'production'. Used when compiling React for production mode.
// If not set to production env, React will perform additional checks and
// validations and output errors and warnings to the console, and thus also
// perform slower.
function setProductionEnv(done)
  process.env.NODE_ENV = 'production';
  done();
}

// Rebuild assets when changes are made.
function watch() {
  gulp.watch('./src/styles/**/*', gulp.parallel('build:styles'));
  gulp.watch('./src/app/**/*', gulp.parallel('build:app', 'build:html'));
}
watch.description = 'Watch variable folders for changes and rebuild if necessary.';
gulp.task(watch);

// Choose between building for dev or production based on --production flag.
function build(done) {
  if (argv.production) {
    return gulp.series(
      'clean',
      setProductionEnv,
      gulp.parallel(
        'build:app',
        'build:html',
        'build:styles'
      )
    );
  }

  return gulp.parallel(
    'build:app',
    'build:html',
    'build:styles'
  );
});
build.description = 'Build all the things!';
build.flags = {
  '--production': 'Builds in production mode (e.g., minification, etc.).'
};
gulp.task(build);

gulp.task('default', gulp.series(build, watch));