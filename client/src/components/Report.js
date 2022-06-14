import React from "react";

function Report({ title, author, report }) {

    return (
        <>
            <p>{title}</p>
            <p>{author}</p>
            <p>{report.report}</p>
        </>
    )
}

export default Report