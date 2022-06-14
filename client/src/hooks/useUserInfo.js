import axios from '../api/axios'
import AuthContext from '../context/AuthProvider'
import { useContext } from "react";

const USER_INFO_URL = '/user-info'

const useUserInfo = () => {

    const { auth, setAuth } = useContext(AuthContext)

    const getUserInfo = async () => {
        try {
            const response = await axios.post(USER_INFO_URL,
                JSON.stringify(auth),
                {
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.accessToken}` },
                    withCredentials: true
                })
            const headerProps = {
                'email': response?.data[0].email,
                'fName': response?.data[0].fName,
                'lName': response?.data[0].lName
            }
            return headerProps
        } catch (err) {
            console.log(err)
        }
    }

return getUserInfo
}

export default useUserInfo