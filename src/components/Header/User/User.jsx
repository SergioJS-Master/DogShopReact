/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import userStyles from './User.module.css'
import { dogShopApi } from '../../../api/DogShopApi'
import { getTokenSelector } from '../../../redux/slices/userSlice'
import { Loader } from '../../Loader/Loader'
import logoUserCard from '../../Img/logoTwo.png'

export function User() {
  const token = useSelector(getTokenSelector)
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate('/signin')
    }
  }, [token])

  const { data, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: () => dogShopApi.getUserInfo(token),
  })

  if (isLoading) {
    return <Loader />
  }

  console.log({ data })
  return (
    <div className={userStyles.userBorederBlock}>
      <div className={userStyles.userContainer}>
        <div className={userStyles.userContantCard}>
          <div className={userStyles.userImgAvatar}>
            <img src={data.avatar} alt="avatar" />
          </div>
          <hr />
          <div className={userStyles.userParagraph}>
            <p>
              <span>Ваше имя:  </span>
              {data.name}
            </p>
            <p>
              <span>Группа клиента:  </span>
              {data.group}
            </p>
            <p>
              <span>Ваша сфера деятельности:  </span>
              {data.about}
            </p>
            <p>
              <span>Ваш email:  </span>
              {data.email}
            </p>
            <p>
              <span>Ваш персональный ID:  </span>
              {data._id}
            </p>
          </div>
          <div className={userStyles.logoUserCardStyle}>
            <img src={logoUserCard} alt="logo" />
          </div>
          <hr />
        </div>
      </div>
    </div>
  )
}
