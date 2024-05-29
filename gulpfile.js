/* eslint-disable */
const gulp = require("gulp");
const sass = require("gulp-dart-sass");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");

gulp.task("stylelint", function lintStyles() {
  const gulpStylelint = require("@ronilaukkarinen/gulp-stylelint");
  return gulp.src("src/scss/**/*.scss").pipe(
    gulpStylelint({
      reporters: [
        {
          formatter: "string",
          console: true
        }
      ]
    })
  );
});

gulp.task("scss", function compileStyles() {
  return gulp
    .src("./src/scss/style.scss")
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        includePaths: ["node_modules"],
        outputStyle: "compressed"
        // importer: tildeImporter
      }).on("error", sass.logError)
    )
    .pipe(autoprefixer("last 2 version"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./css"));
});

// Tasks
gulp.task("default", gulp.series("stylelint", "scss"));

gulp.task("watch", function() {
  gulp.watch("./src/scss/**/*.scss", gulp.series("stylelint", "scss"));
  gulp.watch(["./css/style.css", "./**/*.html.twig"]);
});
/* eslint-enable */
