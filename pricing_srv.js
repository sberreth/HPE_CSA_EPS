console.log("Starting Pricing Tinker Server");

listenport = 8080
my_http = require("http");
my_http.createServer(function(request, response) {
        // console.log("I got kicked");
        
        

        var request_body_string = "";
        // Hook into 'data' event, called to append chunked body into one big string
        request.on('data', function(chunk) {
              console.log("Received body data:");
              console.log(chunk.toString());
              request_body_string += chunk.toString()
            });

        // Hook into 'end' event, called when no more data
        request.on('end', function() {
	        if (request_body_string){
                var pricing_request = JSON.parse(request_body_string);
                var templatepath = "";
                var fs = require('fs');
				var template
				
				// Parse into JS object
                console.log("---");
                console.log(JSON.stringify(pricing_request, null, 4));
                // read template from file named like the string in "base-price-key".json
                templatepath="./templates/"+pricing_request["base-price-key"]+".json";
                console.log("reading from "+templatepath);
				// Read the file and send to the callback
                fs.readFile(templatepath, handleFile)

                function handleFile(err, data) {
                    if (err) throw err
                      template = JSON.parse(data)
                      console.log("+++");
                      console.log(JSON.stringify(template, null, 4));
                      //
                      // implement any merging / business logic here
                      //
                      response.writeHeader(200, {"Content-Type": "text/plain"});
	                  response.write(JSON.stringify(template, null, 4));
        		      response.end();
                    }    

                } 
             else {
	            console.log("Request body is empty");
	            // could respond with a "204 No Content"HTTP status code, but for debugability
	            // with the browser, return 200 so it properly displays there.
	            response.writeHeader(200, {"Content-Type": "text/plain"});
	            response.write("Pricing Tinker Server sais hello! (and the request body was empty)");
        		response.end();
	           }
            });

}).listen(listenport);

console.log("Server running on " + listenport);
