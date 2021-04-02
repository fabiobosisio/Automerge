// Configurando o objeto automerge
const Automerge = require('automerge')

// Digamos que doc1 seja o estado do aplicativo no dispositivo 1.
let doc1 = Automerge.init()

// Lendo os arquivos de comandos em disco e recriando o JSON de Doc2
var fsopen = require('fs');

var data = fsopen.readFileSync('doc1.json', 'utf-8');
doc1 = Automerge.load(data);

console.log('\n Conteudo original de Doc1: \n', doc1);


// Vamos fazer uma alteração na máquina 1 sem que a máquina 2 saiba
doc1 = Automerge.change(doc1, 'Marque um cartao como concluido', doc1 => {
  doc1.cards[0].done = true
})

console.log('\n Doc1 com a alteracao: \n', doc1);


var fs = require('fs');
fs.writeFile("doc1.json", Automerge.save(doc1), function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("O arquivo doc1 foi salvo!");
    }
}); 



