require('../../../db.connection');
require('./gerar')
module.exports={
    
    async bancoBilhete (cod){
        await runQuery('insert into bilhetes (codigo_bilhete, datageracao_bilhete) values(:id, sysdate)',[cod]);
    }
}