import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import AuthContext from '../context/AuthProvider'
import EditConfirm from "./EditConfirm";

function Report({ bookToEdit }) {

    const [reportId, setReportId] = useState(bookToEdit.id)
    const [report, setReport] = useState(bookToEdit.report)
    const [title, setTitle] = useState(bookToEdit.title)
    const [author, setAuthor] = useState(bookToEdit.author)
    const [bookId, setBookId] = useState(bookToEdit.bookId)
    const [book, setBook] = useState({})

    const { auth, setAuth } = useContext(AuthContext)
    const navigate = useNavigate()

    const [editShow, setEditShow] = useState(false);
    const handleEditClose = () => setEditShow(false);
    const handleEditShow = (e) => {
        e.preventDefault()
        setEditShow(true);
        setBookId(bookToEdit)
    }

    const editReport = async () => {
        try {
            console.log('Editing...')
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
            <EditConfirm 
                editShow={editShow}
                handleEditClose={handleEditClose}
                book={book}
                editReport={editReport}
            />
            {/* <form className="form-report" onSubmit={editReport}> */}
            <form className="form-report">
            <h2>{title}</h2>
            <h2>{author}</h2>
            <label className="" for="report"></label>
                <textarea
                    class="form-control"
                    id="report"
                    autoComplete="off"
                    rows="20"
                    columns="50"
                    onChange={(e) => { setReport(e.target.value) }}
                    value={report}
                    placeholder="Thoughts?"
                    required
                />
                {/* <button class="btn btn-lg btn-primary btn-block">Save</button> */}
                <div className="edit-report-btn-row">
                    <button onClick={() => navigate('/library')} className='btn btn-sm btn-light btn-block home-btn'>Go back</button>
                    <button onClick={(e) => handleEditShow(e)} className='btn btn-sm btn-light btn-block home-btn'>Save</button><br/>
                </div>
            </form>
        </div>
    )
}

export default Report