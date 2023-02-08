/* eslint-disable consistent-return */
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { changeSearchFilter } from '../../../redux/slices/filterSlice'

export function Search() {
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')

  const changeSearchHandler = (e) => {
    const newSearchValue = e.target.value

    setSearch(newSearchValue)

    dispatch(changeSearchFilter(newSearchValue))
  }

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
