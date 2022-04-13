const express = require("express");
const db = require("./dbQueryHandler");
const input = require("./inputHandler");
const comp = require("./comparison")

const app = express();

const inputHandler = new input();
const connection = new db();
const comparison = new comp();

let folder = "/home/shivamsuri/Desktop/test";
let count = 0,query;


inputHandler.initialize(folder);
connection.initialize();

while(count<1 && (query = inputHandler.getNextQuery())){
    console.log(query);

    connection.fetch(query);

    // let answer = {};
    // connection.fetch(query,function(result){
    //     answer[Object.keys(result)] = Object.values(result);
    //     if(Object.keys(answer).length>1){
    //         comparison.compare(answer);
    //         //The comparison result that we will get, will be fed to reportHandler
    //     }
    // })

    //console.log(count);
    count++;
}



