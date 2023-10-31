import { nanoid } from 'nanoid'
import React from 'react'

export default function Question(props) {
  const answersEl = props.answers.map(answer =>{
    let goodAnswers = 0
    let styles = answer.checked ? 'answer checked' : 'answer'
  
    if(props.showRightAnswers){
      styles += answer.isCorrect ? ' correct' : 
      !answer.isCorrect && answer.checked ? ' wrong' : ''
    }
    return (
      <div 
      key={nanoid()}
      onClick ={()=>props.handleClick(answer.id, props.id)}
      className={styles}>
      {answer.value}</div>
    )
  })

  return (
    <div className='question-div'>
      <h3 className='question-title'>{props.question}</h3>
      <div className='answers-div'>
      {answersEl}
      </div>
    </div>
  )
}
