'use strict';

class input{
    constructor(){
        this.fs = require("fs");
        this.currentfileIndex = 0;
    }
    initialize(folderName){
        return new Promise((res) => {
            this.fs.readdir(folderName,(err,files)=>{
                if(err){
                    console.log(err)
                }
                else{
                    files = files.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
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

    async getAllQueriesFromFile(filePath){
        return new Promise((res)=>{
            this.fs.readFile(filePath,'utf8',function(err,filetext){
                if(err){
                    console.error(err)
                }
                res(filetext)
            })
        })
    }
}

module.exports = input;