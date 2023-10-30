import { nanoid } from 'nanoid'
import React from 'react'

export default function Question(props) {
  const answersEl = props.answers.map(answer =>{
    return (
      <div 
      key={nanoid()}
      onClick ={()=>props.handleClick(answer.id)}
      className={answer.checked ? 'answer checked' : 'answer'}>
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
