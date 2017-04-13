

//引入gulp和gulp插件
var gulp = require('gulp'),
    runSequence = require('run-sequence'),  //gulp 的 task 都是并行(异步)执行，如果遇见需要串行的场景，那么这个插件就是必备了。使用场景是：处理(压缩、合并等等) 
    rev = require('gulp-rev'),				//- 对文件名加MD5后缀
    revCollector = require('gulp-rev-collector');   //- 进行路径替换
	
	
var cssSrc='css/*.css';
var jsSrc=['*/*.js','app/*/*.js'];


//CSS生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revCss', function(){
    return gulp.src(cssSrc)				//-使用数组的方式来匹配多种文件
        .pipe(rev()) 					//- 文件名加MD5后缀
		//.pipe(gulp.dest('dist/css'))   将文件发布到指定目录
        .pipe(rev.manifest())			//- 生成一个rev-manifest.json
        .pipe(gulp.dest('rev/css'));	//- 将 rev-manifest.json 保存到 rev 目录内
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
        .pipe(revCollector())	//- 执行文件内css,js名的替换
        .pipe(gulp.dest(''));	//- 替换后的文件输出的目录
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

