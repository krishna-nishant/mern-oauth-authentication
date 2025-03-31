import { useAuth } from './hooks/useAuth';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { LoadingSpinner } from './components/LoadingSpinner';
import './App.css';

function App() {
  const { loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HomePage />
    </div>
  );
}

export default App;