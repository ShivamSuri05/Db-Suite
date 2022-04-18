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
        //this.fields = fields + newLine;

        let fields2 = ['Filename','No of Test Cases','Pass','Fail'];

        fs.writeFile((this.dirname+'/'+filename+'.csv'), fields.toString(), function (err) {
            if (err) throw err;
            console.log(`file ${filename+'.csv'} saved`);
        });

        fs.writeFile((this.dirname+'/'+filename+'_Stats.csv'), fields2.toString(), function (err) {
            if (err) throw err;
            console.log(`file ${filename+'_Stats.csv'} saved`);
        });
    }
    appendFile(file,result,isStats){
        console.log(result);
        if(isStats)
        {
        let res = newLine + file + ',' + result[0] + ',' + result[1] + ',' + result[2];
        fs.appendFile((this.dirname+'/'+file+'_Stats.csv'), res, function (err) {
                if (err) throw err;
            //console.log('The "data to append" was appended to file!');
            });
        }
        else{
            let csv =  newLine + json2csv(result,{header:false});
            fs.appendFile((this.dirname+'/'+file+'.csv'), csv, function (err) {
                if (err) throw err;
            });
        }
    }
}

module.exports = report;