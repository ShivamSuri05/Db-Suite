'use strict';

class input{
    constructor(){
        this.fs = require("fs");
        this.currentfileIndex = 0;
    }
    initialize(folderName){
        this.files = [];

        this.fs.readdirSync(folderName).forEach(file =>{
            this.files.push(file);
            console.log(file);
        });
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
}

module.exports = input;