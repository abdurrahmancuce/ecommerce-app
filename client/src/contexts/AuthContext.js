import { Flex, Spinner } from "@chakra-ui/react";
import { createContext, useContext, useEffect, useState } from "react";
import { fetchLogout, fetchMe } from "../api";

const AuthContex = createContext()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState()
    const [loggedIn, setLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async() => {
            try {
                const me = await fetchMe()

                setLoggedIn(true)
                setUser(me)
                setLoading(false)
            } catch (e) {
                setLoading(false)
            }
        })()
    }, []);

    const login = (data) => {
        setLoggedIn(true)
        setUser(data.user)

        localStorage.setItem('access-token', data.accessToken)
        localStorage.setItem('refresh-token', data.refreshToken)
    }

    const logout = async (callback) => {
        setLoggedIn(false)
        setUser()

        await fetchLogout()

        localStorage.removeItem('access-token')
        localStorage.removeItem('refresh-token')
        callback()
    }

    const values = {
        loggedIn,
        user,
        login,
        logout
    }

    return loading ? <Flex justifyContent="center" alignItems="center" height="100vh">
            <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" size="xl" color="red.500" />
        </Flex>
         : 
        <AuthContex.Provider value={values}>{ children }</AuthContex.Provider>
}

const useAuth = () => useContext(AuthContex)

export { AuthProvider, useAuth }