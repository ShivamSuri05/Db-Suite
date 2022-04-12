'use strict'

class connection {
    
    constructor() {
        this.db1 = require("./config/configDB1");
        this.db2 = require("./config/configDB2");
    }

    query(sql) {

        this.db1.execute(sql, function (err, result) {
            if (err) throw err;

            console.log("From DB1");
            console.log(result);
        });
        this.db2.execute(sql, function (err, result) {
            if (err) throw err;

            console.log("From DB2");
            console.log(result);
        });
    }
}

module.exports = connection;