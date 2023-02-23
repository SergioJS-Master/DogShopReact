/* eslint-disable consistent-return */
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { changeSearchFilter } from '../../../redux/slices/filterSlice'
import { getTokenSelector } from '../../../redux/slices/userSlice'
import { useDebounce } from '../../hooks/useDebounce'

export function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const token = useSelector(getTokenSelector)
  const [search, setSearch] = useState(() => {
    const searchValueFromQuery = searchParams.get('q ')
    return searchValueFromQuery ?? ''
  })
  const dispatch = useDispatch()

  const debouncedSearchValue = useDebounce(search, 600)
  const changeSearchHandler = (e) => {
    const newSearchValue = e.target.value
    setSearch(newSearchValue)
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      q: newSearchValue,
    })
  }

  useEffect(() => {
    dispatch(changeSearchFilter(debouncedSearchValue))
  }, [debouncedSearchValue, dispatch])

  useEffect(() => {
    if (!token) {
      navigate('/signin')
    }
  }, [token])

  return (
    <input
      className={{
        bacgrounfColor: 'black',
      }}
      placeholder="Поиск по каталогу..."
      value={search}
      onChange={changeSearchHandler}
    />
  )
}
