const db = require("./dbQueryHandler");
const input = require("./inputHandler");
const comp = require("./comparison");
const rep = require("./reportHandler")


async function execute(folder) {
    const inputHandler = new input();
    const connection = new db();
    const comparison = new comp();
    const report = new rep(folder.substr(0,folder.lastIndexOf('/')));

    connection.initialize();
    let files = await inputHandler.initialize(folder);
    //files contain all filenames of the folder
    console.log(files)
    for (const file of files) {
        if (file == "output") {
            continue
        }
        report.initialize(file)
        let queries = await inputHandler.getAllQueriesFromFile(folder + '/' + file)
        //queries contain all queries from file
        const queryList = queries.split("\n")
        //queryList contains all queries in a list
        let rowNo = 1
        for (const sql of queryList) {
            //console.log(sql)
            if (sql != '') {
                const fetchResults = connection.fetch(sql);
                fetchResults.then((results) => {
                    let result = comparison.compare(rowNo++, sql, results[0].db1, results[1].db2)
                    //console.log(result)
                    //The comparison result that we will get, will be fed to reportHandler
                    //console.log(result,file)
                    report.appendFile(file, result)
                })
            }
        }
    }
}

module.exports = execute;