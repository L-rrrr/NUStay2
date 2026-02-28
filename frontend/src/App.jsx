import { useRoutes } from 'react-router-dom';
import { AuthProvider } from './contexts/authContext';
import { MainLayout } from './layouts';
import { appRoutes } from './routes';

function App() {
  const routesElement = useRoutes(appRoutes);

  return (
    <AuthProvider>
      <MainLayout>
        {routesElement}
      </MainLayout>
    </AuthProvider>
  );
}

export default App;
