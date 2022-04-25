
let folder = null;//"/home/shivamsuri/Desktop/test";/Users/shivamsuri/Documents/test

if(process.argv[2]){
    folder = process.argv[2]
    const main = require("./main")
    const obj = new main()
    obj.initialize(folder)
    obj.execute();
}
else{
    console.log("Path for Input directory not found. Please specify path.\nExample: /home/user1/Documents/inputdirectory")
    process.exit(9)
}
