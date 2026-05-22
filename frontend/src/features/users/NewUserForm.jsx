import {useState, useEffect, use} from 'react'
import { useNavigate } from 'react-router-dom'
import { ROLES } from '../../config/roles'
import { useAddNewUserMutation } from './usersApiSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'

const USER_REGEX = /^[A-Za-z]{3,20}$/
const PWD_REGEX = /^[A-Za-z0-9!@#$%]{4,12}$/

const NewUserForm = () => {

    const [addNewUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation()

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState(['Employee'])
    const [active, setActive] = useState(true)

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        if (isSuccess) {
            setUsername('')
            setPassword('')
            setRoles([])
            navigate('/dash/users')
        }
    }, [isSuccess, navigate])

    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)
    
    const onRolesChanged = e => {
        const selectedRoles = Array.from(e.target.selectedOptions, option => option.value)
        setRoles(selectedRoles)
    }

    const canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading

    const onSaveUserClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewUser({ username, password, roles, active })
        }
    }

    const options = Object.values(ROLES).map(role => {
        return (
            <option key={role} value={role}>{role}</option>
        )
    })

    const errClass = isError ? "errmsg" : "offscreen"
    const validUserClass = !validUsername ? "form__input--incomplete" : ''
    const validPwdClass = !validPassword ? "form__input--incomplete" : ''
    const validRolesClass = !Boolean(roles.length) ? "form__input--incomplete" : ''

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>
            <form className="form" onSubmit={onSaveUserClicked}>
                <div className="form__title-row">
                    <h2>Create New User</h2>
                </div>
                <div className="form__body">
                    <label htmlFor="username">Username:</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={onUsernameChanged}
                        className={validUserClass}
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={onPasswordChanged}
                        className={validPwdClass}
                    />
                    <label htmlFor="roles">Roles:</label>
                    <select
                        id="roles"
                        multiple={true}
                        size="3"
                        value={roles}
                        onChange={onRolesChanged}
                        className={validRolesClass}
                    >
                        {options}
                    </select>
                    <label htmlFor="active">Active:</label>
                    <input
                        id="active"
                        type="checkbox"
                        checked={active}
                        onChange={() => setActive(!active)}
                    />
                </div>
                <div className="form__footer">
                    <button
                        className="form__btn form__btn--secondary"
                        type="button"
                        onClick={() => navigate('/dash/users')}
                    >
                        Cancel
                    </button>
                    <button
                        className="form__btn form__btn--primary"
                        type="submit"
                        disabled={!canSave}
                    >
                        <FontAwesomeIcon icon={faSave} /> Create User
                    </button>
                </div>
            </form>
        </>
    )

    return content
}

export default NewUserForm