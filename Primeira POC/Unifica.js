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

// Agora é a hora da verdade. Vamos mesclar as alterações do dispositivo 2 de volta
// no dispositivo 1. Você também pode fazer a fusão ao contrário, e você obterá
// o mesmo resultado. O resultado mesclado lembra que 'Cartao da primeira alteracao, 
// ainda no servidor A'foi definido como verdadeiro, e'Cartao original do servidos A' foi
// excluído:

let finalDoc = Automerge.merge(doc1, doc2)

console.log('\n Arquivo Unificado: \n', finalDoc);

// { cards: [ { title: 'Rewrite everything in Haskell', done: true } ] }

// As our final trick, we can inspect the change history. Automerge
// automatically keeps track of every change, along with the "commit message"
// that you passed to change(). When you query that history, it includes both
// changes you made locally, and also changes that came from other devices. You
// can also see a snapshot of the application state at any moment in time in the
// past. For example, we can count how many cards there were at each point:

console.log('\n Historico de alteracoes realizadas \n', Automerge.getHistory(finalDoc).map(state => [state.change.message, state.snapshot.cards.length]))
// [ [ 'Initialization', 0 ],
//   [ 'Add card', 1 ],
//   [ 'Add another card', 2 ],
//   [ 'Mark card as done', 2 ],
//   [ 'Delete card', 1 ] ]
