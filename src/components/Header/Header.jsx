/* eslint-disable linebreak-style */
import { NavLink } from 'react-router-dom'
import headerStyle from './Header.module.css'
import logoHeaderOne from '../Img/logoOne.png'

export function Header() {
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
            <div>
              <li>
                <NavLink to="/signup">Регистрация</NavLink>
              </li>
            </div>
            <div>
              <li>
                <NavLink to="/signin">Войти</NavLink>
              </li>
            </div>
          </div>
        </ul>
      </nav>
    </header>
  )
}
