import { useDispatch } from 'react-redux';
import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const dispatch = useDispatch()
    const 
    const { setAuth } = 

    const refresh = async () => {
        const response = await axios.post('/sanctum/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            return {
                ...prev,
                roles: response.data.roles,
                accessToken: response.data.accessToken
            }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;
