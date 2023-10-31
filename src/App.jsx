import './App.css'
import React from 'react'
import Start from './Start'
import Question from './Question'
import {decode} from 'html-entities'
import { nanoid } from 'nanoid'

 
function App() {
  const [questions, setQuestions] = React.useState([])
  const [questionElements, setQuestionElements] = React.useState("")
  const [questionsArray, setQuestionsArray] = React.useState("")
  const [goodAnswers, setGoodAnswers] = React.useState(0)
  const [newGame, setNewGame] = React.useState(0)

  React.useEffect(()=>{
    fetch('https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple')
      .then(res => res.json())
      .then(questions => setQuestions(questions.results ))

  },[newGame])
  function getNewQuestions(){
    // Here we are creating an object for each question and each possible answer is also an object
    const questAnswersArray = questions.map(quest =>{
      const answersArray = quest.incorrect_answers.map(incorrectAnswer =>{
        return getAnswer(incorrectAnswer, false, false)
      })
      const rightAnswer = getAnswer(quest.correct_answer, false, true)
  
      //Here we are putting the right answer at a random index in the answersArray
      answersArray.splice(Math.floor(Math.random() * 4), 0, rightAnswer) 
  
      return {
        question: decode(quest.question),
        answers: answersArray,
        idQuestion: nanoid()
      }
    })  
    getQuestionsElements(questAnswersArray, false)
    setQuestionsArray(questAnswersArray)
  }

  function getAnswer( theValue, isChecked, isRight){
    const answerObj = {
      value: decode(theValue),
      isCorrect: isRight,
      checked: isChecked,
      id: nanoid()
    }
    return answerObj
  }

  function getQuestionsElements(array, show){
    const questionsEl = array.map( quest =>(
      <Question
        key = {quest.idQuestion}
        id = {quest.idQuestion}
        question = {quest.question}
        answers = {quest.answers}
        handleClick = {selectAnswer}
        showRightAnswers = {show}

      />
    ))
    setQuestionElements(questionsEl)
  }

  // Encontrar la pregunta correcta, luego encontrar la respuesta seleccionada.

  function selectAnswer(idAnswer, idQuest){
    setQuestionsArray(prevArray =>{
      const newArray = prevArray.map(quest =>{
        let newAnswers = ''
        if(quest.idQuestion == idQuest){ // This if statement let us know which question we are trying to answer.
          newAnswers = quest.answers.map(answer =>{
            // Here we are checking which answer was selected, 
            // updating its checked property and setting others to false.
            return answer.id === idAnswer ? 
            {... answer, 
              checked: true
            } : 
            {... answer,
              checked: false
            }
          })
        }else{
          newAnswers = quest.answers
        }
        // Just replacing the prev answers with the new ones.
        return {... quest, answers: newAnswers}
      })
      getQuestionsElements(newArray)
      return newArray
    })
  }

  function checkAnswers(){
    let goodAnswers = 0
    questionsArray.forEach(quest => {
      quest.answers.forEach(answer => {
        if(answer.isCorrect && answer.checked){
          goodAnswers++
        }
      })
    })
    goodAnswers = !goodAnswers ?  '0' : goodAnswers
    getQuestionsElements(questionsArray, true)
    setNewGame(prevNewGame => prevNewGame + 1)
    setGoodAnswers(goodAnswers)
  }

  function playAgain(){
    getNewQuestions()
    setGoodAnswers(0)    
  }

  function endGame(){
    setQuestionElements('')
    setGoodAnswers(0)
  }

  return (
   <main>
    {!questionElements && <Start
      handleClick={getNewQuestions}
    />} 
    {questionElements && 
    <div className='big-div-questions'>
      {questionElements}
      {goodAnswers ? 
      <div className='play-again'>
        <h4>You scored {goodAnswers}/5 correct answers</h4>
        <button className='check-answers-btn' onClick={playAgain}>Play again</button> 
        <button className='check-answers-btn' onClick={endGame}>Exit</button> 
      </div> 
      : 
       <button className='check-answers-btn' onClick={checkAnswers}>Check answers</button>}
    </div>}
   </main>
  )
}

export default App
