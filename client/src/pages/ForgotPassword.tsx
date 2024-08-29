import styles from "./auth.module.css";

function ForgotPassword() {
  return (
    <form className={styles.login}>
      <h2>Send recovery email</h2>
      <label htmlFor="email" className={styles.formLabel}>
        Email address
      </label>
      <input type="email" id="email" className={styles.input} autoFocus />
      <button
        className={styles.button}
        onClick={() => {
          /* Add your click handler here */
        }}
      >
        Reset Password
      </button>
    </form>
  );
}

export default ForgotPassword;
