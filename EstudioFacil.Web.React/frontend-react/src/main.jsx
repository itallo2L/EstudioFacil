import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import StudioList from "./pages/StudioList.jsx";
import CardStudio from './components/CardStudio';
import ChooseAccountType from './components/ChooseAccountType';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/studio",
    element: <StudioList />
  },
  {
    path: "/cards",
    element: <CardStudio />
  },
  {
    path: "/chooseAccountType",
    element: <ChooseAccountType />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
