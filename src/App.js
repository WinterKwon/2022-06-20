
import React, {useState, useEffect} from 'react';
import {BrowserRouter,Link} from 'react-router-dom';

function Header(){
  return (<header>
      <h1>
        <Link to='/'>WEB</Link>
      </h1>
  </header>)
}

function Nav({data}){
  return (
    <nav>
      <ol>{data.map(e=> <li key={e.id}><Link to = {'/read/${e.id}'}>{e.title}</Link></li>)}</ol>
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
