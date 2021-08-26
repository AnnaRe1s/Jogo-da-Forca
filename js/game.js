// class
class Game {
    constructor(database, errorImages) {
        this.database = database
        this.errorImages = errorImages
        this.position = 0
        this.category = ""
        this.positionWord = 0
        this.word = ""
        this.wrong = []
        this.hiddenLetters = []
    }

    init() {
        this.position = this.generatePosition(this.database.length)
        this.category = this.database[this.position].category
        this.positionWord = this.generatePosition(this.database[this.position].words.length)
        this.word = this.database[this.position].words[this.positionWord]
        Array.from(this.wrong.values()).forEach(e => this.wrong.delete(e))
        this.hiddenLetters.length = 0 
        this.hiddenLetters = Array.from(this.word).map(() => "_") 
    }
     
    generatePosition(interval) {
        return Math.floor(Math.random() * interval)
    }

    getWord() {
        return this.word
    }

    getCategory() {
        return this.category
    }

    getHiddenWord() {
        return this.hiddenLetters.join("")
    }

    findLetterOccurrence(letter) {
        const occ = []
        for (let i = 0;  i < this.word.length; i++) {
            if (this.word[i] === letter) {
                occ.push(i)
            }  
        }
        return occ
    }

    addLetters(occurrences, letter) {
        for (let i = 0; i < occurrences.length; i++) {
            this.hiddenLetters[occurrences[i]] = letter
        }   
    }

    capitalize(str) {
        const arr = Array.from(str)
        arr[0] = arr[0].toUpperCase()
        return arr.join("")
    }

    storeErrors(letter) {
        if (this.isLetter(letter)) {
            this.wrong.push(letter) 
        } 
    }

    getErrorImage() {
        return this.errorImages.get(this.wrong.size)
    }

    //Quando metodo retorna um boleano sempre comeca com is 
    isWonTheGame() {
        return this.hiddenLetters.join("") === this.word
    }

    isLostTheGame() {
        return this.wrong.length === 5
    }

    isLetter(letter) {
       return ((letter >= "a" && letter <= "z") || (letter >= "A" && letter <= "Z"))
    }  

    showWrongLetter() {
        return this.wrong.join(" ")
    }
}

