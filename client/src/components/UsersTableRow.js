import React from "react";

function UsersTableRow({ user, key }) {
    
    return (
        <tr key={key}>
            <td>{user.email}</td>
        </tr>
    )
}

export default UsersTableRow