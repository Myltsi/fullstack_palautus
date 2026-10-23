const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
     {
       name: 'Fundamentals of React',
       exercises: 10
     },
     {
       name: 'Using props to pass data',
       exercises: 7
     },
     {
       name: 'State of a component',
       exercises: 14
     }
   ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts} />
    </div>
  )
}

const Header = (props) => {
  console.log(props)
  return <h1>{props.course}</h1>
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      {props.parts.map(part => 
        <Part key={part.name} part={part} />
      )}
    </div>
  )
}

const Part = (props) => {
  console.log(props)
  return (
    <div>
      <p>
        Osassa "{props.part.name}" on tehtäviä "{props.part.exercises}" kappaletta.
      </p>
    </div>
  )
}

const Total = (props) => {
  console.log(props)
  return <p>Tehtäviä yhteensä: {props.parts.reduce((sum, part) => sum + part.exercises, 0)}</p>
}

export default App