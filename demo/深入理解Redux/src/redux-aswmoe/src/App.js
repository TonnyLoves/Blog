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
      <text>{"测试"}</text>
    </div>
  );
}

export default App;
