// game
const game = new Game(db, images) 


// inicializar o metodo
game.init()



// dom
const tips = document.getElementById("tips")
const words = document.getElementById("words")
const attempts = document.getElementById("attempts")
const letterInput = document.getElementById("letterInput")
const btnInsert = document.getElementById("insert")
const status = document.getElementById("status")
const guessInput = document.getElementById("guessInput")
const btnGuess = document.getElementById("btnGuess")
const showModalVictory = document.getElementById("modalVictory") 
const showModalDefeat = document.getElementById("modalDefeat")
const hangman = document.getElementById("hangman")


// iniciando dicas
tips.innerHTML = game.getCategory()

// adicionar a palavra ja escondida por "_"
words.innerHTML = game.getHiddenWord()


function checkGameResult() {
   // verifica se ganhou ou perdeu o jogo 
    if (game.isWonTheGame()) {
        showModalVictory.classList.add('show')
        showModalVictory.addEventListener('click',() => {
            showModalVictory.classList.remove("show")
            restart()
        })
    } else if (game.isLostTheGame()) {
        showModalDefeat.classList.add('show')
        showModalDefeat.addEventListener('click',() => {
            showModalDefeat.classList.remove("show")
            restart()
        })
    }
}

// reiniciar o game
function restart() {
   game.init()
   tips.innerHTML = " " + game.getCategory()
   words.innerHTML = game.getHiddenWord()
   attempts.innerHTML = ""
   hangman.setAttribute("src", "../images/gallows_image.png")
   letterInput.value = ""
   letterInput.style.border = "none"
   guessInput.value = ""
   status.innerHTML = ""
   Array.from(mySet.values()).forEach(e => mySet.delete(e))
}

// iniciando a funcao de nao deixar repetir a letra ou inserir numero
const mySet = new Set()

// essa funcao passa os parametros de estilo ao input
function uptade(border, text, color, weigth) {
    
    letterInput.style.border = border // me ajuda a adicionar borda com respectiva cor quando detectado ao erro
    status.innerHTML = text         // vai mostrar o status de letra invalida
    status.style.color = color        // adicionar cor no texto e borda
    status.style.fontWeight = weigth  //para adicionar negrito no status
}

// essa funcao faz a validacao para aparecer o status
function validateInput() {
    let letter = letterInput.value
    let text = ""
    let border = ""
    
    if (game.isLetter(letter)) {
        // has = tem ai dentro -- ele ta verificando se tem a letra ja inserida na minha tentativa
        if (!mySet.has(letter)) {
            mySet.add(letter)
            border = "1px solid green"
            uptade (border, "", "black", "normal")
        } else {
            border = " 2px solid red"
            text = `Entrada Invalida - Você já digitou a letra "${letter.toUpperCase()}" - Tente Novamente`
            uptade (border, text, "red", "bold")
        }
    } else {
        border = " 2px solid red"
        text = "Entrada Invalida - Você deve digitar uma letra de A - Z "  
        uptade (border, text, "red", "bold")
    }
}


// iniciando o meu evento de click para pegar a letra
btnInsert.addEventListener("click", () => {
    // pegando a letra do input tranformando em minuscua e atribuindo a uma nova variavel
    let letter = letterInput.value.toLowerCase()

    // condicao de vitoria e erro
    checkGameResult()

    // Checando a occorrencia da letra posicao ou nao encontrada e atribuindo a uma variavel
    let occurrences = game.findLetterOccurrence(letter)

    // limpa o input
    letterInput.value = ""
    
    // se a ocorrencia for um array vazio entre em attemps se nao adicione a letra
    if (occurrences.length === 0) {
        game.storeErrors(letter)
        if (game.isLetter(letter) ) {
            attempts.innerHTML = Array.from(game.wrong.values()).join(" ")
            hangman.setAttribute("src", game.getErrorImage())
        }
        return
    } else {
        game.addLetters(occurrences, letter)
        words.innerHTML = game.capitalize(game.getHiddenWord()) 
    }
})

// iniciando meu evento de iniciar palavra 

btnGuess.addEventListener("click", () => {
    
    let guess = guessInput.value.toLowerCase()
    
    if (guess === game.getWord()) {
        showModalVictory.classList.add('show') 
        showModalVictory.addEventListener('click',() => {
            showModalVictory.classList.remove("show")
            restart()
        })
    } else if (guess !== game.getWord()) {
        showModalDefeat.classList.add('show')
        showModalDefeat.addEventListener('click',() => {
            showModalDefeat.classList.remove("show")
            restart()
        })
    }

    guessInput.value = ""
})