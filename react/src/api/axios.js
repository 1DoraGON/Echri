
import axios from "axios"
import { useNavigate } from "react-router-dom"
import router from "../router";


const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      withCredentials: true
})


axiosClient.interceptors.request.use((config)=> {
    const token = JSON.parse(localStorage.getItem('ACCESS_TOKEN'))
    config.headers.Authorization = `Bearer ${token}`
    return config
})

 
axiosClient.interceptors.response.use((response)=>{
    //console.log(response);
    return response
}, (error)=>{
    
    try {
        const {response} = error;
        //console.log(response);
        if (response.status === 401){
            localStorage.removeItem('ACCESS_TOKEN')
            window.location.reload();
        }
    } catch(e) {
        //console.error("hello")
        console.error(e)
    }
    throw error
})
export default axiosClient;