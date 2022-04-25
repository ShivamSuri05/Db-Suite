const db = require("./dbQueryHandler");
const input = require("./inputHandler");
const comp = require("./comparison");
const rep = require("./reportHandler")
const async = require("async")

class Main{
    constructor(){
        this.startTime = Date.now();
    }
    initialize(folder){
        this.inputHandler = new input();
        this.connection = new db();
        this.report = new rep(folder.substr(0, folder.lastIndexOf('/')));
        this.connection.initialize();
        this.folder = folder
    }
    async execute(){
        const inputHandler = this.inputHandler;
        const connection = this.connection;
        const report = this.report;
        let folder = this.folder;
        let startTime = this.startTime;
        let files = await inputHandler.initialize(folder);
        //files contain all filenames of the folder
        console.log(files)
        let finalStats = [];
        async.forEachOfLimit(files, 1, function (file, index, callback) {
            const comparison = new comp();
            report.initialize(file);
            let fetchqueries = inputHandler.getAllQueriesFromFile(folder + '/' + file);
            fetchqueries.then((queries) => {
                const queryList = queries.split("\n")
                async.forEachOfLimit(queryList, 1, function (sqlQuery, index, callback1) {
                    if(sqlQuery==''){
                        callback1()
                    }
                    const fetchResults = connection.fetch(sqlQuery);
                    fetchResults.then((results) => {
                        let result = comparison.compare(1+index, sqlQuery, results[0].db1, results[1].db2);
                        report.appendFile(file, result)
                        callback1();
                    })
                }, function (err) {
                    let ans = comparison.getFinalStats()
                    ans.Filename = file
                    finalStats.push(ans)
                    callback()
                });
            })
        }, function (err) {
            connection.exit()
            report.createFinalReport(finalStats,startTime)
        });
    }
}

module.exports = Main;