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

        fs.writeFile((this.dirname+'/'+filename+'.csv'), fields.toString(), function (err) {
            if (err) throw err;
            console.log(`file ${filename+'.csv'} saved`);
        });

    }

    initializeStats(){
        let fields2 = ['No of Test Cases','Pass','Fail','Percentage'];

        fs.writeFile((this.dirname+'/'+'Stats.csv'), fields2.toString(), function (err) {
            if (err) throw err;
            console.log('Stats.csv saved');
        });
    }

    appendFile(file,result){
        console.log(result);
        if(file == null)
        {
            let Percentage = (result[1]/result[0])*100;
        let res = newLine + result[0] + ',' + result[1] + ',' + result[2] + ',' + Percentage;
        fs.appendFile((this.dirname+'/'+'Stats.csv'), res, function (err) {
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