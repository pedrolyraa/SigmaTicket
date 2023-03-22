const btnRecarga = document.getElementById("btnRecarga1");
const inputR = document.getElementById("inputRecarga");
const geracaoBilhete= 8

btnRecarga.addEventListener("click", () => {
    if (inputR.value.length < geracaoBilhete) {
        alert('Insira o código com no máximo 8 caracteres.')
    } 
})

console.log(inputR)
console.log(btnRecarga)