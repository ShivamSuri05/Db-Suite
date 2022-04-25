'use strict'
const fs = require("fs")
const ObjectsToCsv = require('objects-to-csv');
let json2csv = require('json2csv').parse;
let newLine = '\r\n';


class report {
    constructor(dirname) {
        this.dirname = dirname + "/output"
        fs.mkdir((this.dirname), (err) => {
            if (err) {
                console.log(err)
            }
            else {
                console.log("Directory created successfully. Path ", this.dirname)
            }
        })
    }
    initialize(filename) {

        let fields = ['Serial No', 'SQL Query', 'Results from DB1', 'Results from DB2', 'Comparison Result'];

        fs.writeFile((this.dirname + '/' + filename + '.csv'), fields.toString(), function (err) {
            if (err) throw err;
            console.log(`file ${filename + '.csv'} saved`);
        });
    }

    appendFile(file, result) {
            let csv = newLine + json2csv(result, { header: false });
            fs.appendFile((this.dirname + '/' + file + '.csv'), csv, function (err) {
                if (err) throw err;
            });
    }

    async createFinalReport(results){
        const csv = new ObjectsToCsv(results);

        try{
            await csv.toDisk(this.dirname + '/report.csv');
        }
        catch(e){
            console.log("could not complete writing into file ", e)
        }
        finally{
            console.log(`Writing to file completed. Path: ${this.dirname}/report.csv`)
            let st = require("./main").startTime
            console.log(`Time Taken: ${Date.now()-st} ms`)
        }
    }
}

module.exports = report;