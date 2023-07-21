import { useSelector } from "react-redux"
import { selectToken, selectUser } from "../app/UserSlice"
import { useDebugValue } from "react"

const useAuth = () => {

  const token = useSelector(selectToken)
  const user = useSelector(selectUser)
  const auth = token !== ""? {token,user} : false
  useDebugValue(auth)
  return auth
}

export default useAuth