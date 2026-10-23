/* -------------------- Styles -------------------- */
import styles from './Hero.module.css'

/* Display Hero section */
const Hero = () => {
  return (
    <>
      <section className={styles.hero}>
        <h2 className={styles.sectionTitle}>Find Waldo & Friends Online</h2>
        <div className={styles.description}>
          <p>Jump straight into detailed, interactive puzzle scenes.</p>{' '}
          <p>Spot Waldo, Wenda, Odlaw, and the Wizard.</p>
          <p>No sign-up required.</p>
        </div>
      </section>
    </>
  )
}

export default Hero
