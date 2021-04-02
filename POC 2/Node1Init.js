console.log("#############################################################################");
console.log("Esse passo cria um arquivo JSON com o conteudo {a: 1}, salva o mesmo no");
console.log("formato JSON (node1.json) e no formato de arquivos de operacoes Automerge");
console.log("(node1.automerge). Tambem e gerado um arquivo contendo as alteracoes");
console.log("a serem enviadas pela rede (nesse caso apenas o estado inicial) chamado"); 
console.log("changes.network");
console.log("#############################################################################");

// Configurando o objeto automerge
const Automerge = require('automerge')

//Define o estado inicial de node1.json
const initialState = {a: 1};

const node1 = Automerge.change(Automerge.init(), function (doc) {
    doc.state = initialState;
});

// Esta mudança define o estado inicial. Envie pela rede
const data1 = JSON.stringify(Automerge.getAllChanges(node1));

console.log("\nEstado atual do node1.json:");
console.log(node1);


// Salva o que seria enviado pela rede em um arquivo local, chamado changes.automerge
var fs = require('fs');
fs.writeFile("changes.network", data1, 'utf-8', function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("\nO arquivo changes.network foi salvo com os dados do estado inicial \nde node1.json, que e o que seria enviado para Node2\n");
    }
});

// Salva o arquivo local node1.automerge com os metadados
var fs2 = require('fs');
fs2.writeFile("node1.automerge", data1, 'utf-8', function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("O arquivo node1.automerge foi salvo!\n");
    }
});
// Salva o arquivo local node1.json
var fs = require('fs');
fs.writeFile("node1.json", JSON.stringify(node1), 'utf-8', function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("O arquivo node1.json foi salvo!\n");
    }
});

