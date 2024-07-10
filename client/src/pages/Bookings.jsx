import { useSelector } from "react-redux"


export default function Bookings() {
  const {currentUser} = useSelector(state=>state.user);
  return (
    <div>Hello {currentUser.username}</div>
  )
}
