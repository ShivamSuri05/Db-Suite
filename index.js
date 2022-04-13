const express = require("express");
const db = require("./dbQueryHandler");
const input = require("./inputHandler");
const comp = require("./comparison")

const app = express();

const inputHandler = new input();
const connection = new db();
const comparison = new comp();

let folder = "./config";
let count = 0,query;


inputHandler.initialize(folder);
connection.initialize();

while((query = inputHandler.getNextQuery()) && count<1){
    console.log(query);
    let answer = [];
    connection.fetch(query,function(result){
        answer.push(result);
        if(answer.length>1){
            comparison.compare(answer);
            //The comparison result that we will get, will be fed to reportHandler
        }
    })
    
    //console.log(count);
    count++;
}



