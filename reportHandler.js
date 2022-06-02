'use strict';
require('./index');
const fs = require("fs")
const ObjectsToCsv = require('objects-to-csv');
const { startTime } = require("./index");
let json2csv = require('json2csv').parse;
let newLine = '\r\n';

class ReportHandler{
    constructor(dirname) {
        this.totalTests = 0;
        this.totalPass = 0;
        this.totalFail = 0;
        this.dirname = dirname + "/output";
        if(!fs.existsSync(this.dirname)){
            fs.mkdir((this.dirname), (err) => {
                if(err) throw err; 
                console.log("Directory created successfully. Path ", this.dirname);
            })
        }
    }

    initialize(filename) {
        let resultsDir = this.dirname + '/' + filename.split('.')[0];
        console.log(resultsDir);
        if(!fs.existsSync(resultsDir)){
            fs.mkdir(resultsDir, (err) => {
                if(err) throw err; 
                console.log("Results Directory created successfully. Path ", resultsDir);
            })
        }
        let fields = ['Serial No', 'SQL Query', 'Comparison Result','Reason'];
        fs.writeFile((this.dirname + '/' + filename + '.csv'), fields.toString(), function (err) {
            // if (err) throw err;
            console.log(`file ${filename + '.csv'} saved`);
        });
    }
    
    appendFile(file, result) {
        this.totalTests++;
        if(result["Comparison Result"] == true)
            this.totalPass++;
        else if(result["Comparison Result"] == false)
            this.totalFail++;
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
            throw e;
        }
        finally{
            console.log(`Writing to file completed. Path: ${this.dirname}/report.csv`)
            console.log(`Time Taken: ${Date.now()-startTime} ms`)
        }
    }
    
    resetStats(){
        this.totalTests = 0;
        this.totalPass = 0;
        this.totalFail = 0;
    }
    
    getStatsForFile(){
        let passPercent = (this.totalPass/this.totalTests) * 100;
        let answer = {
            "Filename": null,
            "No of Tests Cases": this.totalTests,
            "Total Passed": this.totalPass,
            "Total Failed": this.totalFail,
            "Pass %": passPercent.toFixed(2)
        }
        this.resetStats();
        return answer;
    }

    async writeOutputFile(filename,index,query,output1,output2){
        let opcsv1
        let opcsv2
        if(output2.length==0){
            opcsv1 = query + newLine + json2csv(output1, { header: false });
            opcsv2 = query + newLine;
        }
        else if(output1.length==0){
            opcsv1 = query + newLine;
            opcsv2 = query + newLine + json2csv(output2, { header: false });
        }
        else{
            opcsv1 = query + newLine + json2csv(output1, { header: false });
            opcsv2 = query + newLine + json2csv(output2, { header: false });
        }
        fs.writeFile((this.dirname + '/' + filename.split('.')[0] + '/' + index + 'DB1' + '.csv'),opcsv1, function (err) {
            if(err)
            throw err;
        });
        fs.writeFile((this.dirname + '/' + filename.split('.')[0] + '/' + index + 'DB2' + '.csv'),opcsv2, function (err) {
            if(err)
            throw err;
        });
    }
    
}

module.exports = ReportHandler;