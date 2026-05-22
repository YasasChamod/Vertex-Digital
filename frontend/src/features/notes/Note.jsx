import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectNoteById } from "./notesApiSlice";

const Note = ({ noteId }) => {
    const note = useSelector(state => selectNoteById(state, noteId))

    const navigate = useNavigate()

    if (note) {
        const created = new Date(note.createdAt).toLocaleString("en-US", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })

        const updated = new Date(note.updatedAt).toLocaleString("en-US", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })

        const handleEdit = () => navigate(`/dash/notes/${noteId}`)

        const statusContent = note.completed
            ? <span className="status-badge status-badge--completed">Completed</span>
            : <span className="status-badge status-badge--open">Open</span>

        return (
            <tr className={`table__row ${note.completed ? 'table__cell--inactive' : ''}`}>
                <td className="table__cell">{statusContent}</td>
                <td className="table__cell">{created}</td>
                <td className="table__cell">{updated}</td>
                <td className="table__cell">{note.title}</td>
                <td className="table__cell">{note.username}</td>
                <td className="table__cell">
                    <button onClick={handleEdit} className="table__button">
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        )
    } else return null
}

export default Note