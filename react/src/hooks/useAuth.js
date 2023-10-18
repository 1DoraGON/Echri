import { useDispatch, useSelector } from "react-redux"
import { selectToken, selectUser, setUser } from "../app/UserSlice"
import { useDebugValue } from "react"


const useAuth = () => {
  const token = useSelector(selectToken)
  const user = useSelector(selectUser)
  const auth = token !== ""? {token,user} : false
  //console.log(auth);
  useDebugValue(auth)
  return auth
}

export default useAuth