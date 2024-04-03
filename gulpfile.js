const gulp = require("gulp");
const less = require("gulp-less");

function compileLess() {
  return gulp.src("./style.less").pipe(less()).pipe(gulp.dest("."));
}

function watchLess() {
  gulp.watch("style.less", compileLess);
}

exports.less = compileLess;
exports.watch = watchLess;
