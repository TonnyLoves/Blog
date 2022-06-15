import logo from './logo.svg';
import './App.css';
import { useStore } from 'react-redux';

function App(props) {

  const { store } = useStore({counter: 1})
  
  return (
    <div className="App" style={{ 
      backgroundColor: "red",
      height: '100px',
      display: 'block'
    }}>
      <p>{"测试"}</p>
    </div>
  );
}

export default App;
