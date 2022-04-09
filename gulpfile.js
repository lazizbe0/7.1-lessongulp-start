global.$ = {
  gulp: require("gulp"),
  bs: require("browser-sync").create(),
  glp: require("gulp-load-plugins")(),

  path: {
    src: {
      html: "./app/src/*.{html,pug,jade}",
      style: "./app/src/style/*.{css,scss,less}"
    },
    build: {
      html: "./app/build/",
      style: "./app/build/css/"
    },
    watch: {
      html: ["./app/src/*.{html,pug,jade}", "./app/src/view/*.{html,pug,jade}"],
      style: "./app/src/style/*.{css,scss,less}"
    },
  },
};

taskList = {
  html: () => {
    $.gulp.task("html", () =>
      $.gulp.src($.path.src.html)
      .pipe($.glp.include())
        .pipe($.glp.pug({pretty: true}))
        .pipe($.gulp.dest($.path.build.html))
        .on("end", $.bs.reload)
    );
  },
  style: () => {
    $.gulp.task("style", () =>
      $.gulp.src($.path.src.style)
        .pipe($.gulp.dest($.path.build.style))
        .on("end", $.bs.reload)
    );
  },  
  server: () => {
    $.gulp.task("server", () => {
      $.bs.init({
        server: {
          baseDir: "./app/build/",
        },
      });
    });
  },

  watch: () => {
    $.gulp.task("watch", () => {
      for (const key in $.path.watch) {
        $.gulp.watch($.path.watch[key], $.gulp.series(key));
      }
    });
  },
};

for (const key in taskList) {
  taskList[key]();
}

$.gulp.task("default", $.gulp.series($.gulp.parallel("html", "server", "watch", "style")));
