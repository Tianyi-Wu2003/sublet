import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './Pages/Login.tsx';
import HomePage from './Pages/HomePage.tsx';
import Signup from './Pages/Signup.tsx';
import Test from './Pages/Test.tsx';
import UploadPage from './Pages/UploadPage.tsx';

function App() {
  return (
    <>
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/t" element={<Test />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/upload" element={<UploadPage />} />
          </Routes>
        </BrowserRouter>
      </>
    </>
  );
}

export default App;
