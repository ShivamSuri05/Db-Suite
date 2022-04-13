'use strict'

class connection {
    
    initialize() {
        this.db1 = require("./config/configDB1");
        this.db2 = require("./config/configDB2");
    }
    
    fetch(sql,callback){
        this.db1.execute(sql, function (err, result) {
            if (err) throw err;

            callback(result);
        });
        this.db2.execute(sql, function (err, result) {
            if (err) throw err;

            callback(result);
        });
    }
}

module.exports = connection;