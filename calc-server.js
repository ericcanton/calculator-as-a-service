const ops = require('./lib/operations');
const http = require("http");

const port = process.env.CALC_PORT || 1200

http.createServer( (req, res) => {
    console.log("New incoming client request for " + req.url);

    res.writeHeader(200, {'Content-Type': 'application/json'});

    let api_re = /\/(add|sub|mult|modulo)\?[0-9.]+&[0-9.]+.*/

    if (!api_re.test(req.url)) {
        console.log("Improperly formatted API request.")
        res.write(`{"error": "Improperly formatted request. Format like: /operation?A&B for A and B integers or floats and operation in [add, sub, mult, modulo]. "}`);
        res.end();
    } else {
        let end_opt = req.url.split("?");
        let endpoint = end_opt[0];

        let comp = end_opt[1];
        var operads = comp.split("&");

        switch(endpoint) {
        case '/add':
            // Parse these to floats, otherwise + in ops.add interpreted as concatenation
            operads = [parseFloat(operads[0]), parseFloat(operads[1])];
            res.write(`{"operation": "${operads[0]} + ${operads[1]}", "answer": ${ops.add(operads[0], operads[1])}}`)
            break;
        case '/sub':
            res.write(`{"operation": "${operads[0]} - ${operads[1]}", "answer": ${ops.sub(operads[0], operads[1])}}`)
            break;
        case '/mult':
            res.write(`{"operation": "${operads[0]} * ${operads[1]}", "answer": ${ops.mult(operads[0], operads[1])}}`)
            break;
        case '/modulo':
            res.write(`{"operation": "${operads[0]} % ${operads[1]}", "answer": ${ops.modulo(operads[0], operads[1])}}`);
            break;
        default: // This should never trigger, but why not be careful?
            res.write(`{"error": "Operation ${endpoint} unknown. Try /add, /sub, /mult, or /modulo instead!}`);
        }
        res.end();
    }
}).listen(port);

console.log(`Listening on http://localhost:${port} ...`);
