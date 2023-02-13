/* eslint-disable linebreak-style */
import { NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { useSelector } from 'react-redux'
import headerStyle from './Header.module.css'
import logoHeaderOne from '../Img/logoOne.png'
import { DogsShopContext } from '../../Contexts/Contexts'
import { Search } from './Search/Search'
import { getBasketSelector } from '../../redux/slices/basketSlice'

export function Header() {
  const { deleteToken, token } = useContext(DogsShopContext)
  const arrProductInBasket = useSelector(getBasketSelector)
  return (
    <header className={headerStyle.header}>
      <nav>
        <ul>
          <div className={headerStyle.liHeaderBtn}>
            <div>
              <li>
                <NavLink to="/products">
                  <i className="fa-solid fa-bars" />
                </NavLink>
              </li>
            </div>
            <div className={headerStyle.headerLogoLink}>
              <li>
                <NavLink to="/">
                  <img src={logoHeaderOne} alt="" />
                </NavLink>
              </li>
            </div>
          </div>
          <div className={headerStyle.liHeaderSignInfoBtn}>
            <div className={headerStyle.searchStyle}>
              <div>
                <li>
                  <NavLink to="/products">
                    <Search />
                  </NavLink>
                </li>
              </div>
            </div>
            <div className={headerStyle.basketButtonStyle}>
              <li>
                <NavLink to="/basket">
                  <i className="fa-solid fa-basket-shopping" />
                </NavLink>
                <div className={headerStyle.basketProductLength}>
                  {arrProductInBasket.length > 0 && <p>{arrProductInBasket.length}</p>}
                </div>
              </li>
            </div>
            <div>
              <li>
                <NavLink to="/signup">Регистрация</NavLink>
              </li>
            </div>
            <div>
              {token ? (
                <li>
                  <NavLink
                    to="/signin"
                    onClick={deleteToken}
                  >
                    Выйти
                  </NavLink>
                </li>
              ) : (
                <li>
                  <NavLink
                    to="/signin"
                  >
                    Войти
                  </NavLink>
                </li>
              )}
            </div>
          </div>
        </ul>
      </nav>
    </header>
  )
}
