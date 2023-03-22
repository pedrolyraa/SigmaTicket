require('./db.connection');
const express = require ("express");
const cors = require('cors')
const { dirname } = require("path");
const { bancoBilhete } = require('./src.13/src1.1/javascript/gerarController');
const { bancoVerifica } = require('./src.13/src1.1/javascript/verificacao');
const { bancoRecarga } = require('./src.13/src1.1/javascript/recargaController');
const insertUtilizacao = require('./src.13/src1.1/javascript/insertUtilizacao');


const app = express();
const port= 8081;


require('./src.13/src1.1/javascript/gerarController');
require('./src.13/src1.1/javascript/verificacao');
require('./src.13/src1.1/javascript/recargaController');
require('./src.13/src1.1/javascript/gerar');
require('./src.13/src1.1/javascript/insertUtilizacao');

app.use(cors())
app.use(express.json())


function formatarData (data) {
    var dataString = data.getDate()  + "/" + (data.getMonth()+1) + "/" + data.getFullYear() + " " +
    data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds();
    return dataString;
  }


app.use(express.static(__dirname+"/src.13"));

app.get("/",function(req,res){  
    res.sendFile(__dirname+"/src.13/src1.1/hmtl/index.html");    
});

app.get("/termos",function(req,res){  
    res.sendFile(__dirname+"/src.13/src1.1/hmtl/termos.html");    
});

app.post("/painel",function(req,res){  
    res.sendFile(__dirname+"/src.13/src1.1/hmtl/painel.html");
});

app.post("/recarga",function(req,res){  
    res.sendFile(__dirname+"/src.13/src1.1/hmtl/recarga.html");
});

app.post("/utilizar",function(req,res){  
    res.sendFile(__dirname+"/src.13/src1.1/hmtl/utilizacao.html");
});

app.post('/gerarBilhete', async (req,res) =>{
    res.sendFile(__dirname+"/src.13/src1.1/hmtl/gerar.html");
});

app.post("/historico",function(req,res){  
    res.sendFile(__dirname+"/src.13/src1.1/hmtl/historico.html");    
});

app.post('/gerarbilhete/:cod', async (req,res) =>{
    await bancoBilhete(req.params.cod);
});


app.post("/verificacao/:cod", async (req,res) => {
    const a= await bancoVerifica(req.params.cod)
    if (a === 1) {
        return res.json(a)
    }    
    else {
        return res.json(a)
    }    
})    

app.post("/recarga/:cod/:valor_bl/:tipo_bl/:saldo", async (req,res) => {
    await bancoRecarga(req.params.tipo_bl,req.params.cod,req.params.valor_bl,req.params.saldo);
})    

app.post("/utilizacaoEfetuada/inserir/:cod", async (req,res,next) => {
    const mensagemUti = await insertUtilizacao(req.params.cod);
    return res.json(mensagemUti);
})

app.post('/gerenciamento/:cod', async  (req, res) => {
    var array = [];
    var referencia = {
        "tipo":"",
        "data_geracao":"",
        "data_recarga":"",
        "data_utilizacao":"",
    }
    const selecJoin = await runQuery("select TIPO_BILHETE as TIPO, DATA_RECARGA as DATA_RECARGA, DATAGERACAO_BILHETE as DATA_GERACAO, DATAUTILIZACAO as DATA_UTILIZACAO from bilhetes join recarga on bilhetes.codigo_bilhete = recarga.fk_bilhetes_codigo_bilhete join utilizacao on bilhetes.codigo_bilhete = utilizacao.fk_codigo_bilhete where codigo_bilhete = :id",[req.params.cod]);
    
    for(i in selecJoin.rows){
        referencia.tipo = selecJoin.rows[i].TIPO;
        referencia.data_geracao = formatarData(selecJoin.rows[i].DATA_GERACAO)
        referencia.data_recarga = formatarData(selecJoin.rows[i].DATA_RECARGA)
        referencia.data_utilizacao = formatarData(selecJoin.rows[i].DATA_UTILIZACAO)
        array.push(referencia)
    }
    console.log(array)
    return res.json(array);

})


app.listen(port,function(){

    console.log("Conectado!")
});