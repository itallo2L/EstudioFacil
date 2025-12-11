import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <div>
        <Login />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default App;