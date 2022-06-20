
import React, {useState, useEffect, useParams} from 'react';
import {Routes, Route, Link, useParams} from 'react-router-dom';

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
      <ol>{data.map(e=> <li key={e.id}><Link to = {`/read/${e.id}`}>{e.title}</Link></li>)}</ol>
    </nav>
  )

}

function Read(){
  const param = useParams();
  const id = Number(param.id);
  const [topic, setTopic] = useState({title:null, body:null});
  const refreshTopic = async ()=>{
    const response = await fetch('http://localhost:3333/topics');
    const result = await response.json();
    setTopic(result)
  }

  useEffect(()=>{
    refreshTopic();
  },[id])

  return(
    <article>
      <h2>{topic.title}</h2>
      {topic.body}
    </article>
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
      <Nav data={topics}></Nav>
      <Routes>
        <Route path='/'element={<><h2>Welcome</h2>hello, React!</>}></Route>
        <Route path='/read/:id'element={<Read></Read>}></Route>
       </Routes>
    </div>
  );
}

export default App;
