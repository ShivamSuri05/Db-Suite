'use strict'
const fs = require("fs")
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
        this.fields = fields + newLine;

        fs.writeFile((this.dirname+'/'+filename+'.csv'), fields.toString(), function (err) {
            if (err) throw err;
            console.log(`file ${filename+'.csv'} saved`);
        });
    }
    appendFile(file,result){
        let csv =  newLine + json2csv(result,{header:false});
        fs.appendFile((this.dirname+'/'+file+'.csv'), csv, function (err) {
            if (err) throw err;
            //console.log('The "data to append" was appended to file!');
        });
    }
}

module.exports = report;