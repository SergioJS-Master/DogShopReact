/* eslint-disable quotes */
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import { Signup } from './components/Header/Signup/Signup'
import { Sign } from './components/Header/Sign/Sign'
import { Products } from './components/Main/Products/Products'
import { Main } from './components/Main/Main'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'sign',
        element: <Sign />,
      },
      {
        path: 'products',
        element: <Products />,
      },
    ],
  },
], { basename: "/DogShopReact" })

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
