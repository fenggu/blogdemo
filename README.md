1.npm install 提示缺失 缺啥装啥，报不识别jsx的错误的话  在根目录创建 一个 .babelrc的文件 
	 文件内容为：{
	  "presets": ["es2015", "stage-0", "react"],
	  "plugins": ["transform-runtime",["import", [{ "libraryName": "antd", "style": "css" }]]]
	}

 ./mongod --dbpath "../data"
2. npm run dev 进行调试
	:8010 后台管理
3. npm run build 生成静态文件
4. node app.js开启后台服务器
	:8080/admin.html 后台管理
	     /index?pid=  前端页
5.文件结构：
	app:后台node代码
	data:用户资料备用
	dist:webpack 产出的静态文件
	src：react 生产环境代码
	static:正式产出代码
	views:用户答题页面ejs模板
