/* -------------------- Styles -------------------- */
import styles from './Loader.module.css'

const Loader = ({ className, imgClassName, src, width, height }) => {
  return (
    <>
      <div className={styles[className]}>
        <img
          className={styles[imgClassName]}
          src={src}
          alt=""
          width={width}
          height={height}
        />
      </div>
    </>
  )
}

export default Loader
