'use strict'

class Comparison{
    constructor(){
        this.total_tests = 0;
        this.pass = 0;
        this.fail = 0; 
    }

    compareRows(data1,data2)
    {
        var comparison = true;
        let diff = [];
        //Check size of both Json
        if(Object.keys(data1).length != Object.keys(data2).length)
        comparison = false;
        if(comparison){
            const len = Object.keys(data1).length;
            for(let i=0; i<len; i++)
            {
                const row1 = JSON.stringify(data1[i]);
                const row2 = JSON.stringify(data2[i])
                if(row1!=row2)
                {
                    diff.push("DB1 "+ row1,"DB2 "+ row2)
                    // console.log(diff);
                    comparison = false;
                }
            }
        }
        return {comparison,diff};
    }

    compare(rowNo, sql, data1, data2){
        this.total_tests++;
        var func = this.compareRows(data1,data2)
        var comparison = func.comparison
        var diff = func.diff
        
        if(comparison)
        this.pass++;
        else this.fail++;
        
        let result = {
            "Serial No" : rowNo, 
            "SQL Query" : sql, 
            "Results from DB1" : JSON.stringify(data1), 
            "Results from DB2" : JSON.stringify(data2), 
            "Comparison Result" : comparison
        }
        // console.log("\nQuery to be executed")
        // console.log(sql)
        // console.log("Results from DB1");
        // console.log(data1);
        // console.log("Results from DB2");
        // console.log(data2);
        console.log(result);
        console.log(diff);
        return result;
    }
}

module.exports = Comparison;

