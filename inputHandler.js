'use strict';

class InputHandler{
    constructor(){
        this.fs = require("fs");
        this.currentfileIndex = 0;
    }
    initialize(folderName){
        return new Promise((res) => {
            this.fs.readdir(folderName,(err,files)=>{
                if(err){
                    console.log(err);
                    throw err;
                }
                else{
                    files = files.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
                    res(files);
                }
            })
        })
    }

    async getAllQueriesFromFile(filePath){
        const first = new Promise((res)=>{
            this.fs.readFile(filePath,'utf8',function(err,filetext){
                if(err){
                    console.error(err)
                }
                res(filetext)
            })
        });
        return first.then((data)=>{
            return data
        })
    }
}

module.exports = InputHandler;