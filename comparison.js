'use strict'

class Comparison{
    compare(rowNo, sql, data1, data2){
        // Logic to be added
        let result = {
            "Serial No" : rowNo, 
            "SQL Query" : sql, 
            "Results from DB1" : JSON.stringify(data1), 
            "Results from DB2" : JSON.stringify(data2), 
            "Comparison Result" : JSON.stringify(data1)==JSON.stringify(data2)
        }
        // console.log("\nQuery to be executed")
        // console.log(sql)
        // console.log("Results from DB1");
        // console.log(data1);
        // console.log("Results from DB2");
        // console.log(data2);
        
        return result
    }
}

module.exports = Comparison;