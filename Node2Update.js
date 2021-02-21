console.log("#############################################################################");
console.log("Esse passo carrega o arquivo node2.json/node2.automerge e le o arquivo ");
console.log("changes.network com os ajustes recebidos do Node 1 ({a: 1, b:5}). Aplica os ");
console.log("ajustes recebidos em node2.json/node2.automerge.");
console.log("#############################################################################");

// Configurando o objeto automerge
const Automerge = require('automerge')

// Carregando o arquivo node2.json atual
var fsopen = require('fs');
var data2 = fsopen.readFileSync('node2.automerge', 'utf-8');
const node2 = Automerge.load(data2)
console.log("\nEstado atual do node2.json:");
console.log(node2);

// Carregando os ajustes recebidos do Node1
var fsopen2 = require('fs');
var data1 = fsopen2.readFileSync('changes.network', 'utf-8');
console.log("\nCarregando o arquivo changes.network com os ajustes recebidos do Node1");

// Aplicando os ajustes recebidos do Node2 em node1.json
console.log("\nAplicando os ajustes recebidos do Node1 em node2.json");
const node2update = Automerge.applyChanges(node2, JSON.parse(data1));
console.log("\nNode2 Atualizado com as alteracoes de Node1");
console.log(node2update);

// Apaga o arquivo de trafego de mudancas changes.network
var fs = require('fs');
fs.unlink('changes.network', function (err) {
  if (err) throw err;
  console.log("\nO arquivo de trafego de mudancas changes.network foi apagado");
});

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

