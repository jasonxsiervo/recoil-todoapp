import './App.css';
import MainPage from './components/MainPage';
import { Provider, defaultTheme } from '@adobe/react-spectrum';

function App() {
  return (
    <Provider colorScheme="dark" theme={defaultTheme}>
      <div className="App">
        <MainPage />
      </div>
    </Provider>
  );
}

export default App;
