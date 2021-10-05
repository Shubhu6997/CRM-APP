function printMsg(msg){
    console.log(msg);
}

function logger(msg){
    console.log(msg,"Shubham");
}

console.log(__filename);
console.log(__dirname);

const num = 5;
module.exports = {
    printMsg,
    show : logger,
    num
}

