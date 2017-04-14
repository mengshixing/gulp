# gulp
two method of use gulp handle (css/js)

在网页上，我们经常需要引进静态资源css和js,清除页面引用缓存？就是给页面引用添加版本号。

一. 第一种就是替换所有html5 页面中的引用路径,替换完之后如下所示：
		
	<script  src="lib/hprose.js?v=95b1fbf3a0" ></script>		
	<link rel="stylesheet" href="css/angular-ui-tree.css?v=86e8170240">
   
   使用方法：
   
    1 将sample1中的内容（node包,gulpfile.js,package.json）拷贝到项目根目录
    
    2 切换命令行至工作区,执行 gulp 即可.
   
   参考了https://segmentfault.com/a/1190000006204457 文章

二.第二种是给资源文件加上版本号后缀,如下所示

	<link rel="stylesheet" href="css/bootstrap-ec3bb52a00.min.css">
	
使用方法：

1 下载包

npm install --save-dev gulp

npm install --save-dev gulp-rev

npm install --save-dev gulp-rev-collector

npm install --save-dev run-sequence

npm install --save-dev gulp-concat

npm install --save-dev gulp-uglify

2 将sample2中的内容（gulpfile.js,package.json）拷贝到项目根目录,执行任务即可
