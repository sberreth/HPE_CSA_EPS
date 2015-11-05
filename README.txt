HPE Software Field Guerilla CSA External Pricing Server (EPS)
Ben Coleman - ben.coleman@hpe.com
Stefan Berreth - sb@hpe.com
2015.11.5

EPS protocol spec are on the HPE internal RnD wiki. Ask Ben or Stefan to get them.

What you need to do:
Get Node.js from https://nodejs.org/ and install and configure it.

Start the server with: node pricing_srv.js

You'll see the output:
  Starting Pricing Tinker Server
  Server running on 8080

And the server will start listening on localhost:8080
Verify by pointing the browser at it: http://localhost:8080 

Test request body JSON files examples are of the form request_body_<unique number>.json ,
with the <unique number> equaling the value for "base-price-key": in the JSON body 
in the file. This convention is purely to recognize a JSON body file with a given ID 
in the filename.
  
To send a request with body from file body.json to local server:
curl -H "Content-Type: application/json" --data @request_body_987654321.json http://localhost:8080/

and the server will reply with a JSON response. The response is read from the file 
of the name of the string in "base-price-key".json from the templates/ directory. 
I.e. if the request is containing "base-price-key": "987654321", the response will come 
by sending the contents of ./templates/987654321.json .

Useful tools:
JSON validator: https://jsonformatter.curiousconcept.com



