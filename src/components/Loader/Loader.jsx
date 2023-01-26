import stylesLoader from './Loader.module.css'

export function Loader() {
  return (
    <div className={stylesLoader.containerLoader}>
      <div className={stylesLoader['lds-roller']}>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  )
}
