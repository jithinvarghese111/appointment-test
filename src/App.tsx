import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Create from './views/Create';
import './scss/custom.scss'
import List from './views/List';

function App() {
  return (
    <BrowserRouter basename="/">
      <Suspense fallback={"Loading..."}>
        <Routes>
          <Route index element={<Create />} />
          <Route path="/list" element={<List />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
