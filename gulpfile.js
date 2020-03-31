"use strict";
const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const server = require("browser-sync");
const csso = require("gulp-csso");
const cssDeclarationSorter = require("css-declaration-sorter");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const del = require("del");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const posthtml = require("gulp-posthtml");
const htmlmin = require("gulp-htmlmin");
const uglify = require("gulp-uglify");

/**BEFORE */
gulp.task("css", function() {
  return gulp
    .src("source/sass/style.+(scss|sass)")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(
      autoprefixer({
        cascade: false
      })
    )
    .pipe(
      postcss([
        cssDeclarationSorter({
          order: "concentric-css"
        })
      ])
    )
    .pipe(gulp.dest("source/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("source/css"))
    .pipe(server.stream());
});

gulp.task("serverStart", function() {
  server.init({
    server: "source/"
  });
  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("source/*.html").on("change", server.reload);
  gulp.watch("source/*.js").on("change", server.reload);
});

gulp.task("start", gulp.series("css", "serverStart"));
/**BEFORE */

/**AFTER */
gulp.task("clean", function() {
  return del("build/");
});

gulp.task("copy", function() {
  return gulp
    .src(
      [
        "source/fonts/**/*.{woff,woff2}",
        "source/**/*.ico",
        "source/css/**/*.css"
      ],
      {
        base: "source/"
      }
    )
    .pipe(gulp.dest("build/"));
});

gulp.task("images", function() {
  return gulp
    .src("source/img/**/*.{png,jpg,svg}")
    .pipe(
      imagemin([
        imagemin.optipng({
          optimizationLevel: 3
        }),
        imagemin.jpegtran({
          progressive: true
        }),
        imagemin.svgo()
      ])
    )
    .pipe(gulp.dest("build/img/"));
});

gulp.task("webp", function() {
  return gulp
    .src("build/img/**/*.{png,jpg}")
    .pipe(
      webp({
        quality: 90
      })
    )
    .pipe(gulp.dest("build/img/"));
});

gulp.task("sprite", function() {
  return gulp
    .src("build/img/**/icon-*.svg")
    .pipe(
      svgstore({
        inlineSvg: true
      })
    )
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img/"));
});

gulp.task("html", function() {
  return gulp
    .src("source/*.html")
    .pipe(posthtml([include()]))
    .pipe(
      htmlmin({
        collapseWhitespace: true
      })
    )
    .pipe(gulp.dest("build/"));
});

gulp.task("jsmin", function() {
  return gulp
    .src("source/js/**/*.js")
    .pipe(uglify())
    .pipe(
      rename(function(path) {
        path.basename += ".min";
      })
    )
    .pipe(gulp.dest("build/js"));
});

gulp.task("refresh", function(done) {
  server.reload();
  done();
});

gulp.task("serverEnd", function() {
  server.init({
    server: "build/"
  });
  gulp.watch("source/sass/**/*.+(scss|sass)", gulp.series("css"), "refresh");
  gulp.watch("source/img/icon-*.svg", gulp.series("sprite", "html"), "refresh");
  gulp.watch("source/*.html"), gulp.series("html"), "refresh";
  gulp.watch("source/**/*.js"), gulp.series("jsmin"), "refresh";
});
/**AFTER */

gulp.task(
  "build",
  gulp.series("clean", "copy", "images", "webp", "sprite", "html", "jsmin")
);

gulp.task("edit", gulp.series("build", "serverEnd"));
