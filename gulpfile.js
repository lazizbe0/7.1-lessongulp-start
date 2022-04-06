global.$ = {
    gulp: require("gulp"),
    bs: require("browser-sync").create(),
    
    path:{
        src:{
            html: "./app/src/index.html"
        },
        build: {
            html: "./app/build/"
        },
    }
}


taskList = {
    html: () => {
        $.gulp.task("html", () => {
            $.gulp.src($.path.src.html)
            .pipe($.gulp.dest($.path.build.html))
        })
    },
    server: () => {
        $.gulp.task('server', () => {
            $.bs.init({
                server: {
                    baseDir: "./app/build/"
                }
            })
        })
    }
}

for (const key in taskList) {
    taskList[key]();
    
}

$.gulp.task('default', $.gulp.series($.gulp.parallel(["html", "server"])));
