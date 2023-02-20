import { REDUX_LS_KEY } from './contants'

export const initState = {
  user: {
    _id: '',
    name: '',
    about: '',
    avatar: '',
    group: '',
    email: '',
    token: '',
  },
  basket: [],
  filter: {
    search: '',
  },
  favorite: [],
}

export const getInitState = () => {
  const dataFromLS = window.localStorage.getItem(REDUX_LS_KEY)
  return dataFromLS ? JSON.parse(dataFromLS) : initState
}
