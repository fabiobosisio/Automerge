// Configurando o objeto automerge
const Automerge = require('automerge')

// Digamos que doc2 seja o estado do aplicativo no dispositivo 2.
let doc2 = Automerge.init()

// Lendo os arquivos de comandos em disco e recriando o JSON de Doc1
var fsopen = require('fs');

var data = fsopen.readFileSync('doc1.json', 'utf-8');
doc1 = Automerge.load(data);
// Nós fundimos doc1 nele. Após a fusão, doc2 tem uma cópia de 
// todos os cartões em doc1.
doc2 = Automerge.merge(doc2, doc1);

console.log('\n doc2 com o conteudo de doc1: \n', doc2);

var fs = require('fs');
fs.writeFile("doc2.json", Automerge.save(doc1), function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("O arquivo doc2 foi salvo!");
    }
}); 



