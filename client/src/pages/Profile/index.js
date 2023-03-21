import { Button, Text } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

export default function Profile() {
    const { user, logout } = useAuth()
    const navigate = useNavigate();

    const handleLogout = async () => {
        logout(() => {
            navigate('/')
        })
    }
    return (
        <div>
            <Text fontSize="2xl" mb="20px">Profile</Text>
            <Text><b>Id:</b> {user._id}</Text>
            <Text><b>Role:</b> {user.role}</Text>
            <Text><b>Email:</b> {user.email}</Text>
            <Button mt="20px" colorScheme="pink" variant="solid" onClick={handleLogout}>Logout</Button>
        </div>
    )
}
