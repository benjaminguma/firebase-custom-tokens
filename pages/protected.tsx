import { ParsedToken } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuth } from "../AuthProvider";
const ProtectedPage = () => {
  const [claims, setClaims] = useState<ParsedToken>({});
  const [loading, setLoading] = useState(false);
  const { user, signOut } = useAuth();
  async function getTokenData() {
    if (!user) return;
    try {
      setLoading(true);
      const val = await user.getIdTokenResult();
      setClaims(val.claims);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getTokenData();
  }, []);
  return (
    <div>
      {!loading && claims.isAdmin && <h1>this is admin UI</h1>}
      <button onClick={signOut}>sign out</button>
    </div>
  );
};
ProtectedPage.protected = true;
export default ProtectedPage;
