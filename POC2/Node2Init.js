console.log("#############################################################################");
console.log("Esse passo le o arquivo changes.network e cria um arquivo JSON com o mesmo "); 
console.log("conteudode node1.json, salva o mesmo no formato JSON (node2.json) e no "); 
console.log("formato de arquivosde operacoes Automerge (node2.automerge). Realiza uma");
console.log("alteracao no conteudo {a: 1} --> {a: 1, b:2}, gera um arquivo contendo"); 
console.log("as alteracoes a serem enviadas pela rede chamado changes.network, e atualiza");
console.log("os arquivos node2.json/node2.automerge");
console.log("#############################################################################");

// Configurando o objeto automerge
const Automerge = require('automerge')

// Lendo o arquivo de comandos enviado por Node1
var fsopen = require('fs');
var data1 = fsopen.readFileSync('changes.network', 'utf-8');
console.log("\nLendo os comandos enviado por Node1");

// Inicializa o node2 criando um novo documento Automerge e aplicando data1 a ele
const node2 = Automerge.applyChanges(Automerge.init(), JSON.parse(data1));

// Realiza uma alteração no conteúdo
const node2update = Automerge.change(node2, function (doc) {
    doc.state.b = 2;
});

// Codifique a mudança de node2 para node2update (ou seja, configuração doc.state.b)
const data2 = JSON.stringify(Automerge.getChanges(node2, node2update))

console.log("\nnode2.json original:");
console.log(node2);
console.log("\nRealiza uma mudanca no conteudo de node2.json: doc.state.b = 2");
console.log("\nnode2.json alterado:");
console.log(node2update);

// Salva o que seria enviado pela rede em um arquivo local, chamado changes.network
var fs = require('fs');
fs.writeFile("changes.network", data2, 'utf-8', function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("\nO arquivo changes.network foi salvo com as alteracoes realizadas por Node2 \nde, que e o que seria enviado para Node1");

    }
});

console.log(node2update);
// Salva o arquivo local node2.automerge com os metadados
var fs2 = require('fs');
fs2.writeFile("node2.automerge", JSON.stringify(Automerge.getAllChanges(node2update)) , 'utf-8', function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("\nO arquivo node2.automerge foi salvo!");
    }
});

// Salva o arquivo local node2.json
var fs2 = require('fs');
fs2.writeFile("node2.json", JSON.stringify(node2update), 'utf-8', function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("\nO arquivo node2.json foi salvo!");
    }
});

