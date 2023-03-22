require('dotenv').config();

const oracledb = require('oracledb');
oracledb.autoCommit = true;

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

module.exports = runQuery = async (query,params) => {
    
    let connection;

    try {
        connection = await oracledb.getConnection({
            user: "ebd1es82287",
            password: "Kxtcy1",
            connectString: "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=172.16.12.48)(PORT=1521))(CONNECT_DATA=(SERVER=DEDICATED)(SID=xe)))"
        })

        const result = await connection.execute(query,params);

        return result;
    } catch (error) {
        console.log(error);
        return error.message;
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (error) {
                return error.message;
            }
        }
    }
}