import styles from "./Spinner.module.css";

function Spinner() {
  return (
    <div className={styles.spinnerContainer}>
      <div data-testid="spinner" className={styles.spinner}></div>
    </div>
  );
}

export default Spinner;
