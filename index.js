const express = require("express");
const db = require("./dbQueryHandler");
const input = require("./inputHandler");
const comp = require("./comparison")

const app = express();

const inputHandler = new input();
const connection = new db();
const comparison = new comp();

let folder = "/Users/HP/Desktop/test";
let count = 0,query;

execute(folder);

async function execute(folder){
    connection.initialize();
    let files = await inputHandler.initialize(folder);
    console.log("here1")
    console.log(files)
    console.log("here2")
    let length = files.length
    let currentIndex = 2
    while(currentIndex<length){
        let query = await inputHandler.getNext(folder+'/'+files[currentIndex])
        console.log(query)
        currentIndex++;
    }
    console.log("after")
    
    // while(count<1 && (query = inputHandler.getNextQuery())){
    //     console.log(query);
    
    //     connection.fetch(query);
    //     count++;
    // }
}







    // let answer = {};
    // connection.fetch(query,function(result){
    //     answer[Object.keys(result)] = Object.values(result);
    //     if(Object.keys(answer).length>1){
    //         comparison.compare(answer);
    //         //The comparison result that we will get, will be fed to reportHandler
    //     }
    // })

    //console.log(count);
    



