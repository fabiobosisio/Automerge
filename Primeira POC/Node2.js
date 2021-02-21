// Configurando o objeto automerge
const Automerge = require('automerge')

var fsopen = require('fs');
var data1 = fsopen.readFileSync('difNode1.automerge', 'utf-8');

// Inicializa o node2 criando um novo documento Automerge e aplicando data1 a ele
const node2 = Automerge.applyChanges(Automerge.init(), JSON.parse(data1));

const node2update = Automerge.change(node2, function (doc) {
    doc.state.b = 2;
});

// Codifique a mudança de node2 para node2update (ou seja, configuração doc.state.b)
const data2 = JSON.stringify(Automerge.getChanges(node2, node2update))

// Aplica essa mudança no nó 1
//const node1update = Automerge.applyChanges(node1, JSON.parse(data2));
console.log("\n Node2 original:\n");
console.log(node2);
console.log("\n Node2 alterado:\n");
console.log(node2update);

// Salva o que seria enviado pela rede em um arquivo local, chamado teste.automerge
var fs = require('fs');
fs.writeFile("difNode2.automerge", data2, 'utf-8', function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("O arquivo teste.automerge foi salvo!");
    }
});



// Salva o que seria enviado pela rede em um arquivo local, chamado teste.automerge
var fs2 = require('fs');
fs2.writeFile("Node2.json", JSON.stringify(node2update), 'utf-8', function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("O arquivo teste.automerge foi salvo!");
    }
});


