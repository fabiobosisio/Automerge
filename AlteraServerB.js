// Configurando o objeto automerge
const Automerge = require('automerge')

// Digamos que doc2 seja o estado do aplicativo no dispositivo 2.
let doc2 = Automerge.init()

// Lendo os arquivos de comandos em disco e recriando o JSON de Doc2
var fsopen = require('fs');

var data = fsopen.readFileSync('doc2.json', 'utf-8');
doc2 = Automerge.load(data);

console.log('\n Conteudo original de Doc2: \n', doc2);


// Vamos fazer uma alteração na máquina 2 sem que a máquina 1 saiba
doc2 = Automerge.change(doc2, 'Apagar o cartao', doc2 => {
  delete doc2.cards[1]
})

console.log('\n Doc2 com a alteração: \n', doc2);


var fs = require('fs');
fs.writeFile("doc2.json", Automerge.save(doc2), function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("O arquivo doc2 foi salvo!");
    }
}); 



