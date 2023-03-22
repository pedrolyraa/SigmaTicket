async function resultadoBilhete () {  
    var resultado = '';
    var geracaoBilhete = '123456789';
    var geracaoLength = geracaoBilhete.length;

    for ( var i = 0; i < geracaoLength-1; i++ ) {
         resultado += geracaoBilhete.charAt(Math.floor(Math.random() * geracaoLength));
    }
    
    document.getElementById('labelGerar').textContent ="Seu Código é: " + resultado;
    await fetch (`http://localhost:8081/gerarbilhete/${resultado}`,{method: 'POST'});
}


async function recargaB(valor_bl,tipo_bl,saldo) {
    const cod = document.getElementById("inputRecarga").value
    const resposta = await fetch (`http://localhost:8081/verificacao/${cod}`,{method: 'POST'}).then((a)=> a.json());
    if (resposta == 1){
        document.getElementById("label2").innerHTML='Recarga Efetuada com Sucesso!'
        await fetch (`http://localhost:8081/recarga/${cod}/${valor_bl}/${tipo_bl}/${saldo}`,{method: 'POST'});
    } else {
        document.getElementById("label2").innerHTML='Código Invalido!' 
    }
}

// module.exports = resultadoBilhete();
// module.exports = recargaB();