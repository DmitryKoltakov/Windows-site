"use strict";
//это импорты модулей которые понадобятся в проекте
const gulp = require("gulp");
const webpack = require("webpack-stream");
const browsersync = require("browser-sync");

const dist = "./dist/";//путь куда все будет компилироваться
// const dist = 'C:/MAMP/htdocs/test';
gulp.task("copy-html", () => {//это задание для галпа
    return gulp.src("./src/index.html")//отслеживаем файл html
                .pipe(gulp.dest(dist))//перемещаем его в папку дист
                .pipe(browsersync.stream());//перезагружам страницу
});

gulp.task("build-js", () => {//таск по компиляции скриптов через вебпак
    return gulp.src("./src/js/main.js")
                .pipe(webpack({// запускаем вебпак на главном файл main.js
                  //это настройки вебпака
                  mode: 'development',//режим разработки
                    output: {//куда будет складываться компилированный код
                        filename: 'script.js'
                    },
                    watch: false,//слежение за изменениями будет выполнять отдельная задача
                    devtool: "source-map",//подключили карту проекта
                    module: {//модуль выбпака
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {//настройки бейбеля
                                    debug: true,//консоль покажет где проблемы если что то пойдет не так
                                    corejs: 3,//позволит подключать полифилы(код в старом стандарте)
                                    useBuiltIns: "usage"//подключаем только необходимые полифилы
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist))//берем тот файл который получился и отправляем в dist
                .on("end", browsersync.reload);// если что то изменилось то перезагружаем страничку
});

gulp.task("copy-assets", () => { 
    return gulp.src("./src/assets/**/*.*")// берем любые файлы в любых папках из папки assets
                .pipe(gulp.dest(dist + "/assets"))// переносим в дист
                .on("end", browsersync.reload);//перезагружаем страницу
});

gulp.task("watch", () => {//отдельный таск вотч
    browsersync.init({//запускается отдельный сервер
		server: "./dist/",//серверит файлы которые в этой папке
		port: 4000,
		notify: true
    });
    
    //следим за изменениями в этих  файлах и  если что запускаем таски
    gulp.watch("./src/index.html", gulp.parallel("copy-html"));
    gulp.watch("./src/assets/**/*.*", gulp.parallel("copy-assets"));
    gulp.watch("./src/js/**/*.js", gulp.parallel("build-js"));
});

//при первом запуске будут запускаться все 3 задачи
gulp.task("build", gulp.parallel("copy-html", "copy-assets", "build-js"));
//запускает другой режим вебпака - продакшн.Для финальной версии проекта
gulp.task("build-prod-js", () => {
    return gulp.src("./src/js/main.js")
                .pipe(webpack({
                    mode: 'production',
                    output: {
                        filename: 'script.js'
                    },
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist));
});
//если в терминал написать gulp запустится билд и вотч параллельно
gulp.task("default", gulp.parallel("watch", "build"));