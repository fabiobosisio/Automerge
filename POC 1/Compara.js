// Configurando o objeto automerge
const Automerge = require('automerge')


let doc1 = Automerge.init()
let doc2 = Automerge.init()

var fsopen = require('fs');
var fsopen2 = require('fs');


var data = fsopen.readFileSync('doc1.json', 'utf-8');
doc1 = Automerge.load(data);

var data = fsopen2.readFileSync('doc2.json', 'utf-8');
doc2 = Automerge.load(data);

console.log('\n Conteudo original de Doc1: \n', doc1);

console.log('\n Conteudo original de Doc2: \n', doc2);

