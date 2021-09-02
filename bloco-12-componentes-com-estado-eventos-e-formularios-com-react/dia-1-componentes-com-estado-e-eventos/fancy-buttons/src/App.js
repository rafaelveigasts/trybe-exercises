import React from 'react';

function handleClickA(){
  console.log('pega na minha')
}

function handleClickB(){
  console.log('balança mas não para')
}

function handleClickC(){
  console.log('kkkkkkkkkkkkk')
}

class App extends React.Component{
  render(){
  return (
    <div>
      <button onClick={handleClickA}>Btn A</button>
      <button onClick={handleClickB}>Btn B</button>
      <button onClick={handleClickC}>Btn C</button>
    </div>
    );
  }
}

export default App;
