
import React, {useState, useEffect} from 'react';

function Header(){
  return (<header>
      <h1>
        <a href='/'>WEB</a>
      </h1>
  </header>)
}

function Nav({data}){
  return (
    <nav>
      <ol>{data.map(e=> <li key={e.id}><a href = {'/read/${e.id}'}>{e.title}</a></li>)}</ol>
    </nav>
  )

}
function App() {

  const [topics, setTopics] = useState([]);
  const refreshTopics = async ()=>{
    const response = await fetch('http://localhost:3333/topics');
    const result = await response.json();
    setTopics(result)
  }
  useEffect(()=>{
    refreshTopics()
  },[])

  console.log(topics)
  return (
    <div className="App">
      <Header />
      Hello, World!
      <Nav data={topics}></Nav>
    </div>
  );
}

export default App;
