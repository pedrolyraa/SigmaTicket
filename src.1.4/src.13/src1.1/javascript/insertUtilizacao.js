require('../../../db.connection');

var objetoJson={"mensagem":"Saldo Insuficiente !!!"};

function formatarData (data) {
  var dataString = data.getDate()  + "/" + (data.getMonth()+1) + "/" + data.getFullYear() + " " +
  data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds();
  return dataString;
}

function addHoursToDate(dateObj,intHour){
  var numberOfM1Seconds = dateObj.getTime();
  var addMlSeconds = (intHour * 60) * 60 * 1000;
  var newDateObj = new Date(numberOfM1Seconds + addMlSeconds);
  
  return newDateObj;
}



module.exports = async function inserirUtilizacao(cod){
  const existe = await runQuery('SELECT count (*) as COUNT FROM bilhetes WHERE codigo_bilhete = :id',[cod]);
  const dado = existe.rows[0].COUNT; 
  if (dado == 1){
      const selectSaldo = await runQuery('SELECT saldo as SALDO from recarga where FK_BILHETES_CODIGO_BILHETE = :id',[cod]);
      
      const saldo = selectSaldo.rows[0].SALDO;

      var tempo;
      var data = new Date();
      var saldonew = 0;

      if(saldo > 0){
        switch(saldo){
          case 1:
            tempo = 0.667;
            break;
          case 2:
            tempo = 0.667;
            var saldonew = 1;
            break;
          case 7:
            tempo = 168;
            break;
            case 30:
              tempo = 720;
              break;
          }
            
            var dataAtivacao = formatarData(data);
            var dataExpiracao = formatarData(addHoursToDate(data,tempo));
            await runQuery(`insert into utilizacao(DATAUTILIZACAO,DATAEXPIRACAO,FK_CODIGO_BILHETE) values (:id,:id,:id)`,[dataAtivacao,dataExpiracao,cod]);
            await runQuery(`UPDATE RECARGA SET saldo = :id where FK_BILHETES_CODIGO_BILHETE = :id`,[saldonew,cod]);
            objetoJson.mensagem="Utilizado com Sucesso !!!";
            return objetoJson;
        }else{
          return objetoJson;
      }

  }else {
    objetoJson.mensagem="Código Inválido!!";
    return objetoJson;
  }
  
}
      
      