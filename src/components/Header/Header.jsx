/* eslint-disable react/jsx-indent */
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import classNames from 'classnames'
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
  const kickUser = () => {
    dispatch(removeUser())
  }

  const [isOpenModal, setIsOpenModal] = useState(false)

  // const closeModalByClickX = () => closeHandler()

  const closeModalHandler = () => {
    setIsOpenModal(false)
  }

  const openModalHandler = () => {
    setIsOpenModal(true)
  }
  return (
    <div>
      {token && (
      <header className={headerStyle.header}>
        <nav>
          <ul>
            <div className={headerStyle.liHeaderBtn}>
              <div>
                <li>
                  <NavLink
                    className={({ isActive }) => classNames({ [headerStyle.activeLink]: isActive })}
                    to="/products"
                  >
                    <i className="fa-solid fa-bars" />
                  </NavLink>
                </li>
              </div>
              <div className={headerStyle.headerLogoLink}>
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) => classNames({ [headerStyle.activeLink]: isActive })}
                  >
                    <img src={logoHeaderOne} alt="" />
                  </NavLink>
                </li>
              </div>
            </div>
            <div className={headerStyle.liHeaderSignInfoBtn}>
              <div className={headerStyle.searchStyle}>
                <div>
                  <li>
                    <NavLink
                      to="/products"
                    >
                      <Search />
                    </NavLink>
                  </li>
                </div>
                <div className={headerStyle.searchStyle}>
                  <li>
                    <NavLink
                      onClick={openModalHandler}
                    >
                      <i className="fa-solid fa-wand-magic-sparkles" />
                    </NavLink>
                  </li>
                </div>
              </div>
              <div className={headerStyle.basketButtonStyle}>
                <li>
                  <NavLink
                    to="/basket"
                    className={({ isActive }) => classNames({ [headerStyle.activeLink]: isActive })}
                  >
                    <i className="fa-solid fa-basket-shopping" />
                  </NavLink>
                  <div className={headerStyle.basketProductLength}>
                    {arrProductInBasket.length > 0 && <p>{arrProductInBasket.length}</p>}
                  </div>
                </li>
              </div>
              <div className={headerStyle.favoriteButtonStyle}>
                <li>
                  <NavLink
                    to="/favorite"
                    className={({ isActive }) => classNames({ [headerStyle.activeLink]: isActive })}
                  >
                    <i className="fa-solid fa-heart" />
                  </NavLink>
                  <div className={headerStyle.basketProductLengthFavorite}>
                    {arrProductInFavorite.length > 0 && <p>{arrProductInFavorite.length}</p>}
                  </div>
                </li>
              </div>
              <div>
                <li>
                  <NavLink
                    to="/user"
                    className={({ isActive }) => classNames({ [headerStyle.activeLink]: isActive })}
                  >
                    <i className="fa-solid fa-user" />

                  </NavLink>
                </li>
              </div>
              <div>
                {token ? (
                  <li>
                    <NavLink
                      to="/signin"
                      onClick={kickUser}
                    >
                      ??????????
                    </NavLink>
                  </li>
                ) : (
                  <li>
                    <NavLink
                      to="/signin"
                    >
                    ??????????
                    </NavLink>
                  </li>
                )}
              </div>
            </div>
          </ul>
        </nav>
        {token && (
        <Modal
          isOpen={isOpenModal}
          closeHandler={closeModalHandler}
          className={headerStyle.modal}
        >
          <div className={headerStyle.buttonCloseX}>
            <button
              type="button"
              onClick={closeModalHandler}
            >
              X
            </button>
          </div>

          <AddProduct />
        </Modal>
        )}
      </header>
      )}

      {!token && (
        <header className={headerStyle.header}>
        <nav>
          <ul>
            <div className={headerStyle.liHeaderBtn}>
              <div className={headerStyle.headerLogoLink}>
                <li>
                  <NavLink
                    to="/"
                  >
                    <img
                      src={logoHeaderOne}
                      alt="logo"
                    />
                  </NavLink>
                </li>
              </div>
            </div>
            <div className={headerStyle.liHeaderSignInfoBtn}>
              <div>
                <li>
                  <NavLink
                    to="/signup"
                  >
                    ??????????????????????

                  </NavLink>
                </li>
              </div>
              <div>
                {token ? (
                  <li>
                    <NavLink
                      to="/signin"
                      onClick={kickUser}
                    >
                      ??????????
                    </NavLink>
                  </li>
                ) : (
                  <li>
                    <NavLink
                      to="/signin"
                    >
                    ??????????
                    </NavLink>
                  </li>
                )}
              </div>
            </div>
          </ul>
        </nav>
        {token && (
        <Modal
          isOpen={isOpenModal}
          closeHandler={closeModalHandler}
          className={headerStyle.modal}
        >
          <div className={headerStyle.buttonCloseX}>
            <button
              type="button"
              onClick={closeModalHandler}
            >
              X
            </button>
          </div>
          <AddProduct />
        </Modal>
        )}
        </header>
      )}
    </div>
  )
}
