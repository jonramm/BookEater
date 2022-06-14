import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import AuthContext from '../context/AuthProvider'

function Report({ bookToEdit }) {

    const [reportId, setReportId] = useState(bookToEdit.id)
    const [report, setReport] = useState(bookToEdit.report)
    const [title, setTitle] = useState(bookToEdit.title)
    const [author, setAuthor] = useState(bookToEdit.author)
    const [bookId, setBookId] = useState(bookToEdit.bookId)

    const { auth, setAuth } = useContext(AuthContext)
    const navigate = useNavigate()

    const editReport = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('/update-report',
            JSON.stringify({bookId, title, author, report, reportId}),
                {
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.accessToken}` },
                    withCredentials: true
                })
            navigate('/library')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="report-container">
            <form className="form-report" onSubmit={editReport}>
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