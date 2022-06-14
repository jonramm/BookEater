import React from "react";
import UsersTableRow from "./UsersTableRow";

function UsersTable({ users }) {

    return (
        <table className="users-table table table-hover">
            <thead>
                <tr>
                    <th scope="col">Title</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, key) => (<UsersTableRow user={user} key={key} />))}
            </tbody>
        </table>
    )
}

export default UsersTable