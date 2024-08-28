// import { FormEvent, useState } from "react";
import styles from "./auth.module.css";
// import { useLogin } from "../hooks/useLogin";

const Login: React.FC = () => {
  return (
    <form className={styles.login}>
      <h2>Log in</h2>
      <label htmlFor="email">Email</label>
      <input
        type="text"
        name="email"
        required
        // onChange={(e) => setEmail(e.target.value)}
        // value={email}
        className={styles.input}
      />
      <label className={styles.label} htmlFor="password">
        Password
      </label>
      <input
        type="password"
        name="password"
        required
        // onChange={(e) => setPassword(e.target.value)}
        // value={password}
        className={styles.input}
      />
      <button className={styles.button}>Log in</button>
      {/* {error && <div className={styles.error}>{error}</div>} */}
    </form>
  );
};

export default Login;
