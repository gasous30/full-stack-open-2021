import React, { useState } from 'react'

const generateRandomNumber = (max) => {
  return Math.floor(Math.random() * max)
}

const Button = (prop) => {
  return(
    <button onClick={prop.clicked}>
      {prop.name}
    </button>
  )
}

const Header = (prop) => {
  return(
    <h1>{prop.name}</h1>
  )
}

const Max = ({max, voted, printMax}) => {
  if(max === 0){
    return(
      <p>No vote given.</p>
    )
  } else{
    return(
      voted.map(printMax)
    )}
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]
  
  const [selected, setSelected] = useState(generateRandomNumber(anecdotes.length))
  const [voted, setVoted] = useState(new Array(anecdotes.length).fill(0))

  const next_anecdote = () =>{
    setSelected(generateRandomNumber(anecdotes.length))
  }

  const vote_clicked = () => {
    const tempVoted = [...voted]
    tempVoted[selected] += 1
    setVoted(tempVoted)
  }

  let max = Math.max(...voted)

  const printMax = (num, idx) => {
    if(num === max){
      return (
        <div key = {idx}>
          <p>{anecdotes[idx]}</p>
          <p>has {num} votes</p> <br/>
        </div>
      )
    }
  }


  return (
    <div>
      <Header name="Anecdote of the day"/>
      {anecdotes[selected]} <br/>
      <p> has {voted[selected]} votes </p> 
      <Button clicked={vote_clicked} name ="vote" />
      <Button clicked={next_anecdote} name = "next anecdote" />
      <Header name="Anecdote with most votes" />
      <Max max = {max} voted = {voted} printMax = {printMax}/>
      
    </div>
  )
}

export default App