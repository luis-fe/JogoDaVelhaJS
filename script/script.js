let player1Name = "";
let player2Name = "";
let player1Symbol = "";
let player2Symbol = "";
let currentPlayer = 1;
let rodada = 1;
let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];

//COLOCAR O CURSOR NO ELEMENTO player1
window.onload = function() {
    document.getElementById("player1").focus();
};


// EXIBIR A TABELA 
function exibirTabela() {
    // Defina o estilo da tabela como visível
    document.getElementById("board").style.display = "table";
  }



function capturarNome() {
    var nomeDigitado = document.getElementById("player1").value;
    getNome1(nomeDigitado);
}

function getNome1(nome) {
    player1Name = nome;
    console.log("Nome do Jogador 1: " + player1Name);
}



// capturar o nome do player 2
function capturarNome2() {
    var nome = document.getElementById("player2").value;
    getNome2(nome);
     // Adicione a chamada para a função que exibe a tabela


}

function getNome2(nome) {
    player2Name = nome;
    console.log("Nome do Jogador 2: " + player2Name);
}

function acionar(){
    exibirTabela();
    document.getElementById("mensagem").innerHTML = `É A SUA VEZ - ${player1Name}`;
    document.getElementById("novojogo").style.display = "block";
    document.getElementById("rodada").innerHTML = `Rodada - ${rodada}`;
    document.getElementById("rodada").style.color = "white"

}


function chooseSymbol(symbol) {
  player1Symbol = symbol;
  player2Symbol = symbol === "X" ? "O" : "X";

    // Ocultar os botões após o clique
    document.getElementById("botaoX").style.display = "none";
    document.getElementById("botaoO").style.display = "none";


  document.getElementById("escolha1").innerHTML = `${symbol}`;
  document.getElementById("escolha1").style.color = symbol === "X" ? "red" : "blue";
  document.getElementById("escolha2").innerHTML = `${player2Symbol}`;
  document.getElementById("escolha2").style.color = player2Symbol === "X" ? "red" : "blue";

    // Após escolher o símbolo, focar no input do jogador 2
    document.getElementById("player2").focus();
  
}

function selectCell(row, col) {
    const boardTable = document.getElementById("board");
    const cell = boardTable.rows[row].cells[col];
  
    // Verificar se a tabela está visível
    if (boardTable.style.display !== "none" && cell) {
      // Remover a classe vitoria antes de cada jogada
      document.getElementById(`cell-${row}-${col}`).classList.remove("vitoria");
  
      if (cell.innerHTML === "") {
        cell.innerHTML = currentPlayer === 1 ? player1Symbol : player2Symbol;
        board[row][col] = cell.innerHTML;
  
        console.log(`Célula selecionada: (${row}, ${col}) - Valor: ${board[row][col]}`);
  
        const vencedor = verificarVitoria();
  
        if (vencedor) {
          console.log(`A vitória é do jogador ${vencedor === player1Symbol ? player1Name : player2Name}`);
          // Adicione aqui a lógica para exibir a mensagem de vitória na interface
          if (currentPlayer === 1) {
            document.getElementById("mensagem").innerHTML = `A Vitória foi de  ${player1Name}`;
          } else{
            document.getElementById("mensagem").innerHTML = `A Vitória foi de  ${player2Name}`;

          }

        } else {
          currentPlayer = 3 - currentPlayer; // Alternar entre 1 e 2
  
          if (currentPlayer === 1) {
            document.getElementById("mensagem").innerHTML = `É a vez de ${player1Name}`;
          } else {
            document.getElementById("mensagem").innerHTML = `É a vez de  ${player2Name}`;
          }
        }
      }
    }
  }
  
  
  

function novoJogo() {
    location.reload();
}


function verificarVitoria() {
    // Verificar combinações horizontais
    for (let i = 0; i < 3; i++) {
      if (board[i][0] !== "" && board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
        // Destacar as células vitoriosas
        document.getElementById(`cell-${i}-0`).classList.add("vitoria");
        document.getElementById(`cell-${i}-1`).classList.add("vitoria");
        document.getElementById(`cell-${i}-2`).classList.add("vitoria");
        return board[i][0]; // Retorna o valor da combinação vitoriosa
      }
    }
    // Verificar combinações verticais
    for (let j = 0; j < 3; j++) {
        if (
            board[0][j] !== "" &&
            board[0][j] === board[1][j] &&
            board[0][j] === board[2][j]
        ) {
            // Destacar as células vitoriosas
            document.getElementById(`cell-0-${j}`).classList.add("vitoria");
            document.getElementById(`cell-1-${j}`).classList.add("vitoria");
            document.getElementById(`cell-2-${j}`).classList.add("vitoria");
            return board[0][j]; // Retorna o valor da combinação vitoriosa
        }
    }
// Verificar combinação diagonal principal (top-left para bottom-right)
if (
    board[0][0] !== "" &&
    board[0][0] === board[1][1] &&
    board[0][0] === board[2][2]
) {
    // Destacar as células vitoriosas
    document.getElementById("cell-0-0").classList.add("vitoria");
    document.getElementById("cell-1-1").classList.add("vitoria");
    document.getElementById("cell-2-2").classList.add("vitoria");
    return board[0][0]; // Retorna o valor da combinação vitoriosa
}

// Verificar combinação diagonal secundária (top-right para bottom-left)
if (
    board[0][2] !== "" &&
    board[0][2] === board[1][1] &&
    board[0][2] === board[2][0]
) {
    // Destacar as células vitoriosas
    document.getElementById("cell-0-2").classList.add("vitoria");
    document.getElementById("cell-1-1").classList.add("vitoria");
    document.getElementById("cell-2-0").classList.add("vitoria");
    return board[0][2]; // Retorna o valor da combinação vitoriosa
}

return null; // Sem vitória
}
  