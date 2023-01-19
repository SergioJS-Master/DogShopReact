/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style

import mainStyle from './Main.module.css'
import backgroundImageMain from '../Img/fonMainDog.jpg'

export function Main() {
  return (
    <main className={mainStyle.main}>
      <div>
        <img
          className={mainStyle.mainBackgroundImgStyle}
          src={backgroundImageMain}
        />
      </div>
    </main>
  )
}
