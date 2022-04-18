const execute = require("./main");

let folder = null;//"/home/shivamsuri/Desktop/test";

if(process.argv[2]){
    folder = process.argv[2];
    execute(folder);
}
else{
    console.log("Path for Input directory not found. Please specify path.\nExample: /home/user1/Documents/inputdirectory");
    process.exit(9);
}
