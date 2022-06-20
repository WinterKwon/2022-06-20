
import React, {useState, useEffect} from 'react';
import {Routes, Route, Link, useParams, useNavigate} from 'react-router-dom';

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
    const response = await fetch('http://localhost:3333/topics/' +id);
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
function Create(){
  const navigate = useNavigate();
  const submitHandler =async (e)=>{
    e.preventDefault();  //클릭시 리로드 방지
    const title = e.target.title.value;
    const body = e.target.body.value;
    const response = await fetch('http://localhost:3333/topics', {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({title, body})
    })

    const result = await response.json();
    navigate('/read/'+result.id)

  }
  return(
    <form onSubmit={submitHandler}>
      <h2>Create</h2>
      <p><input type="text name="title placeholder='title'></input></p>
      <p><textarea name="body" placeholder='body'></textarea></p>
      <p><input type="submit" value="create"></input></p>
    </form>

  )
}

function Control(){
  return(
    <ul>
      <Link to="/create">Create</Link>
    </ul>
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
        <Route path='/create' element = {<Create />}></Route>
       </Routes>
       <Routes>
       {['/','/read/:id','/create'].map(e=>{
         return <Route key={e} path = {e} element = {<Control></Control>}></Route>
       })}
       </Routes>
    </div>
  );
}

export default App;
