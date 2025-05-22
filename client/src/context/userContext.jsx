import { useState,createContext,useContext,useEffect } from "react";
import Cookies from "js-cookie"; 

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading]=useState(true);
    const [isAuthenticated,setIsAuthenticated]=useState(false);

    useEffect(() => {
        const token = Cookies.get("token"); 

        if (!token) {
            setLoading(false); // No token, no need to fetch user
            return;
        }
      const fetchUser = async () => {
        try {
            setLoading(true);
            const res = await axios.get("/api/auth/me", {
                withCredentials: true, 
            });
            
            setUser(res.data.user);
            setIsAuthenticated(true);
        } catch (err) {
            console.error("User fetch error:", err);
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
     };
     fetchUser();
    },[]);

    return (
    
    <UserContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        fetchUser,
        setUser,
        setIsAuthenticated,
      }}
    >
      {children}
    </UserContext.Provider>
  );

}

export const useUser = () => useContext(UserContext);