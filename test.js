console.log("Starting test http server ...");
my_http = require("http");
my_http.createServer(function(request,response){
	console.log("I got kicked");
	response.writeHeader(200, {"Content-Type": "text/plain"});
	response.write("Hello World!");
	response.end();
}).listen(8080);
console.log("Server running on 8080");