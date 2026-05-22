import { useGetNotesQuery } from './notesApiSlice'
import Note from './Note'
import useAuth from '../../hooks/useAuth'

const NoteList = () => {
    const { username, isManager, isAdmin } = useAuth()

    const { data: notes,
        isLoading,
        isError,
        isSuccess
     } = useGetNotesQuery('noteList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });

     let content;

     if (isLoading) return <div className="loading">Loading notes...</div>;
     if (isError) return <div className="errmsg">Error fetching notes</div>;
     if (isSuccess) {
         const { ids, entities } = notes;

         let filteredIds;
         if (isManager || isAdmin) {
             filteredIds = [...ids];
         } else {
             filteredIds = ids.filter(noteId => entities[noteId]?.username === username);
         }

         const tableContent = filteredIds?.length
             ? filteredIds.map((noteId) => <Note key={noteId} noteId={noteId} />)
             : null;

         content = (
             <table className="table table--notes">
                 <thead className="table__thead">
                     <tr>
                         <th scope="col" className="table__th">Status</th>
                         <th scope="col" className="table__th">Created</th>
                         <th scope="col" className="table__th">Updated</th>
                         <th scope="col" className="table__th">Title</th>
                         <th scope="col" className="table__th">Owner</th>
                         <th scope="col" className="table__th">Edit</th>
                     </tr>
                 </thead>
                 <tbody>
                     {tableContent}
                 </tbody>
             </table>
         )
     }

     return content;
}

export default NoteList;