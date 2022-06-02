'use strict'

class Connection {
    constructor(){
        this.db1 = require("./config/configDB1");
        this.db2 = require("./config/configDB2");
    }

    async executeQuery(sql){
        const first = new Promise((res,rej) =>
            this.db1.query(sql, function (err, result) {
                if(err){
                    console.log('Database Error',err);
                    rej(err);
                }
                res({"db1":result});
            })
        );
        const second = new Promise((res,rej) =>
            this.db2.query(sql, function (err, result) {
                if (err){
                    console.log('Database Error',err);
                    rej(err);
                }
                res({"db2":result});
            })
        );
        return Promise.all([first, second])
        .then(function (data){
            return data
        }).catch(err => {
            console.log("here")
            console.log(typeof(err))
            //console.log(err)
            throw err
        });
    }

    close(){
        this.db1.end();
        this.db2.end();
    }
}

module.exports = Connection;