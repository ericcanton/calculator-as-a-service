exports.add = function(a, b) {
    logOp(a, b, "+");
    return a+b;
}

exports.sub = function(a, b) {
    logOp(a, b, "-");
    return a-b;
}

exports.mult = function(a, b) {
    logOp(a, b, "*");
    return a*b;
}


exports.modulo = function(a, b) {
    logOp(a, b, "%");
    return a%b;
}

function logOp(a, b, op) {
    console.log(`Computing ${a} ${op} ${b}`)
}
