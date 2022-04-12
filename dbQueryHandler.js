'use strict'

class connection {
    
    initialize() {
        this.db1 = require("./config/configDB1");
        this.db2 = require("./config/configDB2");
    }

    fetch(sql) {
        //This to be discussed
        let answer = [ [{ emp_id: 1, name: 'Rahul', age: 26 },{ emp_id: 2, name: 'Rohit', age: 24 }], [{ emp_id: 1, name: 'Rahul', age: 26 },{ emp_id: 2, name: 'Rohit', age: 24 }] ] || [];

        this.db1.execute(sql, function (err, result) {
            if (err) throw err;

            console.log("From DB1");
            answer.push(result);
        });
        this.db2.execute(sql, function (err, result) {
            if (err) throw err;

            console.log("From DB2");
            answer.push(result);
        });
        return answer;
    }
}

module.exports = connection;