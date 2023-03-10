/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable quotes */
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from "react-redux"
import App from './App'
import { SignUp } from './components/Header/Signup/Signup'
import { SignIn } from './components/Header/Signin/Signin'
import { Main } from './components/Main/Main'
import { ProductsPage } from './components/Main/ProductsPage/ProductsPage'
import { store } from './redux/store'
import { BasketTitle } from './components/Basket/BasketTitle/BasketTitle'
import { User } from './components/Header/User/User'
import { FavoriteTitle } from './components/Favorite/FavoriteTitle/FavoriteTitle'
import { ProductDetail } from './components/Main/ProductDetail/ProductDetail'

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
        {
          path: 'products/:productId',
          element: <ProductDetail />,
        },
        {
          path: 'basket',
          element: <BasketTitle />,
        },
        {
          path: 'basket/:productId',
          element: <ProductDetail />,
        },
        {
          path: 'favorite',
          element: <FavoriteTitle />,
        },
        {
          path: 'favorite/:productId',
          element: <ProductDetail />,
        },
        {
          path: 'user',
          element: <User />,
        },
      ],
    },
  ],
  { basename: '/DogShopReact/' },
)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
)
