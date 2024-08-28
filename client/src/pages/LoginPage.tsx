import { FormEvent, useState } from "react";
import styles from "./auth.module.css";
import { useLogin } from "../hooks/useLogin";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { login, error, isLoading } = useLogin() as {
    login: (email: string, password: string) => Promise<void>;
    error: string | null;
    isLoading: boolean | null | undefined;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <form className={styles.login} onSubmit={handleSubmit}>
      <h2>Log in</h2>
      <label htmlFor="email">Email</label>
      <input
        type="text"
        name="email"
        required
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className={styles.input}
      />
      <label className={styles.label} htmlFor="password">
        Password
      </label>
      <input
        type="password"
        name="password"
        required
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className={styles.input}
      />
      <button className={styles.button} disabled={isLoading === true}>
        Log in
      </button>
      {error && <div className={styles.error}>{error}</div>}
    </form>
  );
};

export default Login;
