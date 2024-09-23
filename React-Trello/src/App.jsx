import Card from './components/Card/index.jsx';
import React, { Suspense } from 'react';
import { fetchData } from './fetchData.jsx';
import './App.css'

function App() {
  const apiData = fetchData("http://localhost:3000/api/tasks");
  const data = apiData.read();

  console.log(data);

  return (
    <div className='app'>
      <Suspense fallback={<div>Loading...</div>}>
        <Card status="To Do" data={data} />
        <Card status="In Progress" data={data} />
        <Card status="Done" data={data} />
      </Suspense>
    </div>
  )
}

export default App
