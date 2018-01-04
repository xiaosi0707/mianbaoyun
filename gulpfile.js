/**
 * Created by jinjiyong on 2017/04/10
 */
'use strict';

var gulp = require('gulp'),                         //  引入本地gulp工具包
    clean = require('gulp-clean'),                  //  清空文件
    htmlmin = require('gulp-htmlmin'),              //  页面压缩
    sass = require('gulp-sass'),                    //  SASS编译
    autoprefixer = require('gulp-autoprefixer'),    //  CSS属性浏览器前缀添加
    minifycss = require('gulp-minify-css'),         //  CSS压缩
    imagemin = require('gulp-imagemin'),            //  图片压缩
    pngquant = require('imagemin-pngquant'),        //  图片压缩
    cache = require('gulp-cache'),                  //  缓存
    jshint = require('gulp-jshint'),                //  JavaScript检测
    uglify = require('gulp-uglify'),                //  JavaScript压缩
    concat = require('gulp-concat'),                //  文件合并
    browserify = require('browserify'),
    htmlreplace = require('gulp-html-replace'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    argv = require('yargs').argv,
    envify = require('envify/custom'),
    stripDebug = require('gulp-strip-debug'),
    ngAnnotate = require('gulp-ng-annotate'),       //  压缩后$scope依赖注入
    webserver = require('gulp-webserver');          //  WEB服务器


//  清空构建目录
gulp.task('clean', function () {
    return gulp.src('./dist/')
        .pipe(clean());
});

//  压缩入口页面文件
gulp.task('indexmin', function () {
    return gulp.src('./index.html')
        .pipe(htmlmin())
        .pipe(gulp.dest('./dist'));
});

//  压缩模块页面文件
gulp.task('htmlmin', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        minifyCSS: true,//压缩页面CSS
        minifyJS: true//压缩页面JS
    };
    gulp.src('./modules/**/**/*.html')
        //.pipe(rev())
        .pipe(htmlmin(options))
        .pipe(gulp.dest('./dist/modules'));
        // .pipe(rev.manifest())
        // .pipe(gulp.dest('rev/html'));
});

//  编译SASS文件
gulp.task('sass', function () {
    return gulp.src('./css/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

//  压缩CSS文件
gulp.task('css', function () {
    return gulp.src('./css/*.css')
        .pipe(rev())
        .pipe(autoprefixer())
        .pipe(minifycss())
        .pipe(gulp.dest('./dist/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/css'));
});

//  压缩图片
gulp.task('img', function () {
    return gulp.src('./img/**/*.{png,jpg,gif,ico}')
        .pipe(rev())
        .pipe(cache(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('./dist/img'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/img'));
});


//  检测JavaScript
gulp.task('jshint', function () {
    var files = [
        './modules/**/*.js',
        './modules/**/**/*.js',
        './app.js'
    ];
    return gulp.src(files)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

//  合并脚本
gulp.task('js-bundle', function () {
    var b = browserify();
    b.add('./modules/common/init.js');
    b.add('./modules/index/init.js');
    b.add('./modules/center/init.js');
    b.add('./app.js');

    var prefix = argv._[0] === 'build' ? 'dev': 'prod';
    b.transform(envify({
        CONFIG: require('./config/' + prefix + '.json')
    }));

    if(prefix === 'dev') {
        return b.bundle()
            .pipe(source('cx.min.js'))
            .pipe(buffer())
            .pipe(ngAnnotate())
            .pipe(uglify())
            .pipe(rev())
            .pipe(gulp.dest('./dist'))
            .pipe(rev.manifest())
            .pipe(gulp.dest('rev/js'));
    } else {
        return b.bundle()
            .pipe(source('cx.min.js'))
            .pipe(buffer())
            .pipe(ngAnnotate())
            .pipe(uglify())
            //.pipe(stripDebug())
            .pipe(rev())
            .pipe(gulp.dest('./dist'))
            .pipe(rev.manifest())
            .pipe(gulp.dest('rev/js'));
    }
});

//  合并第三方库
gulp.task('lib-bundle', function () {
    var files = [
        './lib/angular/angular.js',
        './lib/angular/angular-ui-router.js',
        './lib/angular/angular-cookies.js',
        './lib/angular/angular-touch.min.js',
        './lib/jquery/jquery-3.2.1.min.js',
		'./lib/swiper/swiper-3.4.2.jquery.min.js'
    ];
    return gulp.src(files)
        .pipe(concat('lib-bundle.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

//  替换页面引用
gulp.task('replace', ['htmlmin', 'js-bundle', 'lib-bundle', 'indexmin'], function () {
    var opts = {
        js: ['lib-bundle.min.js', 'cx.min.js']
    };
    return gulp.src('./dist/index.html')
        .pipe(htmlreplace(opts))
        .pipe(gulp.dest('./dist'));
});

//缓存元素处理
gulp.task('htmlRouter', ['replace'], function() {
    return gulp.src(['rev/**/*.json', './dist/**/*.html', './dist/**/*.js', './dist/**/*.css'])
        .pipe(revCollector({replaceReved: true}))
        .pipe(gulp.dest('./dist/'));
});

//  启动WEB服务器
gulp.task('webserver', function () {
    gulp.src('./dist')
        .pipe(webserver({
            host: 'localhost',
            port: 8083,
            livereload: true,
            directoryListing: false,
            open: false
        }));
});

//  监听文件修改
gulp.task('watch', function () {
    gulp.watch('./modules/**/**/*.html', ['htmlmin']);
    gulp.watch('./css/*.css', ['css']);
    gulp.watch('./img/**/*.{png,jpg,gif,ico}', ['img']);
    gulp.watch(['./modules/**/*.js', './modules/**/**/*.js', './app.js'], ['jshint']);
    gulp.watch(['./modules/**/*.js', './modules/**/**/*.js', './app.js'], ['js-bundle']);
});

// 监听sass文件修改
gulp.task('sass:watch', function () {
    gulp.watch('./css/**/*.scss', ['sass']);
});

//  默认
gulp.task('default', function () {
    gulp.start('watch', 'webserver', 'sass:watch');
});

//  开发环境
gulp.task('build', ['clean'], function () {
    gulp.start('sass', 'css', 'img', 'htmlRouter');
});

//  正式环境
gulp.task('prod', ['clean'], function () {
    gulp.start('sass', 'css', 'img', 'htmlRouter');
});
