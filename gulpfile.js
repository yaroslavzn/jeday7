'use strict';

var gulp = require('gulp');
var gp = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();
var del = require('del');
var spritesmith = require('gulp.spritesmith');
var gulpif = require("gulp-if");

// sass

gulp.task('sass', function () {
    return gulp.src('./src/scss/main.scss')
        .pipe(gp.sourcemaps.init())
        .pipe(gp.sass())
        .pipe(gp.autoprefixer({
            browsers: [
                'ie 8',
                'ie 9',
                '> 1%',
                'last 15 versions',
                'Opera 12.1'
            ]
        }))
        .on('error', gp.notify.onError({
            title: 'Error in SASS'
        }))
        .pipe(gp.csso())
        .pipe(gp.sourcemaps.write())
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// html

gulp.task('html', function () {
    return gulp.src('./src/*.html')
        .pipe(gulp.dest('./build'))
        .on('end', browserSync.reload);
});

// scripts

gulp.task('scripts', function () {
    return gulp.src('./src/scripts/main.js')
        .pipe(gulp.dest('./build/scripts'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// libs

gulp.task('scripts:libs', function () {
    return gulp.src([
        './src/libs/jquery/jquery-3.2.1.min.js'
    ])
        .pipe(gp.concat('libs.min.js'))
        .pipe(gulp.dest('./build/scripts'));
});

// fonts

gulp.task('fonts', function () {
    return gulp.src('./src/fonts/**/*.*')
        .pipe(gulp.dest('./build/fonts')); 
});

// images

gulp.task('images', function () {
    return gulp.src(['./src/images/**/*.{jpg,png}',
                    '!./src/images/{icons,icons/**}'])
        .pipe(gulp.dest('./build/images'));
});


// sprite:png

gulp.task('sprite:png', function () {
    return gulp.src('./src/sprite/**/*.png')
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: 'sprite.scss',
            imgPath: '../images/sprite/sprite.png'
        }))
        .pipe(gulpif('*.png', gulp.dest('./src/images/sprite')))
        .pipe(gulpif('*.scss', gulp.dest('./src/scss')));
});


// del

gulp.task('clean', function () {
    return del('./build');
});

// watcher

gulp.task('watch', function () {
    gulp.watch('./src/scss/**/*.scss', gulp.series('sass'));
    gulp.watch('./src/*.html', gulp.series('html'));
    gulp.watch('./src/scripts/main.js', gulp.series('scripts'));
    gulp.watch(['./src/images/**/*.{png,jpg}', '!./src/images/{icons,icons/**}'], gulp.series('images'));
});

// serv

gulp.task('serv', function () {
    browserSync.init({
        server: {
            baseDir: "./build"
        },
        notify: false
    });

});

// default

gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('sass', 'html', 'scripts', 'scripts:libs', 'fonts', 'images'),
    gulp.parallel('watch', 'serv')
));