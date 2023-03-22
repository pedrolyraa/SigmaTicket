async function utilizacao(){
    try{
        const codigoUtilizacao = document.getElementById("inputUtilizacao").value;
        console.log(codigoUtilizacao)
        var dadosUtilizcao = await fetch(`http://localhost:8081/utilizacaoEfetuada/inserir/${codigoUtilizacao}`,{method:'POST'}).then((mensagemUti)=> mensagemUti.json());
        document.getElementById("inputUtilizacao").value = "";
        document.getElementById("labelUtilizar").innerHTML = dadosUtilizcao.mensagem;

    }catch (error) {
        console.log(error);
    }
}

module.exports=utilizacao()