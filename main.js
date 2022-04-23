const db = require("./dbQueryHandler");
const input = require("./inputHandler");
const comp = require("./comparison");
const rep = require("./reportHandler")
const async = require("async")

let startTime = Date.now();
async function execute(folder) {
    const inputHandler = new input();
    const connection = new db();
    const report = new rep(folder.substr(0, folder.lastIndexOf('/')));
    connection.initialize();
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
            queryList.pop();
            async.forEachOfLimit(queryList, 1, function (sqlQuery, index, callback1) {
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
        report.createFinalReport(finalStats)
    });
}

module.exports = execute;
module.exports.startTime = startTime;