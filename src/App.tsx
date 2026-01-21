import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Library } from './pages/Library';
import { ProblemDetail } from './pages/ProblemDetail';
import { ErrorBoundary } from './components/ErrorBoundary';
import { DataProvider } from './contexts/DataContext';

function App() {
  return (
    <DataProvider>
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Library />} />
            <Route path="/p/:problemSlug" element={<ProblemDetail />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </DataProvider>
  );
}

export default App;
