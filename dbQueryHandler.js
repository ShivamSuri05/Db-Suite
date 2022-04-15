'use strict'

class connection {

    initialize() {
        console.log("in connection")
        this.db1 = require("./config/configDB1");
        this.db2 = require("./config/configDB2");
    }

    // fetch(sql, callback) {
    //     this.db1.execute(sql, function (err, result) {
    //         if (err) throw err;

    //         callback({ db1: result });
    //     });
    //     this.db2.execute(sql, function (err, result) {
    //         if (err) throw err;

    //         callback({ db2: result });
    //     });
    // }
    fetch(sql) {
        let answer = {}
        const first = new Promise((res) =>
            this.db1.execute(sql, function (err, result) {
                if (err) throw err;

                answer["db1"] = result;
                res();
            })
        );
        const second = new Promise((res) =>
            this.db2.execute(sql, function (err, result) {
                if (err) throw err;

                answer["db2"] = result;
                res();
            })
        );
        Promise.all([first, second])
        .then((_) => {
            console.log(answer);
            const comp = require("./comparison");
            const comparison = new comp();
            comparison.compare(answer);
        }).catch(err => console.log(err));
    }
}

module.exports = connection;