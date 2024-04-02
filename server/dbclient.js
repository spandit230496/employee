const { Pool } = require("pg");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const pool = new Pool({
    user: "fmrjwufu",
    host: "bubble.db.elephantsql.com",
    database: "fmrjwufu",
    password: "G8grnvUlaUX7eFLe6bGq_av4S0ndW0vn",
    port: 5432
});

function createTable(sqlQuery) {
    return new Promise((resolve, reject) => {
        pool.connect()
            .then(client => {
                client.query(sqlQuery)
                    .then(res => {
                        client.release(); 
                        console.log('Table created successfully');
                        resolve();
                    })
                    .catch(err => {
                        client.release(); 
                        console.error('Error executing query', err.stack);
                        reject(err);
                    });
            })
            .catch(err => {
                console.error('Error establishing connection', err.stack);
                reject(err);
            });
    });
}

function alterTable(sqlQuery) {
    return new Promise((resolve, reject) => {
        pool.connect()
            .then(client => {
                client.query(sqlQuery)
                    .then(res => {
                        client.release(); 
                        console.log('Table altered successfully');
                        resolve();
                    })
                    .catch(err => {
                        client.release(); 
                        console.error('Error executing query', err.stack);
                        reject(err);
                    });
            })
            .catch(err => {
                console.error('Error establishing connection', err.stack);
                reject(err);
            });
    });
}

function getData(sqlQuery) {
    return new Promise((resolve, reject) => {
        pool.connect()
            .then(client => {
                client.query(sqlQuery)
                    .then(res => {
                        client.release(); 
                        resolve(res.rows);
                    })
                    .catch(err => {
                        client.release(); 
                        console.error('Error executing query', err.stack);
                        reject(err);
                    });
            })
            .catch(err => {
                console.error('Error establishing connection', err.stack);
                reject(err);
            });
    });
}

function insertData(sqlQuery) {
    return new Promise((resolve, reject) => {
        pool.connect()
            .then(client => {
                client.query(sqlQuery)
                    .then(res => {
                        client.release(); 
                        resolve();
                    })
                    .catch(err => {
                        client.release(); 
                        console.error('Error executing query', err.stack);
                        reject(err);
                    });
            })
            .catch(err => {
                console.error('Error establishing connection', err.stack);
                reject(err);
            });
    });
}

module.exports = { createTable, alterTable , getData, insertData };
