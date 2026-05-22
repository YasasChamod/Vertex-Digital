import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAddNewNoteMutation } from './notesApiSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'

const NewNoteForm = ({ users }) => {
    const [addNewNote, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewNoteMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [userId, setUserId] = useState(users[0]?.id || '')

    useEffect(() => {
        if (isSuccess) {
            setTitle('')
            setText('')
            setUserId('')
            navigate('/dash/notes')
        }
    }, [isSuccess, navigate])

    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)
    const onUserIdChanged = e => setUserId(e.target.value)

    const canSave = [title, text, userId].every(Boolean) && !isLoading

    const onSaveNoteClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewNote({ user: userId, title, text })
        }
    }

    const options = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.username}
        </option>
    ))

    const errClass = isError ? "errmsg" : "offscreen"
    const errContent = error?.data?.message || ''

    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={onSaveNoteClicked}>
                <div className="form__title-row">
                    <h2>New Note</h2>
                </div>
                
                <div className="form__body">
                    <label className="form__label" htmlFor="title">
                        Title:</label>
                    <input
                        className="form__input"
                        id="title"
                        name="title"
                        type="text"
                        value={title}
                        onChange={onTitleChanged}
                        required
                    />

                    <label className="form__label" htmlFor="text">
                        Text:</label>
                    <textarea
                        className="form__input form__input--text"
                        id="text"
                        name="text"
                        value={text}
                        onChange={onTextChanged}
                        required
                        style={{ minHeight: '120px', resize: 'vertical' }}
                    />

                    <label className="form__label" htmlFor="username">
                        ASSIGNED TO:</label>
                    <select
                        id="username"
                        name="username"
                        className="form__select"
                        value={userId}
                        onChange={onUserIdChanged}
                    >
                        {options}
                    </select>
                </div>

                <div className="form__footer">
                    <button
                        className="form__btn form__btn--secondary"
                        type="button"
                        onClick={() => navigate('/dash/notes')}
                    >
                        Cancel
                    </button>
                    <button
                        className="form__btn form__btn--primary"
                        type="submit"
                        disabled={!canSave}
                    >
                        <FontAwesomeIcon icon={faSave} /> Create Note
                    </button>
                </div>
            </form>
        </>
    )

    return content
}

export default NewNoteForm