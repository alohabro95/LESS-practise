const gulp = require("gulp");
const less = require("gulp-less");
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const replace = require("gulp-replace");
const browserSync = require("browser-sync").create();
const clean = require("gulp-clean");

const paths = {
  styles: {
    src: "src/**/*.less",
    dest: "dist/css/",
  },
  scripts: {
    src: "src/scripts/**/*.js",
    dest: "dist/src/scripts/",
  },
  html: {
    src: "*.html",
    dest: "dist/",
  },
  htmlElements: {
    src: "src/html/**/*.html",
    dest: "dist/src/html/",
  },
  layout: {
    src: "src/layout/**/*",
    dest: "dist/src/layout/",
  },
  assets: {
    src: "src/assets/**/*",
    dest: "dist/src/assets/",
  },
  json: {
    src: "*.json",
    dest: "dist/",
  },
};

function cleanTask() {
  return gulp.src("dist", { allowEmpty: true, read: false }).pipe(clean());
}

function compileLess() {
  return gulp
    .src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

function scripts() {
  return (
    gulp
      .src(paths.scripts.src)
      .pipe(sourcemaps.init())
      // .pipe(concat("main.min.js"))
      .pipe(uglify())
      .pipe(sourcemaps.write("."))
      .pipe(gulp.dest(paths.scripts.dest))
      .pipe(browserSync.stream())
  );
}

function html() {
  return (
    gulp
      .src(paths.html.src)
      .pipe(replace("src/scripts/", "src/scripts/"))
      // .pipe(replace("src/assets/", "src/assets/"))
      // .pipe(replace("src/layout/", "src/layout/"))
      .pipe(gulp.dest(paths.html.dest))
      .pipe(browserSync.stream())
  );
}

function layout() {
  return gulp
    .src(paths.layout.src)
    .pipe(gulp.dest(paths.layout.dest))
    .pipe(browserSync.stream());
}

function htmlElements() {
  return gulp
    .src(paths.htmlElements.src)
    .pipe(gulp.dest(paths.htmlElements.dest))
    .pipe(browserSync.stream());
}

function assets() {
  return gulp
    .src(paths.assets.src, { encoding: false })
    .pipe(gulp.dest(paths.assets.dest));
  // .pipe(browserSync.stream());
}

function json() {
  return gulp
    .src(paths.json.src)
    .pipe(gulp.dest(paths.json.dest))
    .pipe(browserSync.stream());
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
  });

  gulp.watch(paths.styles.src, compileLess);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.html.src, html);
  gulp.watch(paths.htmlElements.src, htmlElements);
  gulp.watch(paths.layout.src, layout);
  gulp.watch(paths.assets.src, assets);
  gulp.watch(paths.json.src, json);
}

exports.clean = cleanTask;
exports.styles = compileLess;
exports.scripts = scripts;
exports.html = html;
exports.htmlElements = htmlElements;
exports.layout = layout;
exports.assets = assets;
exports.json = json;
exports.watch = watch;
exports.default = gulp.series(
  cleanTask,
  gulp.parallel(compileLess, scripts, html, htmlElements, layout, assets, json),
  watch
);
