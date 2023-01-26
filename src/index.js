/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable quotes */
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import { SignUp } from './components/Header/Signup/Signup'
import { SignIn } from './components/Header/Sign/Signin'
import { Main } from './components/Main/Main'
import { DogsShopProviderContext } from './Contexts/Contexts'
import { ProductsPage } from './components/Main/ProductsPage/ProductsPage'

const router = createBrowserRouter(
  [
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
          element: <SignUp />,
        },
        {
          path: 'signin',
          element: <SignIn />,
        },
        {
          path: 'products',
          element: <ProductsPage />,
        },
      ],
    },
  ],
  { basename: '/DogShopReact/' },
)

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <DogsShopProviderContext>
        <RouterProvider router={router} />
      </DogsShopProviderContext>
    </QueryClientProvider>
  </React.StrictMode>,
)
