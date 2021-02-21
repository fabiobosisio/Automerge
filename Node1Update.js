console.log("#############################################################################");
console.log("Esse passo carrega o arquivo node1.json/node1.automerge e le o arquivo ");
console.log("changes.network com os ajustes recebidos do Node 2 ({a: 1, b:2}). Aplica os ");
console.log("ajustes recebidos em node1.json/node1.automerge.");
console.log("Apos isso realiza uma nova alteracao em um elemento de Node1 que foi ");
console.log("proveniente de Node2 ({a: 1, b:2} --> {a: 1, b:5}, gera um arquivo contendo "); 
console.log("as alteracoes a serem enviadas pela rede chamado changes.network, e atualiza");
console.log("os arquivos node1.json/node1.automerge");
console.log("#############################################################################");

// Configurando o objeto automerge
const Automerge = require('automerge')

// Carregando o arquivo node1.json atual
var fsopen = require('fs');
var data1 = fsopen.readFileSync('node1.automerge', 'utf-8');
const node1 = Automerge.load(data1)
console.log("\nEstado atual do node1.json:");
console.log(node1);

// Carregando os ajustes recebidos do Node2
var fsopen2 = require('fs');
var data2 = fsopen2.readFileSync('changes.network', 'utf-8');
console.log("\nCarregando o arquivo changes.network com os ajustes recebidos do Node2");

// Aplicando os ajustes recebidos do Node2 em node1.json
console.log("\nAplicando os ajustes recebidos do Node2 em node1.json");
const node1update = Automerge.applyChanges(node1, JSON.parse(data2));
console.log("\nNode1 Atualizado com as alteracoes de Node2");
console.log(node1update);

// Alterando um elemento de Node1 escrito por Node2
const node1update2 = Automerge.change(node1update, function (doc) {
    doc.state.b = 5;
});
console.log("\nAlterando um elemento de Node1 escrito por Node2");
console.log(node1update2);

// Node1 Modificado --> Enviando para Node 2 as modificacoes
const update = JSON.stringify(Automerge.getChanges(node1update, node1update2))
console.log("\nNode1 Modificado --> Enviando para Node 2 as modificacoes \npelo arquivo changes.network");


// Salva o que seria enviado pela rede em um arquivo local, chamado changes.network
var fs = require('fs');
fs.writeFile("changes.network", update, 'utf-8', function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("\nO arquivo changes.network foi salvo com os dados do node1.json ja com \nos ajustesn recebidos de Node2 e com os novos ajustes feitos em Node1,\nesse arquivo contem as operacoes que seriam enviadas para Node2\n");
    }
});

// Salva o arquivo local node1.automerge com os metadados
var fs2 = require('fs');
fs2.writeFile("node1.automerge", JSON.stringify(Automerge.getAllChanges(node1update2)), 'utf-8', function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("O arquivo node1.automerge foi salvo!\n");
    }
});

// Salva o arquivo local node1.json
var fs = require('fs');
fs.writeFile("node1.json", JSON.stringify(node1update2), 'utf-8', function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("O arquivo node1.json foi salvo!\n");
    }
});
