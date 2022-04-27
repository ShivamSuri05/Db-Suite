const Db = require("./dbQueryHandler");
const InputHandler = require("./inputHandler");
const Compare = require("./comparison");
const ReportHandler = require("./reportHandler")
const async = require("async")

class Executor{
    async execute(folder){
        let inputHandler = new InputHandler();
        let connection = new Db();
        let report = new ReportHandler(folder.substr(0, folder.lastIndexOf('/')));
        let files = await inputHandler.initialize(folder);
        //files contain all filenames of the folder
        console.log(files);
        let finalStats = [];
        async.forEachOfLimit(files, 1, function (file, index, callback) {
            const comparison = new Compare();
            report.initialize(file);
            let fetchqueries = inputHandler.getAllQueriesFromFile(folder + '/' + file);
            fetchqueries.then((queries) => {
                const queryList = queries.split("\n")
                async.forEachOfLimit(queryList, 1, function (sqlQuery, index, cb) {
                    if(sqlQuery!=''){
                        const fetchResults = connection.executeQuery(sqlQuery);
                        fetchResults.then((results) => {
                            let indexno = 1 + index;
                            let result = comparison.compare(indexno, sqlQuery, results[0].db1, results[1].db2);
                            report.appendFile(file, result)
                            if(!result["Comparison Result"])
                            report.writeOutputFile(file,indexno,sqlQuery,results[0].db1, results[1].db2);
                            cb();
                        })
                    }
                    else{
                        cb();
                    }
                }, function (err) {
                    let ans = report.getStatsForFile()
                    ans.Filename = file
                    finalStats.push(ans)
                    callback()
                });
            })
        }, function (err) {
            connection.close()
            report.createFinalReport(finalStats)
        });
    }
}

module.exports = Executor;