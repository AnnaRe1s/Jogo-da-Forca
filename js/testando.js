
// randomSearch

/*me retorna um objeto aleatorio */
function randomSearch (arr) {
    return Math.floor(Math.random() * arr.length)
 }
 //console.log(`Random Position: ${randomSearch(db)}`)
 

 //NameCategory

 /*me traz um objeto aleatorio*/
let position = randomSearch(db) 
console.log(`Position: ${position}`)

/* me traz o nome da categoria aleatoria*/
let category = db[position].category 
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

    if (occ.length === 0 ) {
        wrong.push(letter)    
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



/* aqui aciona o botao inserir */
buttonInsert.addEventListener('click', () => {
  
    let letter = letterInput.value /* pega o valor inserido no input*/
    letter = letter.toLowerCase() /* toda a letra que eu recebo do input e automaticamente alterada para minuscula*/
    
    console.log(letter)
    console.log(wordRandom)
    
    
    /* Aqui mostra a posicao da ocoorencia da letra inserida no input*/
    let occ = checkLetter(letter, wordRandom)
    console.log(occ)

    addLetters(occ, letter)  /*adiciona a letra*/
    
    attempts.innerHTML = wrong.join(', ')
    console.log(wrong)

    /* condicao de vitoria e erro */
    let newH2 = h2.join('').toLowerCase()
    console.log(`esse e meu h2 join ${newH2}`)

    if (newH2 === wordRandom) {
        document.getElementById("hangMan").setAttribute("src", "images/you win.png")
    }

    if (wrong.length >= 5) {
        console.log(`game Over`)
        document.getElementById("hangMan").setAttribute("src", "images/gameOver.png")

    }


    /* limpa o input*/
    letterInput.value = "";

    attempts.innerHTML = wrong.join(', ')
    console.log(wrong)

    /* essa variavel vai procurar dentro do meu array de images o numero correspondente ao numero de erros  */
    let findImage = images.find(e => e.errorNumbers === wrong.length)

    /* Atribuindo o id da imagem inicial alterar conforme o numero de erros*/
    if (findImage !== undefined) {
        document.getElementById("hangMan").setAttribute("src", findImage.corresponding)
    }
        
        


    
})