import React, { useState, useEffect, useContext } from "react";

function Report({ bookToEdit }) {

    const [report, setReport] = useState(bookToEdit.report)
    const [title, setTitle] = useState(bookToEdit.title)
    const [author, setAuthor] = useState(bookToEdit.author)

    

    return (
        <div className="login-container">
            <form className="form-signin">
            <label className="" for="title">Title</label>
                <input
                    class="form-control"
                    type="text"
                    id="title"
                    autoComplete='off'
                    onChange={(e) => { setTitle(e.target.value) }}
                    value={title}
                    required
                />
            <label className="" for="author">Author</label>
                <input
                    class="form-control"
                    type="text"
                    id="author"
                    autoComplete="off"
                    onChange={(e) => { setAuthor(e.target.value) }}
                    value={author}
                    required
                />
            <label className="" for="report">Report</label>
                <textarea
                    class="form-control"
                    id="report"
                    autoComplete="off"
                    rows="20"
                    columns="50"
                    onChange={(e) => { setReport(e.target.value) }}
                    value={report}
                    required
                />
                <button class="btn btn-lg btn-primary btn-block">Save</button>
            </form>
        </div>
    )
}

export default Report