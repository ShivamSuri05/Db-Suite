'use strict'

class connection {

    initialize() {
        this.db1 = require("./config/configDB1");
        this.db2 = require("./config/configDB2");
    }

    async fetch(sql){
        const first = new Promise((res) =>
            this.db1.execute(sql, function (err, result) {
                if (err) throw err;

                res({"db1":result});
            })
        );
        const second = new Promise((res) =>
            this.db2.execute(sql, function (err, result) {
                if (err) throw err;

                res({"db2":result});
            })
        );
        return Promise.all([first, second])
        .then(function (data){
            return data
        }).catch(err => console.log(err));
    }

    exit(){
        this.db1.end();
        this.db2.end();
    }
}

module.exports = connection;