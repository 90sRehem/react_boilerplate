import { BrowserRouter } from 'react-router-dom';
import { Routes } from 'routes';
import { AppProvider } from './contexts';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
