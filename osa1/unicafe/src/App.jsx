import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <div>
        <h1>give feedback</h1>
      </div>
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

const StatisticsLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Statistics = (props) => {
const all = props.good + props.neutral + props.bad
  if (all === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticsLine text='Good' value={props.good} />
          <StatisticsLine text='Neutral' value={props.neutral} />
          <StatisticsLine text='Bad' value={props.bad} />
          <StatisticsLine text='All' value={all} />
          <StatisticsLine
            text='Average'
            value={(props.good - props.bad) / all}
          />
          <StatisticsLine
            text='Positive'
            value={`${props.good / all * 100} %`}
          />
        </tbody>
      </table>
    </div>
  )
}

export default App