/* eslint-disable linebreak-style */
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import headerStyle from './Header.module.css'
import logoHeaderOne from '../Img/logoOne.png'
import { Search } from './Search/Search'
import { getBasketSelector } from '../../redux/slices/basketSlice'
import { getTokenSelector, removeUser } from '../../redux/slices/userSlice'
import { getFavoriteSelector } from '../../redux/slices/favoriteSlice'
import { Modal } from '../Modal/Modal'
import { AddProduct } from '../Main/AddProduct/AddProduct'

export function Header() {
  const dispatch = useDispatch()
  const arrProductInBasket = useSelector(getBasketSelector)
  const arrProductInFavorite = useSelector(getFavoriteSelector)
  const token = useSelector(getTokenSelector)
  const kikUser = () => {
    dispatch(removeUser())
  }

  const [isOpenModal, setIsOpenModal] = useState(false)

  const closeModalHandler = () => {
    setIsOpenModal(false)
  }

  const openModalHandler = () => {
    setIsOpenModal(true)
  }
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
              <div className={headerStyle.searchStyle}>
                <li>
                  <NavLink onClick={openModalHandler}>
                    <i className="fa-solid fa-wand-magic-sparkles" />
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
            <div className={headerStyle.favoriteButtonStyle}>
              <li>
                <NavLink to="/favorite"><i className="fa-solid fa-heart" /></NavLink>
                <div className={headerStyle.basketProductLengthFavorite}>
                  {arrProductInFavorite.length > 0 && <p>{arrProductInFavorite.length}</p>}
                </div>
              </li>
            </div>
            <div>
              <li>
                <NavLink to="/user"><i className="fa-solid fa-user" /></NavLink>
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
                    onClick={kikUser}
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
      <Modal isOpen={isOpenModal} closeHandler={closeModalHandler}>
        <AddProduct />
      </Modal>
    </header>
  )
}
