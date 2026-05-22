import { useSelector } from "react-redux"
import { selectAllUsers } from "../users/usersApiSlice"
import NewNoteForm from "./NewNoteForm"

const NewNote = () => {
  const users = useSelector(selectAllUsers)

  if (!users?.length) {
    return <p>No users available. Cannot create a note.</p>
  }

  return <NewNoteForm users={users} />
}

export default NewNote