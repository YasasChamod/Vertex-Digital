import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useUpdateNoteMutation, useDeleteNoteMutation } from './notesApiSlice'
import useAuth from '../../hooks/useAuth'

const EditNoteForm = ({ note, users }) => {
  const { isManager, isAdmin } = useAuth()

  const [updateNote, { isLoading, isSuccess, isError, error }] = useUpdateNoteMutation()
  const [deleteNote, { isSuccess: isDelSuccess, isError: isDelError, error: delerror }] = useDeleteNoteMutation()

  const navigate = useNavigate()

  const [title, setTitle] = useState(note.title)
  const [text, setText] = useState(note.text)
  const [completed, setCompleted] = useState(note.completed)
  const [userId, setUserId] = useState(note.user)

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setTitle('')
      setText('')
      setUserId('')
      navigate('/dash/notes')
    }
  }, [isSuccess, isDelSuccess, navigate])

  const onTitleChanged = e => setTitle(e.target.value)
  const onTextChanged = e => setText(e.target.value)
  const onCompletedChanged = e => setCompleted(e.target.checked)
  const onUserIdChanged = e => setUserId(e.target.value)

  const canSave = [title, text, userId].every(Boolean) && !isLoading

  const onSaveNoteClicked = async () => {
    if (canSave) {
      await updateNote({ id: note.id, user: userId, title, text, completed })
    }
  }

  const onDeleteNoteClicked = async () => {
    await deleteNote({ id: note.id })
  }

  const options = users.map(user => (
    <option key={user.id} value={user.id}>
      {user.username}
    </option>
  ))

  const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
  const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

  const content = (
    <>
      <p className={errClass}>{errContent}</p>
      <form className="form" onSubmit={e => e.preventDefault()}>
        <div className="form__title-row">
          <h2>Edit Note #{note.ticket}</h2>
        </div>

        <div className="form__body">
          <label className="form__label" htmlFor="note-title">Title:</label>
          <input
            className="form__input"
            id="note-title"
            type="text"
            value={title}
            onChange={onTitleChanged}
          />

          <label className="form__label" htmlFor="note-text">Text:</label>
          <textarea
            className="form__input form__input--text"
            id="note-text"
            value={text}
            onChange={onTextChanged}
            style={{ minHeight: '120px', resize: 'vertical' }}
          />

          <label className="form__label form__checkbox-container" htmlFor="note-completed">
            WORK COMPLETE:
            <input
              className="form__checkbox"
              id="note-completed"
              name="completed"
              type="checkbox"
              checked={completed}
              onChange={onCompletedChanged}
            />
          </label>

          <label className="form__label" htmlFor="note-user">ASSIGNED TO:</label>
          <select
            className="form__select"
            id="note-user"
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
          {(isManager || isAdmin) && (
            <button
              className="form__btn form__btn--danger"
              type="button"
              onClick={onDeleteNoteClicked}
            >
              <FontAwesomeIcon icon={faTrashCan} /> Delete
            </button>
          )}
          <button
            className="form__btn form__btn--primary"
            type="button"
            onClick={onSaveNoteClicked}
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

export default EditNoteForm

