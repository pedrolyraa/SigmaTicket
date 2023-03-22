require('../../../db.connection');

module.exports={
    
    async bancoRecarga (tipo_bl,cod,valor,saldo){
        await runQuery(`insert into recarga (tipo_pagamento,tipo_bilhete,data_recarga,FK_BILHETES_CODIGO_BILHETE,valor_pagamento,saldo) values('pix',:id,sysdate,:id,:id,:id)`,[tipo_bl,cod,valor,saldo]);
    }
}