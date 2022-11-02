import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form } from './components/Form';

function App() {
  return (
    <>
    <ToastContainer />
    <Routes>
      <Route path='/' element={<Form />} />
    </Routes>
    </>
  );
}

export default App;
