
import React, {useState, useEffect} from 'react';

function Header(){
  return (<header>
      <h1>
        <a href='/'>WEB</a>
      </h1>
  </header>)
}

function Nav(){
  return (
    <nav>
      <ol></ol>
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
  return (
    <div className="App">
      <Header />
      Hello, World!
      <Nav></Nav>
    </div>
  );
}

export default App;
