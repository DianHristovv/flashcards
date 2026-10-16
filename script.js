const flashCardForm=document.getElementById("flashcard-form")
const questionInput=document.getElementById("question")
const answerInput=document.getElementById("answer")
const knowButton=document.getElementById("known-answer")
const unKnownButton=document.getElementById("unknown-answer")
const backButton=document.getElementById("back-button")
const showAnswerButton=document.getElementById("show-answer")
const studyModeButton=document.getElementById("study-mode-button") 
const selectField=document.getElementById("field")
const flashCards=JSON.parse(localStorage.getItem("flashCards"))||[]
const saveButton=document.getElementById("save-question")
const flashCardList=document.getElementById("flashcard-list")
const studyMode=document.getElementById("study-mode")
const createMode=document.getElementById("create-mode")
const questionOutput=document.getElementById("study-question")
const answerOutput=document.getElementById("study-answer")
const score=document.getElementById("score")
const cardArea=document.getElementById("card-area")
const practiceMistakesButton=document.getElementById("practice-mistakes")
const practiceMistakesDiv=document.getElementById("practice-button")
let studyDeck=[]
let currentIndex=0
let correctCount=0
let incorrects=[]

function shuffle(deck){
   const shuffled=deck.slice()
    for (let i=shuffled.length-1;i>0;i--){
        const j = Math.floor(Math.random() * (i + 1))   
        const temp=shuffled[i]
        shuffled[i]=shuffled[j]
        shuffled[j]=temp

    }
    return shuffled
}

function startRound(deck){
studyDeck=shuffle(deck)
 createMode.style.display="none"
    studyMode.style.display="block"
    currentIndex=0
    correctCount=0
    incorrects=[]
score.textContent=""
practiceMistakesDiv.style.display="none"
 cardArea.style.display="block"
 showCurrentCard()

}

function capitalize(string){
    return string.charAt(0).toUpperCase()+string.slice(1)
}

function nextCard(){
    currentIndex++
    if(currentIndex===studyDeck.length){
cardArea.style.display="none"
        score.textContent="Score: " + correctCount+"/"+studyDeck.length
        if(incorrects.length>0){
        practiceMistakesDiv.style.display="block"
    

    }
        return
    
    }
    
        showCurrentCard()
    
}

function showCurrentCard(){
    const flashCard=studyDeck[currentIndex]
    questionOutput.textContent=flashCard.question
    answerOutput.textContent=""

}

function showCards(){
    flashCardList.innerHTML=""
    for (const flashCard of flashCards){
        const item=document.createElement("li")
        item.textContent=item.textContent = flashCard.field + " – Question: " + flashCard.question + " | Answer: " + flashCard.answer
        flashCardList.appendChild(item)
        const deleteButton=document.createElement("button")
deleteButton.textContent="Delete"
item.appendChild(deleteButton)

deleteButton.addEventListener("click",function(){
item.remove()
const index=flashCards.indexOf(flashCard)
flashCards.splice(index,1)
localStorage.setItem("flashCards",JSON.stringify(flashCards))

})

    }


}

flashCardForm.addEventListener("submit",function(event){
    event.preventDefault() 
    if(questionInput.value.trim()===""||answerInput.value.trim()===""){
        return
    }
    const flashCard={
        question:capitalize(questionInput.value),
        answer:capitalize(answerInput.value),
        field:capitalize(selectField.value)
    }
    flashCards.push(flashCard)
    localStorage.setItem("flashCards",JSON.stringify(flashCards))
    questionInput.value=""
    answerInput.value=""
    


    

console.log(flashCards)
showCards()
})
showCards()

studyModeButton.addEventListener("click",function(){
    if(flashCards.length===0){
        return 
    }
  startRound(flashCards)

   


})

showAnswerButton.addEventListener("click",function(){
    const flashCard=studyDeck[currentIndex]
    answerOutput.textContent=flashCard.answer

})

knowButton.addEventListener("click",function(){
    correctCount++
    nextCard()


})

unKnownButton.addEventListener("click",function(){
incorrects.push(studyDeck[currentIndex])
nextCard()

    console.log(incorrects)

    
    

})

backButton.addEventListener("click",function(){
    createMode.style.display="block"
    studyMode.style.display="none"

})

practiceMistakesButton.addEventListener("click",function(){
    startRound(incorrects)



})
