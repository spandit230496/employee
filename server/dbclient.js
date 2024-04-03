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


async function upsertEmployeeData(exceldata) {
    let response=null
    const excelcolumn = Object.keys(exceldata[0]);
    let insertDataQuery = `INSERT INTO users (`;

    excelcolumn.forEach((element, index) => {
        if (index === excelcolumn.length - 1) {
            insertDataQuery += `"${element.toLowerCase()}") VALUES `;
        } else {
            insertDataQuery += `"${element.toLowerCase()}", `;
        }
    });

    exceldata.forEach((element, index) => {
        if (index === exceldata.length - 1) {
            insertDataQuery += `(${excelcolumn.map((value, index) => `'${element[value]}'`).join(', ')})`;
        } else {
            insertDataQuery += `(${excelcolumn.map((value, index) => `'${element[value]}'`).join(', ')}),`;
        }
    });

    try {
        const client = await pool.connect();
        const checkTableQuery = `SELECT EXISTS (
            SELECT FROM information_schema.tables 
            WHERE table_schema = 'public' AND table_name = 'users'
        )`;
        const { rows } = await client.query(checkTableQuery);
        const tableExists = rows[0].exists;

        if (tableExists) {
            const checkColumnsQuery = `SELECT column_name 
                                       FROM information_schema.columns 
                                       WHERE table_schema = 'public' 
                                       AND table_name = 'users'`;
            const res = await client.query(checkColumnsQuery);

            const columns = res.rows.map(row => row.column_name.toLowerCase());
            const requiredColumns = excelcolumn.map(column => column.toLowerCase()); 
            const missingColumns = requiredColumns.filter(excelcolumn => !columns.includes(excelcolumn));

            if (missingColumns.length > 0) {
                const alterTableQuery = `ALTER TABLE users
                                         ADD COLUMN ${missingColumns.map(column => `${column} VARCHAR(255)`).join(', ADD COLUMN ')};`;
                await client.query(alterTableQuery);
                console.log('Table altered successfully to add missing columns');
            }

            const primaryKey = excelcolumn.find(col => col.toLowerCase() === 'employeeid' || col.toLowerCase() === 'employeeid' || col.toLowerCase() === 'employeeid');
            const primaryKeyConstraint = primaryKey ? `, PRIMARY KEY (${primaryKey})` : '';
            const createTableQuery = `CREATE TABLE IF NOT EXISTS users  (${excelcolumn.map(column => {
                const columnName = column.toLowerCase();
                if (columnName === primaryKey) {
                    return `${columnName} VARCHAR(255) PRIMARY KEY`;
                } else {
                    return `${columnName} VARCHAR(255)`;
                }
            }).join(', ')}${primaryKeyConstraint})`;
            await client.query(createTableQuery);

            response=await insertData(insertDataQuery, exceldata);
        } else {
            const primaryKey = excelcolumn.find(col => col.toLowerCase() === 'employeeid' || col.toLowerCase() === 'employeeid' || col.toLowerCase() === 'employeeid');
            const primaryKeyConstraint = primaryKey ? `, PRIMARY KEY (${primaryKey})` : '';
            const createTableQuery = `CREATE TABLE IF NOT EXISTS users (${excelcolumn.map(column => {
                const columnName = column.toLowerCase();
                if (columnName === primaryKey) {
                    return `${columnName} VARCHAR(255) UNIQUE`;
                } else {
                    return `${columnName} VARCHAR(255)`;
                }
            }).join(', ')}${primaryKeyConstraint})`;
            await client.query(createTableQuery);

            response =await insertData(insertDataQuery, exceldata);
        }

        client.release();
        return response
    } catch (err) {
        console.error('Error executing query', err.stack);
        throw err;
    }
}




async function alterTable(sqlQuery,data) {
    try {
        const client = await pool.connect();
        const res = await client.query(sqlQuery);
        client.release();
        console.log('Table altered successfully');
    } catch (err) {
        console.error('Error executing query', err.stack);
        throw err;
    }
}

async function getData(columns = "*", groupBy = "", aggregatedColumns = "",limit=10,offset=0) {
    let sqlQuery = `SELECT 
    ${groupBy ? `${groupBy},` : ''}
    ${aggregatedColumns ? `${aggregatedColumns}(${columns}) AS ${aggregatedColumns}` : columns} 
    FROM users
    ${groupBy ? `GROUP BY ${groupBy}` : ''}
    LIMIT ${limit} OFFSET ${offset}`;

    console.log(sqlQuery)
    try {
        const client = await pool.connect();
        const res = await client.query(sqlQuery);
        client.release();
        return res.rows;
    } catch (err) {
        console.error('Error executing query', err.stack);
        throw err;
    }
}


async function insertData(sqlQuery,data) {
    try {
        const client = await pool.connect();
        const res = await client.query(sqlQuery);
        client.release();
        return {
            message: 'Data inserted successfully',}
    } catch (err) {
        console.error('Error executing query', err.stack);
        throw err;
 
    }
}

async function createTable(tableName, columns) {
    try {
        const client = await pool.connect();
        const createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (${columns.join(', ')})`;
        await client.query(createTableQuery);
        client.release();
        console.log('Table created successfully');
    } catch (err) {
        console.error('Error creating table:', err.stack);
        throw err;
    }
}

async function deleteData(id){

    
    try {
        const client = await pool.connect();
        const deleteData = `DELETE FROM users WHERE employeeid = CAST('${id}' AS VARCHAR)`;
        console.log(deleteData,"query");
        await client.query(deleteData);
        client.release();
        console.log('data deleted successfully');
    } catch (err) {
        console.error('Error creating table:', err.stack);
        throw err;
    }
}

async function updateEmployeeData(data) {
    console.log(data,"data")
    try {
        const client = await pool.connect();
        const updateData = `UPDATE users SET ${Object.keys(data).map(key => `${key} = '${data[key]}'`).join(', ')} WHERE employeeid =  CAST(${data.employeeid} AS VARCHAR)`;
        console.log(updateData,"query");
        
        await client.query(updateData);
        getData()
        client.release();
        console.log('Data updated successfully');
    } catch (err) {
        console.error('Error updating data:', err.stack);
        throw err;
    }
}
async function insertSingleData(data) {
    const columns = Object.keys(data);
    let insertDataQuery = `INSERT INTO users (${columns.map(column => `"${column.toLowerCase()}"`).join(', ')}) VALUES `;

    try {
        const client = await pool.connect();
        insertDataQuery += `(${columns.map(column => `'${data[column]}'`).join(', ')})`;
        const res = await client.query(insertDataQuery);
        client.release();
        return {
            message: 'Data inserted successfully'
        };
    } catch (err) {
        console.error('Error executing query', err.stack);
        throw err;
    }
}

module.exports = { upsertEmployeeData,getData,insertData,alterTable ,createTable,deleteData,updateEmployeeData,insertSingleData};
