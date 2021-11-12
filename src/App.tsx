import { AppRoutes } from '@/routes';
import { AppProvider } from '@/providers';

function App(): JSX.Element {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
