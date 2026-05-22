import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useGetUsersQuery } from './usersApiSlice'

import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'
import { useNavigate } from 'react-router-dom'

const User = ({ userId }) => {
    const user = useSelector((state) => selectUserById(state, userId))

    const navigate = useNavigate()
    const handleDelete = () => console.log('delete')

    if (user) {
        const handleEdit = () => navigate(`/dash/users/${userId}`)

        const userRolesString = user.roles.toString().replaceAll(',', ', ')

        const cellStatus = user.active ? '' : 'table__cell--inactive'

        return (
            <tr className={cellStatus}>
                <td>{user.username}</td>
                <td>{userRolesString}</td>
                <td>
                    <button onClick={handleEdit}>
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <button onClick={handleDelete}>
                        <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                </td>
            </tr>
        )
    }else return null
}

export default User