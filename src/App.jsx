import './App.css'
import React from 'react'
import Start from './Start'
import Question from './Question'
import {decode} from 'html-entities'
import { nanoid } from 'nanoid'

 
function App() {
  const [questions, setQuestions] = React.useState([])
  const [questionElements, setQuestionElements] = React.useState("")

  React.useEffect(()=>{
    fetch('https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple')
      .then(res => res.json())
      .then(questions => setQuestions(questions.results ))

  },[])
  function getNewQuestions(){
    // Here we are creating an object for each question and each possible answer is also an object
    const questAnswersArray = questions.map(quest =>{
      const answersArray = quest.incorrect_answers.map(incorrectAnswer =>{
       const answerObj = {
          value: decode(incorrectAnswer),
          isCorrect: false,
          checked: false,
          id: nanoid()
        }
        return answerObj
      })
      const rightAnswer = {
      value:decode(quest.correct_answer),
      isCorrect: true,
      checked: false,
      id: nanoid()
      }
  
      //Here we are putting the right answer at a random index in the answersArray
      answersArray.splice(Math.floor(Math.random() * 4), 0, rightAnswer) 
  
      return {
        question: decode(quest.question),
        answers: answersArray
      }
    })  
  
    const questionsEl = questAnswersArray.map( quest =>(
      <Question
        key = {quest.id}
        question = {quest.question}
        answers = {quest.answers}
        handleClick = {selectAnswer}
      />
    ))
    setQuestionElements(questionsEl)
  }
  console.log(questionElements)

  function selectAnswer(id){
    setQuestionElements(prevQuestionElements=>{
      const newQuestionElements = prevQuestionElements.props.answers.map()
    })
  }

  // Hacer una función para crear respuestas. Esta debe recibir un parámetro que determine la propiedad 'checked'.
  // Acceder a questAnswersArray y cambiar el valor de la respuesta que fue clickeada. Esto se puede hacer con un map.
  // Volver a generar las respuestas. Para esto hay que crear una función nueva que contenga lo escrito en la línea 47.
  // Volver a asignarle un valor a QuestionElements.


  
    return (
   <main>
    {!questionElements && <Start
      handleClick={getNewQuestions}
    />}
    {questionElements && 
    <div className='big-div-questions'>
      {questionElements}
      <button className='check-answers-btn'>Check answers</button>
    </div>}
   </main>
  )
}

export default App
