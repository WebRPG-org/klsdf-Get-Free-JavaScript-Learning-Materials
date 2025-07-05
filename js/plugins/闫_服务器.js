var http = require("http");
var querystring = require("querystring")
var server = http.createServer(function(request,response){
	const methods = request.method;
	const url = request.url;
	const path = url.split('?')[0];
	const query = querystring.parse(url.split('?')[1]);

	response.setHeader("Content-Type","application/json;charset=utf-8");
	response.setHeader("Access-Control-Allow-Origin","*");
	const resData = {
		methods,url,path,query
	}
	if(methods==='GET')
	{
		// console.log("这里是JavaScript收到信息")

		response.end(JSON.stringify($gloablData));
	}

	if(methods==='POST'){
		let postData = '';
		request.on('data',chunk=>{
			postData+=chunk.toString()
		})
		request.on('end',chunk=>{
			resData.postData=postData;

			var obj = JSON.parse(resData.postData)
			console.log(obj)
			response.end(JSON.stringify({mod:"GGG"}));
			
		})
	} 
});

server.listen(8000,function(){
	console.log("服务器启动成功");
});

	

