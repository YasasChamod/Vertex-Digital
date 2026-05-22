import { useGetUsersQuery } from "./usersApiSlice";
import User from "./User";

const UsersList = () => {
    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery(undefined, {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });

    let content;

    if (isLoading) return <div>Loading users...</div>;
    if (isError) return <div>Error fetching users</div>;

    if (isSuccess) {
        const { ids } = users;

        const tableContent = ids?.length
            ? ids.map((userId) => <User key={userId} userId={userId} />)
            : null;

        content = (
            <table className="table table--users">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th">Username</th>
                        <th scope="col" className="table__th">Roles</th>
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

export default UsersList;