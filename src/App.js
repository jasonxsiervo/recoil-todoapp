import './App.css';
import ToDoList from './components/ToDoList';
import MainPage from './MainPage';
import { Provider, defaultTheme } from '@adobe/react-spectrum';

function App() {
  return (
    <Provider colorScheme="dark" theme={defaultTheme}>
      <div className="App">
        <ToDoList />
      </div>
    </Provider>
  );
}

export default App;
