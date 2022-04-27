var startTime = Date.now();
module.exports = {startTime};
const Main = require("./main");
let folder = null;//"/home/shivamsuri/Desktop/test";/Users/shivamsuri/Documents/test

if(process.argv[2]){
    inputDirectory = process.argv[2];
    const obj = new Main();
    obj.execute(inputDirectory);
}
else{
    console.log("Path for Input directory not found. Please specify path.\nExample: /home/user1/Documents/inputdirectory");
    process.exit(9);
}