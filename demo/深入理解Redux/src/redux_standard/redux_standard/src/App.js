import Footer from './features/footer/Footer';
import Header from './features/header/header';
import TodoList from './features/todos/TodoList';
import { fetchTodos } from './features/todos/todosSlice';

function App() {
  return (
    <div className="App">
      <nav style={{
        backgroundColor: 'purple',
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
            }}>
              Todos
            </h2>
            <div className='todoapp'>
                <Header />
                <TodoList />
                <Footer />
            </div>
        </section>
      </main>
    </div>
  );
}

export default App;
