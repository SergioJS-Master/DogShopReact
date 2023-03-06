import mainStyle from './Main.module.css'
import logo from '../Img/logoTwo.png'
// import backgroundImageMain from '../Img/fonMainDog.jpg'

export function Main() {
  return (
    <div className={mainStyle.backgorundMain}>
      <div className={mainStyle.mainContainerBorder}>
        <div className={mainStyle.mainContainer}>
          <div className={mainStyle.mainContant}>
            <div>
              <h2 className={mainStyle.headerString}>
                Добро пожаловать в HERITAGE
              </h2>
              <hr />
              <img className={mainStyle.imgLogo} src={logo} alt="logo" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
