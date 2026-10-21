/* -------------------- Styles -------------------- */
import styles from './Hero.module.css'


/* Display Hero section */
const Hero = () => {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.content}>
          <h2 className={styles.sectionTitle}>Find Waldo & Friends Online</h2>
          <p className={styles.description}>
            Jump straight into detailed, interactive puzzle scenes. Spot Waldo,
            Wenda, Odlaw, and the Wizard—no sign-up required.
          </p>
        </div>
        
      </section>
    </>
  )
}

export default Hero
