// require('../../../db.connection');

async function addDiv(tipo,dataGeracao, dataRecarga, dataUtilizacao){
    let div = document.createElement('div');
    div.className = 'addElemento';
    div.innerHTML = `
    <div class="linha">
        <div>${dataGeracao}</div>
        <div>${tipo}</div>
        <div>${dataRecarga}</div>
        <div>${dataUtilizacao}</div>
    </div>`;
    document.querySelector('.bodyhist').appendChild(div);
}

async function gerenciamento(){
    // const existe = await runQuery('SELECT count (*) as COUNT FROM bilhetes WHERE codigo_bilhete = :id',[cod]);
    // const dado = existe.rows[0].COUNT; 
    const cod = document.getElementById("inputHistorico").value;
    var dado=1
    document.querySelector('.bodyhist').innerHTML = "";
    if(dado == 1){
        var array = await fetch(`http://localhost:8081/gerenciamento/${cod}`,{method:"POST"}).then((array)=> array.json());
        for (i in array){
            addDiv(array[i].tipo, array[i].data_geracao, array[i].data_recarga, array[i].data_utilizacao); 
        }
    }else{
        document.querySelector('.bodyhist').innerHTML = '<b>Código inválido!</b>';
    }
}