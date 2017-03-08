/* 
Name: Jackie Ellis
Student Number: 100940821
*/

// modules
var http = require('http');
var fs = require('fs');
var mime = require('mime-types');
var url = require('url');

const ROOT = "./public_html";

// create http server
var server = http.createServer(handleRequest); 
server.listen(4002);
console.log('Server listening on port 4002');

/* 
Inputs: req, res - the request and response objects
*/
function handleRequest(req, res) {
	//process the request
	console.log(req.method+" request for: "+req.url);
	
	//parse the url
	var urlObj = url.parse(req.url,true);
	var filename = ROOT+urlObj.pathname;


	fs.stat(filename,function(err, stats){
		if(err){ 
			respondErr(err);
		}else{
			if(stats.isDirectory())	filename+="/index.html";
		
			fs.readFile(filename,function(err, data){
				if(err)respondErr(err);
				else respond(200,data);
			});
		}
	});

	/* Serving the 404 page when there is an error */
	function serve404(){
		fs.readFile(ROOT+"/404.html","utf8",function(err,data){ //async
			if(err)respond(500,err.message);
			else respond(404,data);
		});
	}

	/* Server error 
	   Input: the error
	*/
	function respondErr(err){
		console.log("Handling error: ",err);
		if(err.code==="ENOENT"){
			serve404();
		}else{
			respond(500,err.message);
		}
	}

	/* Serving the 404 page when there is an error 
	   Input: code, data - the response code and the data to be sent
	*/
	function respond(code, data){
		// content header
		res.writeHead(code, {'content-type': mime.lookup(filename)|| 'text/html'});
		// write message and signal communication is complete
		res.end(data);
	}	
	
};