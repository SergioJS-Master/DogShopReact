import mainStyle from './Main.module.css'
import backgroundImageMain from '../Img/fonMainDog.jpg'

export function Main() {
  return (
    <div className={mainStyle.main}>
      <img
        className={mainStyle.mainBackgroundImgStyle}
        src={backgroundImageMain}
      />
    </div>
  )
}
