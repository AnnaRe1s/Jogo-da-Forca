// //alterando pagina
// const btnStart = document.getElementById("btnStart");

// btnStart.addEventListener('click', () => {
    
//     location.href="pagina_de_jogo.html"
    
// })

// randomSearch
/*me retorna um objeto aleatorio */
function randomSearch (arr) {
    return Math.floor(Math.random() * arr.length)
 }
 //console.log(`Random Position: ${randomSearch(db)}`)
 

 //NameCategory

 /*me traz um objeto aleatorio*/
var position = randomSearch(db) 
console.log(`Position: ${position}`)

/* me traz o nome da categoria aleatoria*/
var category = db[position].category 
console.log(`Category: ${category}`)
 

/*aparece o nome na Dica na tela*/
const tip = document.getElementById("tips")
tip.innerHTML = " " + category



// randomwords

/*me traz a posicao de uma palavra aleatoria da categoria acima */
let positionWord = randomSearch(db[position].words) 
console.log(`Value Position ${positionWord}`)

/* me traz o a palavra da categoria */
let wordRandom = db[position].words[positionWord]  
console.log(`Random name ${wordRandom}`)

/*transformar palavra em tracos */
let hiddenWord = [... wordRandom]
let h2 = []
 for (let i = 0; i < hiddenWord.length; i++) {
     h2[i]= "_"
 }

/*aparece o nome na tela*/
const word = document.getElementById("words")
word.innerHTML = h2.join("")  
/* usei o join para tirar a "," do meio dos tracos */

/* Adicionando as letras*/

let buttonInsert = document.getElementById("insert");
let letterInput = document.getElementById("letterInput");
let attempts = document.getElementById("attempts");


/* retorna a letra errada */
let wrong = []

/* essa function me retorna a posicao das letras */ 
function checkLetter ( letter, wordRandom) {
    const occ = []
    
    for (let i = 0;  i < wordRandom.length; i++) {
        if (wordRandom[i] === letter) {
            occ.push(i)
        }  
    }
    /* verifica se a letra enviada pelo input foi para o occ e se e uma letra ou numero */
    if (occ.length === 0 ) {
        if ((letter >= "a" && letter <= "z") || (letter >= "A" && letter <= "Z")) {
            wrong.push(letter) 
        }      
    }

    return occ
 }

/* essa funcao transforma a primeira letra em maiuscula*/
 function captalize (arr) {
    
    arr[0] = arr[0].toUpperCase() 

    return arr
}

/*essa funcao adiciona a letra recebida no input na posicao identificada acima*/
function addLetters (occurrences, letter) {
    
    for (let i = 0; i < occurrences.length; i++) {
      
        h2[occurrences[i]] = letter   
    } 
    console.log(`esse e o h2 ${h2}`)
   
    word.innerHTML = captalize(h2).join("")
}

/*iniciando a funcao de nao deixar repetir a letra*/
const mySet = new Set ()

/*essa funcao passa os parametros de estilo ao input */
function uptade (border, status, color, weigth) {
    document.getElementById("letterInput").style.border = border /*me ajuda a adicionar borda com respectiva cor quando detectado ao erro */
    document.getElementById("status").innerHTML = status /* vai mostrar o status de letra invalida */
    document.getElementById("status").style.color = color /*adicionar cor no texto e borda */
    document.getElementById("status").style.fontWeight = weigth /* para adicionar negrito no status */
}

/* essa funcao faz a validacao para aparecer o status */
function validateInput() {
    let letter = document.getElementById("letterInput").value
    let status = ""
    let border = ""
    console.log("valida a entrada: ", letter)
    
    if ((letter >= "a" && letter <= "z") || (letter >= "A" && letter <= "Z")) {
        //has = tem ai dentro -- ele ta verificando se tem a letra ja inserida na minha tentativa
        if (!mySet.has(letter)) {
            mySet.add(letter)
            border = "1px solid green"
            uptade (border, "", "black", "normal")

        } else {
            border = " 2px solid red"
            status = "Entrada Invalida"
            uptade (border, status, "red", "bold")
        }
    } else {
        border = " 2px solid red"
        status = "Entrada Invalida - Você deve digitar uma letra de A - Z "  
        uptade (border, status, "red", "bold")
    }
}


/* aqui aciona o botao adicionar letra */
buttonInsert.addEventListener('click', () => {
  
    let letter = letterInput.value /* pega o valor inserido no input*/
    letter = letter.toLowerCase() /* toda a letra que eu recebo do input e automaticamente alterada para minuscula*/
    
    console.log(letter)
    console.log(wordRandom)
    
    
    /* Aqui mostra a posicao da ocoorencia da letra inserida no input*/
    let occ = checkLetter(letter, wordRandom)
    console.log(occ)

    addLetters(occ, letter)  /*adiciona a letra*/
    
    //pega o h2 e transforma em minuscula, para checar a condicao de vitoria
    let newH2 = h2.join('').toLowerCase()
    console.log(`esse e meu h2 join ${newH2}`)

    /* condicao de vitoria e erro */
 
    if (newH2 === wordRandom) {
        const showModal = document.getElementById("modalVitory")
        showModal.classList.add('show') 
        /* apos a parecer o modal de vitoria, para o jogo reiniciar eu tenho que retirar a class mostrar modal ("show") para que possa reiniciar*/
        showModal.addEventListener('click',() => {
            showModal.classList.remove("show")
            restart()
        })
    }
    console.log(wrong)

    if (wrong.length >= 6) {
        console.log(`game Over`)
        //document.getElementById("hangMan").setAttribute("src", "images/you lost.png")
        const showModal = document.getElementById("modalDerrota")
        showModal.classList.add('show')
        /* apos a parecer o modal de derrota, para o jogo reiniciar eu tenho que retirar a class mostrar modal ("show") para que possa reiniciar*/
        showModal.addEventListener('click',() => {
            showModal.classList.remove("show")
            restart()
        })
        return 
    }

    /* limpa o input*/
    letterInput.value = "";

    attempts.innerHTML = wrong.join('  ')
    console.log(wrong)


    /* essa variavel vai procurar dentro do meu array de images o numero correspondente ao numero de erros  */
    let findImage = images.find(e => e.errorNumbers === wrong.length)

    /* Atribuindo o id da imagem inicial alterar conforme o numero de erros*/
    if (findImage !== undefined) {
        document.getElementById("hangMan").setAttribute("src", findImage.corresponding)
    }
})

//Botao para adivinhar uma palavra
const guessInput =  document.getElementById("guessInput");
const btnGuess = document.getElementById("btnGuess");

btnGuess.addEventListener('click', () => {

    let guess = guessInput.value
    guess = guess.toLowerCase()

    if (guess === wordRandom) {
        const showModal = document.getElementById("modalVitory")
        showModal.classList.add('show') 
        showModal.addEventListener('click',() => {
            showModal.classList.remove("show")
            restart()
        })
    } else {
        const showModal = document.getElementById("modalDerrota")
        showModal.classList.add('show')
        showModal.addEventListener('click',() => {
            showModal.classList.remove("show")
            restart()
        })
    }

    guessInput.value = ""
})


//botao de tentar novamente = new game 
function restart () {

    console.log(`chamando restart`)
    position = randomSearch(db)

    category = db[position].category
    tip.innerHTML = " " + category

    positionWord = randomSearch(db[position].words)
    wordRandom = db[position].words[positionWord] 

    hiddenWord = [... wordRandom]
    h2.length = 0
    for (let i = 0; i < hiddenWord.length; i++) {
        h2[i]= "_"
    }
    word.innerHTML = h2.join("")

    wrong.length = 0
    attempts.innerHTML = ""

    document.getElementById("hangMan").setAttribute("src", "images/gallows - image.png")

    letterInput.value = ""

    guessInput.value = ""
}



    


