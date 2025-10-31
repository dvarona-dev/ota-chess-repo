import { ErrorBoundary } from '@/components/ErrorBoundary';
import { GrandmasterList } from '@/pages/GrandmasterList';
import { GrandmasterProfile } from '@/pages/GrandmasterProfile';
import { NotFound } from '@/pages/NotFound';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GrandmasterList />} />
          <Route path="/player/:username" element={<GrandmasterProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
