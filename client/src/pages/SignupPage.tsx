// import { useState, FormEvent } from "react";
import styles from "./auth.module.css";
// import { useSignup } from "../hooks/useSignup";

const Signup: React.FC = () => {
  // const [email, setEmail] = useState<string>("");
  // const [password, setPassword] = useState<string>("");

  // const { signup, error, isLoading } = useSignup() as {
  //   signup: (email: string, password: string) => Promise<void>;
  //   error: string | null;
  //   isLoading: boolean | null | undefined;
  // };

  // const handleSubmit = async (e: FormEvent) => {
  //   e.preventDefault();
  //   await signup(email, password);
  // };

  return (
    <form className={styles.signup}>
      <h2>Sign Up</h2>
      <label htmlFor="email">Email</label>
      <input
        type="text"
        name="email"
        required
        // onChange={(e) => setEmail(e.target.value)}
        // value={email}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        required
        // onChange={(e) => setPassword(e.target.value)}
        // value={password}
      />
      <button>Sign up</button>
      {/* {error && <div className="error">{error}</div>} */}
    </form>
  );
};

export default Signup;
