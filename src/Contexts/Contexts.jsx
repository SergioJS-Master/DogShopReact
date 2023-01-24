/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useEffect, useState } from 'react'
import { dogShopApi } from '../api/DogShopApi'

export const DogsShopContext = createContext()

const DS_LSTOKEN_KEY = 'DS_LSTOKEN_KEY'

export function DogsShopProviderContext({ children }) {
  const [token, setToken] = useState(() => {
    const takeToken = localStorage.getItem(DS_LSTOKEN_KEY)
    console.log({ takeToken })
  })

  useEffect(() => {
    localStorage.setItem(DS_LSTOKEN_KEY, JSON.stringify(token))
    dogShopApi.setToken(token)
  }, [token])

  return <DogsShopContext.Provider value={{ token, setToken }}>{children}</DogsShopContext.Provider>
}
