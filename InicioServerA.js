// Configurando o objeto automerge
const Automerge = require('automerge')

// Digamos que doc1 seja o estado do aplicativo no dispositivo 1.
// Inicializamos o documento para conter inicialmente uma lista vazia de cartões.
let doc1 = Automerge.from({ cards: [] })

// O objeto doc1 é tratado como imutável - você nunca deve alterá-lo
// diretamente. Para alterá-lo, você precisa chamar Automerge.change () com um 
// retorno de chamada no qual você pode alterar o estado. Você também pode incluir um legível
// descrição da mudança, como uma mensagem de confirmação, que é armazenada 
// no histórico de mudanças (veja abaixo).

doc1 = Automerge.change(doc1, 'Adicionando um cartao', doc => {
  doc.cards.push({ title: 'Cartao original do servidos A', done: false })
})

console.log("\n Documento com cartao original criado no Servidor A: \n", doc1);

// deve estar assim
// { cards: [ { title: 'Reescrevendo tudo em Clojure', done: false } ] }


// Automerge também define um método insertAt () para inserir um novo elemento em
// uma posição particular em uma lista. Ou você pode usar splice (), se preferir.
doc1 = Automerge.change(doc1, 'Adicionando um novo cartao', doc => {
  doc.cards.insertAt(0, { title: 'Cartao da primeira alteracao, ainda no servidor A', done: false })
})

console.log("\n Documento alterado pela primeira vez ainda na sua criacao: \n",doc1);

// deve estar assim
//{
//  cards: [
//    { title: 'Reercrevendo tudo em Haskell', done: false },
//    { title: 'Reescrevendo tudo em Clojure', done: false }
//  ]
//}

var fs = require('fs');
fs.writeFile("doc1.json", Automerge.save(doc1), 'utf-8', function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("O arquivo doc1 foi salvo!");
    }
}); 


