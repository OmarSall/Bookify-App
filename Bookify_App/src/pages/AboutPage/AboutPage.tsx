import styles from "./AboutPage.module.css";

const AboutPage = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>About Us</h1>
      <p className={styles.text}>
        We are a long-standing team with years of experience helping people
        discover and book unique venues. Our mission is to make venue booking
        effortless, transparent, and joyful — for every event, big or small.
      </p>
    </div>
  );
};

export default AboutPage;
