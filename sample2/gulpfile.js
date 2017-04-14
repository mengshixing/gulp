
//引入gulp和gulp插件
var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    rev = require('gulp-rev'),
	concat = require("gulp-concat"),
	uglify = require("gulp-uglify"),
    revCollector = require('gulp-rev-collector');
	
	
var cssSrc='css/*.css';
var jsSrc=['*/*.js','app/*/*.js'];
 

//CSS生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revCss', function(){
    return gulp.src(cssSrc)
        .pipe(rev())
		.pipe(gulp.dest('dist'))   
		.pipe(rev.manifest())
        .pipe(gulp.dest('rev/css'));		
});



//Html替换css、js文件版本
gulp.task('revHtml', function () {
    return gulp.src(['rev/**/*.json', 'index.html'])
        .pipe(revCollector())
        .pipe(gulp.dest(''));
});


//开发构建
gulp.task('dev', function (done) {
    condition = false;
    runSequence(
        ['revCss'],
        ['revHtml'],
        done);
});


gulp.task('default', ['dev']);
//合并文件
gulp.task('concat', function () {
    gulp.src('app/controllers/*.js')  //要合并的文件
    .pipe(concat('all.js'))  // 合并匹配到的js文件并命名为 "all.js"
    .pipe(gulp.dest('dist/js'));
});
//压缩文件
gulp.task('minify-js', function () {
     gulp.src('app/controllers/*.js') // 要压缩的js文件
    .pipe(uglify())  //使用uglify进行压缩,更多配置请参考：
    .pipe(gulp.dest('dist')); //压缩后的路径
});

