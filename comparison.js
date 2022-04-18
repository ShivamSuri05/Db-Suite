'use strict'

class Comparison{
    compare(rowNo, sql, data1, data2){
        var comparison = true;
        //Check size of both Json
        if(Object.keys(data1).length != Object.keys(data2).length)
        comparison = false;
        if(comparison){
            const len = Object.keys(data1).length;
            let diff = [];
            for(let i=0; i<len; i++)
            {
                const row1 = JSON.stringify(data1[i]);
                const row2 = JSON.stringify(data2[i])
                if(row1!=row2)
                {
                    diff.push("DB1 "+ row1,"DB2 "+ row2)
                    console.log(diff);
                    comparison = comparison & false;
                }
            }
        }
        
        // const jsonData2 = JSON.parse(data2);
        // // Logic to be added
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
        //console.log(result);
        return result
    }
}

module.exports = Comparison;