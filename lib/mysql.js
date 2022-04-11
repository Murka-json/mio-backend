const mysql = require("mysql2/promise")

const db = mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}, console.log('✅ connected'))


module.exports.request = async(sql) => {
    return new Promise(async(resolve, reject) => {
        await db.execute(sql).then((data) => {
            resolve(data[0])
        }).catch((err) => {
            reject(err)
        })
    })
}