import {
  createContext,
  PropsWithChildren,
  useState,
  useContext,
  useEffect
} from "react";
import axios, { AxiosError } from "axios";
import { onAuthStateChanged, signInWithCustomToken, User } from "firebase/auth";
import { auth } from "./firebase";

type authStatus = "authenticated" | "unauthenticated" | "loading";

const AuthCtx = createContext<{
  signUp(email: string, password: string): void;
  status: authStatus;
  signOut(): void;
  user: User | null;
}>({
  signUp(a: string, b: string) {},
  status: "loading",
  signOut() {},
  user: null
});

export const useAuth = () => useContext(AuthCtx);

const AuthProvider = ({ children }: PropsWithChildren<any>) => {
  const [status, setStatus] = useState<authStatus>("loading");
  const signUp = async (email: string, password: string) => {
    type tokenRes = {
      token: string;
    };
    try {
      setStatus("loading");
      const res = await axios.post<tokenRes>("/api/createUserAndGetToken", {
        email,
        password
      });
      const { token } = res.data;

      await signInWithCustomToken(auth, token);
      let x = await auth.currentUser.getIdToken();
      console.log({ x });
      setStatus("authenticated");
    } catch (error) {
      setStatus("unauthenticated");
      if (error instanceof AxiosError) console.log({ message: error.message });
    }
  };
  const signOut = async () => {
    await auth.signOut();
    setStatus("authenticated");
  };
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) setStatus("authenticated");
      else setStatus("unauthenticated");
    });
  }, [status]);

  return (
    <AuthCtx.Provider
      value={{
        signUp,
        status,
        signOut,
        user: auth.currentUser
      }}
    >
      {children}
    </AuthCtx.Provider>
  );
};

export default AuthProvider;
