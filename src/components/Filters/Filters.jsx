import { useSearchParams } from 'react-router-dom'
import filterStyle from './Filter.module.css'

export function Filters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const FILTERS = ['Дороже', 'Дешевле', 'Скидки', 'Новинки', 'Популярное']

  const clickFilterHandler = (filterName) => {
    const currentFilterName = searchParams.get('filterName')
    if (currentFilterName && currentFilterName.length && currentFilterName === filterName) {
      setSearchParams('', filterName)
    } else {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        filterName,
      })
    }
  }

  return (
    <div className={filterStyle.filterBorder}>
      <div className={filterStyle.filterContant}>
        {FILTERS.map((filter) => (
          <FilterItem key={filter} filterName={filter} clickFilterHandler={clickFilterHandler} />))}
      </div>
    </div>
  )
}

export function FilterItem({ filterName, clickFilterHandler }) {
  const [searchParams] = useSearchParams()
  const currentFilterName = searchParams.get('filterName')

  return (
    <button
      type="button"
      className={filterName === currentFilterName ? (filterStyle.btnActive) : (filterStyle.btnInfo)}
      onClick={() => clickFilterHandler(filterName)}
    >
      {filterName}
    </button>
  )
}
