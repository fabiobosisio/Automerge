# Automerge - Prova de conceito CmRDT JSON Based

O objetivo dessa prova de conceito é mostrar o sistema de Automerge <https://github.com/automerge/automerge> funcionado como um commutative replicated data type, ou CmRDT, JSON based, ou seja, ele cria uma estrutura de
dados JSON armazenada em disco na forma de um arquivo de operações. A ideia é mostra duas instancias, Node 1 e Node 2 gerando arquivos no disco em ambos (sempre em par, o JSON e
o de operações), na sequencia faço alterações exclusivas e concorrentes em ambos os Nodes e trafegando apenas os comandos de diferença através de um arquivo que chamei de 
changes.network o conteúdo desse arquivo é o que deve ser trafegado através de algum protocolo de comunicação (que não faz parte da solução e nem dessa POC).

Neste repositório existem 4 arquivos com programas javascript, que devem ser executados na sequencia abaixo:

1. Node1Init.js --> Esse passo cria um arquivo JSON com o conteúdo {a: 1}, salva o mesmo no formato JSON (node1.json) e no formato de arquivos de operações
Automerge(node1.automerge). Também e gerado um arquivo contendo as alterações a serem enviadas pela rede (nesse caso apenas o estado inicial) chamado changes.network.

2. Node2Init.js --> Esse passo le o arquivo changes.network e cria um arquivo JSON com o mesmo console.log("conteúdo de node1.json, salva o mesmo no formato JSON (node2.json) 
e no formato de arquivos de operações Automerge (node2.automerge). Realiza uma alteração no conteúdo {a: 1} --> {a: 1, b:2}, gera um arquivo contendo as alterações a serem 
enviadas pela rede chamado changes.network, e atualiza os arquivos node2.json/node2.automerge.

3. Node1Update.js --> Esse passo carrega o arquivo node1.json/node1.automerge e lê o arquivo changes.network com os ajustes recebidos do Node 2 ({a: 1, b:2}). Aplica os ajustes 
recebidos em node1.json/node1.automerge. Apos isso realiza uma nova alteração em um elemento de Node1 que foi proveniente de Node2 ({a: 1, b:2} --> {a: 1, b:5}, gera um arquivo
contendo as alterações a serem enviadas pela rede chamado changes.network, e atualiza os arquivos node1.json/node1.automerge

4. Node2Update.js --> Esse passo carrega o arquivo node2.json/node2.automerge e le o arquivo changes.network com os ajustes recebidos do Node 1 ({a: 1, b:5}). Aplica os ajustes 
recebidos em node2.json/node2.automerge. Apaga o arquivo changes.network pois não há ajustes/alterações a serem trafegados.

Com isso procuro provar que ele trafega apenas a diferença de informação através da rede, esse trafego eu simulo através do arquivo changes.network. 

Um ponto observado é que é preciso manter em disco o arquivo de operações que o Automerge gera para cada json desejado, pois é possível gerar o arquivo json a partir desse
arquivo de operações, mas a operação contrária não é possível. um outro ponto é que o histórico das alterações fica registrado nesse arquivo. Nessa POC para fins didáticos
eu gerei sempre os dois arquivos, o JSON (.json) e o de operações (.automerge).
