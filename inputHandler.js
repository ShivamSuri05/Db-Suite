'use strict';

class input{
    constructor(){
        this.fs = require("fs");
        this.currentfileIndex = 0;
    }
    initialize(folderName){
        return new Promise((res) => {
            this.fs.readdir(folderName,(err,files)=>{
                console.log("in promise")
                if(err){
                    console.log(err)
                }
                else{
                    res(files)
                }
            })
        })

        // this.fs.readdirSync(folderName).forEach(file =>{
        //     this.files.push(file);
        //     console.log(file);
        // });
    }
    getNextQuery(){
        // will return the next query from this.files
        let sql = "SELECT * FROM employee";
        if(this.currentfileIndex>4){
            sql = null;
        }
        this.currentfileIndex++;
        return sql;
    }

    async getNext(filePath){
        console.log("check1")
        return new Promise((res)=>{
            this.fs.readFile(filePath,'utf8',function(err,filetext){
                //console.log(filetext)
                res(filetext)
            })
        })
    }
}

module.exports = input;