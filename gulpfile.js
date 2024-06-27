const gulp = require("gulp");
const less = require("gulp-less");
const path = require("path");

function compileLess() {
  return gulp.src("src/**/*.less").pipe(less()).pipe(gulp.dest("css"));
}

function watchLess() {
  gulp.watch("src/**/*.less", compileLess);
}

exports.less = compileLess;
exports.watch = watchLess;
