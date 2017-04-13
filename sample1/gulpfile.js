

//引入gulp和gulp插件
var gulp = require('gulp'),
    runSequence = require('run-sequence'),  //gulp 的 task 都是并行(异步)执行，如果遇见需要串行的场景，那么这个插件就是必备了。使用场景是：处理(压缩、合并等等) 
    rev = require('gulp-rev'),				//- 对文件名加MD5后缀
    revCollector = require('gulp-rev-collector');   //- 进行路径替换
	
	
var cssSrc='css/*.css';
var jsSrc=['*/*.js','app/*/*.js'];


//CSS生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revCss', function(){
    return gulp.src(cssSrc)
        .pipe(rev()) 
		//.pipe(gulp.dest('dist/css'))   将文件发布到指定目录
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/css'));
});


//js生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revJs', function(){
    return gulp.src(jsSrc)
        .pipe(rev())
		//.pipe(gulp.dest('dist'))    将文件发布到指定目录
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/js'));
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
        ['revJs'],
        ['revHtml'],
        done);
});


gulp.task('default', ['dev']);

