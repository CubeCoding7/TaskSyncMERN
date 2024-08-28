import { useState, FormEvent } from "react";
import styles from "./auth.module.css";
import { useSignup } from "../hooks/useSignup";

const Signup: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { signup, error, isLoading } = useSignup() as {
    signup: (
      firstName: string,
      lastName: string,
      email: string,
      password: string
    ) => Promise<void>;
    error: string | null;
    isLoading: boolean | null | undefined;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await signup(firstName, lastName, email, password);
  };

  return (
    <form className={styles.signup} onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <label className={styles.label} htmlFor="firstName">
        First Name
      </label>
      <input
        className={styles.input}
        type="text"
        name="firstName"
        required
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
      />
      <label className={styles.label} htmlFor="lastName">
        Last Name
      </label>
      <input
        className={styles.input}
        type="text"
        name="lastName"
        required
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
      />
      <label className={styles.label} htmlFor="email">
        Email
      </label>
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
        Sign up
      </button>
      {error && <div className={styles.error}>{error}</div>}
    </form>
  );
};

export default Signup;
