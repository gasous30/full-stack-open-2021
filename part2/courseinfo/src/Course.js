const Header = ({course}) => {
  return <h1>{course.name}</h1>
}

const Content = ({part}) => {
  return (
    <div>
      {part.map(eachPart => {
        return <Part part = {eachPart} key = {eachPart.id} />
      })}
    </div>
  )
}

const Part = ({part}) => {
  return <p>{part.name} {part.exercises}</p>
}

const Total = ({part}) => {
  const total = part.reduce((sum, part) => sum + part.exercises, 0)
  return <b>Total of {total} exercises</b>
}

const Course = ({course}) => {
  return (
    <div>
      <Header course = {course} />
      <Content part = {course.parts} />
      <Total part = {course.parts} />
    </div>
  )
}

export default Course