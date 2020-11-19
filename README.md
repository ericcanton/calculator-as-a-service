# calculator-as-a-service
Four function calculator wrapped into a RESTful service. 
---  
This is a Node server exposing RESTful endpoints for adding, subtracting, multiplying, and finding remainders. 
The default port on which the server listens is 1200, but can be set using the `CALC_PORT` environment variable.

## API  
The format for the API is `/operation?A&B` to perform `operation` with floats `A` and `B`. For example, sending GET to 

  `http://localhost:1200/modulo?1278&43`
  
returns the JSON `{"operation": "1288 % 43", "answer": 31}`, since 1278 = 31 mod 43. (Or in C notation, `1278 % 43 == 31`.)  

The current endpoints are `/add`, `/sub`, `/mult`, and `/modulo`. Anything else returns an error and help message, wrapped as JSON. 

## Docker
If you'd like containerize this four-function calculator, try the included `Dockerfile` based on `node:12`. 
Port `1234` of the containers is exposed, and `CALC_PORT` is set to `1234`, so once you've built the
image with `docker build .` you can start this calculator service on your machine's port 1200 with  

  `docker run -p 1200:1234 <image ID hash>`
  
If you're new to Docker and are not sure what the `<image ID hash>` is, I mean the corresponding `IMAGE ID` column entry in the table
returned by the `docker images` command. I recommend [fireship.io's Docker Basics Tutorial](https://fireship.io/lessons/docker-basics-tutorial-nodejs/).

## TODO
- Add division!
- Add graphing service?
- Split server and computations into separate services. 
