import React from "react";
import ReactDOM from 'react-dom/client';
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from "./components/Layout";
import NewCustomer, {action as newActionCustomer} from "./pages/NewCustomer";
import Index, { loader as customerLoader } from "./pages/Index";
import EditCustomer, { loader as editCustomer, action as newActionEditCustomer} from "./pages/EditCustomer";
import ErrorPage from "./components/ErrorPage";
import {action as newActionDeleteCustomer} from "./components/Customer";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Index />,
        loader: customerLoader,
        errorElement: <ErrorPage />
      },
      {
        path: 'customers/new',
        element: <NewCustomer></NewCustomer>,
        action: newActionCustomer,
        errorElement: <ErrorPage />
      },
      {
        path: '/customers/:customerId/edit',
        element: <EditCustomer />,
        action: newActionEditCustomer,
        loader: editCustomer,
        errorElement: <ErrorPage />
      },
      {
        path : '/customers/:customerId/delete',
        action: newActionDeleteCustomer
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)

