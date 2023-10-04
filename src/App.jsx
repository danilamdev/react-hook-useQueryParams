import {  useState } from 'react'
import { useQueryParams } from './hooks/useQueryParams'
import './App.css'

const names = [
  {id: 1, first: 'mike', last:'flangan', age: 18},
  {id: 2, first: 'sophy', last:'lartar', age: 24},
  {id: 3, first: 'danny', last:'bloomer', age: 54},
  {id: 4, first: 'niky', last:'terr', age: 22},
  {id: 5, first: 'barba', last:'perck', age: 64},
  {id: 6, first: 'lars', last:'boston', age: 8},
  {id: 7, first: 'ben', last:'duncan', age: 34},
  {id: 8, first: 'sonny', last:'wayne', age: 26},
  {id: 9, first: 'lara', last:'serp', age: 41},
  {id: 10, first: 'naty', last:'lener', age: 38}
 ]

function App() {
  const [peoples, ] = useState(names)
  const { queryUrl, onChangeQuery, queryObject } = useQueryParams({first:'', last:'', age: ''})


  const handleChange = (e) => {
    const newValue = {[e.target.name]: e.target.value}
    onChangeQuery(newValue)
  }

  const filteredNames = peoples.filter(person => (
    person.first.includes(queryUrl.first) &&
    person.last.includes(queryUrl.last) &&
    person.age >= +queryUrl.age
    )
  )
  
  console.log('render app')
  return (
   <main>
    <h1>React-url</h1>
    <div style={{ marginBottom: '20px'}}>
      <input type="text" placeholder='nombre' name='first' value={queryObject.first} onChange={handleChange}/>
    </div>
    <div style={{ marginBottom: '20px'}}>
      <input type="text" placeholder='apellido' name='last' value={queryObject.last} onChange={handleChange}/>
    </div>
    <div style={{ marginBottom: '20px'}}>
      <input type="text" placeholder='edad' name='age' value={queryObject.age} onChange={handleChange}/>
    </div>

    <div>
      <small style={{color: 'gray'}}>queryUrl: {JSON.stringify(queryUrl)}</small>
    </div>
    <div style={{ marginBottom: '40px'}}>
      <small style={{color: 'gray'}}>queryObject: {JSON.stringify(queryObject)}</small>
    </div>

    {
      filteredNames.map((person) =>  (
        <article key={person.id} style={{ borderBottom: '1px solid gray', paddingInline:'20px'}}>
          <div style={{ display: 'flex', gap:'5px', paddingBlock: '20px', }}>
            <p>{person.first}</p>
            <p>{person.last}</p>
            <p style={{marginLeft: 'auto'}}>{person.age} years</p>
          </div>
        </article>
      ))
    }

   </main>
  )
}

export default App
