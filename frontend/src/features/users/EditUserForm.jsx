import { useEffect, useState } from "react";
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../config/roles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const USER_REGEX = /^[A-Za-z]{3,20}$/
const PWD_REGEX = /^[A-Za-z0-9!@#$%]{4,12}$/

const EditUserForm = ({ user }) => {

    const [updateUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation()

    const [deleteUser, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteUserMutation()

    const navigate = useNavigate()

    const [username, setUsername] = useState(user.username)
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState(user.roles)
    const [active, setActive] = useState(user.active)

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        if (isSuccess || isDelSuccess) {
            setUsername('')
            setPassword('')
            setRoles([])
            navigate('/dash/users')
        }
    }, [isSuccess, isDelSuccess, navigate])

    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)  

    const onRolesChanged = e => {
        const selectedRoles = Array.from(e.target.selectedOptions, option => option.value)
        setRoles(selectedRoles)
    }
    
    const onActiveChanged = e => setActive(prev => !prev)

    const onSaveUserClicked = async (e) => {
        e.preventDefault()
        if (password) {
            await updateUser({ id: user.id, username, password, roles, active })
        } else {
            await updateUser({ id: user.id, username, roles, active })
        }
    }

    const onDeleteUserClicked = async () => {
        await deleteUser({ id: user.id })
    }

    let canSave
    if (password) {
        canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading
    } else {
        canSave = [roles.length, validUsername].every(Boolean) && !isLoading
    }

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validRolesClass = !Boolean(roles.length) ? "form__select--invalid" : ''
    const validPwdClass = password && !validPassword ? "form__input--invalid" : ''
    const validUserClass = !validUsername ? "form__input--invalid" : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

    const options = Object.values(ROLES).map(role => {
        return (
            <option key={role} value={role}> {role}</option>
        )
    })

    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={onSaveUserClicked}>
                <div className="form__title-row">
                    <h2>Edit User</h2>
                </div>

                <div className="form__body">
                    <label className="form__label" htmlFor="username">
                        Username: <span className="nowrap">[3-20 letters]</span></label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        value={username}
                        onChange={onUsernameChanged}
                        className={`form__input ${validUserClass}`}
                    />

                    <label className="form__label" htmlFor="password">
                        Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span></label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={onPasswordChanged}
                        className={`form__input ${validPwdClass}`}
                    />

                    <label className="form__label form__checkbox-container" htmlFor="user-active">
                        ACTIVE:
                        <input
                            className="form__checkbox"
                            id="user-active"
                            name="user-active"
                            type="checkbox"
                            checked={active}
                            onChange={onActiveChanged}
                        />
                    </label>

                    <label className="form__label" htmlFor="roles">ASSIGNED ROLES:</label>
                    <select
                        id="roles"
                        name="roles"
                        multiple={true}
                        size="3"
                        value={roles}
                        onChange={onRolesChanged}
                        className={`form__select ${validRolesClass}`}
                    >
                        {options}
                    </select>
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
                        className="form__btn form__btn--danger"
                        type="button"
                        onClick={onDeleteUserClicked}
                    >
                        <FontAwesomeIcon icon={faTrashCan} /> Delete
                    </button>
                    <button
                        className="form__btn form__btn--primary"
                        type="submit"
                        disabled={!canSave}
                    >
                        <FontAwesomeIcon icon={faSave} /> Save Changes
                    </button>
                </div>
            </form>
        </>
    )

    return content
}

export default EditUserForm

