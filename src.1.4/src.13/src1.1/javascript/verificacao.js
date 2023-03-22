require('../../../db.connection');

module.exports={
    
    async bancoVerifica (cod){
        const verificar = await runQuery('SELECT count (*) as COUNT FROM bilhetes WHERE codigo_bilhete = :id',[cod]);
        const dado = verificar.rows[0].COUNT
        return dado;
    }
}