import { fetchTodos } from './features/todos/todosSlice';

function App() {
  return (
    <div className="App">
      <nav style={{
        backgroundColor: 'purple',
        textAlign: 'center',
        height: '44px',
        lineHeight: '44px'
      }}>
        <section>
           <h1>Redux Fundamentals Example</h1>
        </section>
      </nav>
      <main>
        <section className='medium-contaimer'>
            <h2 style={{
              fontSize: '20px',
              textAlign: 'center'
            }}>Todos</h2>
        </section>
      </main>
    </div>
  );
}

export default App;
