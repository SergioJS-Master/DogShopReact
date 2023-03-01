/* eslint-disable consistent-return */
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { changeSearchFilter } from '../../../redux/slices/filterSlice'
import { getTokenSelector } from '../../../redux/slices/userSlice'
import { useDebounce } from '../../hooks/useDebounce'

export function Search() {
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const token = useSelector(getTokenSelector)

  useEffect(() => {
    if (!token) {
      navigate('/signin')
    }
  }, [token])

  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState(() => {
    const searchValueFromQuery = searchParams.get('q')
    return searchValueFromQuery || ''
  })
  const debouncedSearchValue = useDebounce(search, 300)

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

  return (
    <input
      className={{
        bacgrounfColor: 'black',
      }}
      id="search"
      type="text"
      placeholder="Поиск по каталогу..."
      value={search}
      onChange={changeSearchHandler}
    />
  )
}
