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
    const [flavor, setFlavor] = useState(bookToEdit.flavor)
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
            const response = await axios.post('/update-report',
                JSON.stringify({ bookId, title, author, report, reportId, flavor }),
                {
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.accessToken}` },
                    withCredentials: true
                })
            navigate('/library')
        } catch (err) {
            console.log(err)
        }
    }

    console.log(flavor)

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
                <div>
                    <label for="flavor">This book was: </label>
                    <select id="flavor"
                        value={flavor}
                        onChange={(e) => { setFlavor(e.target.value) }}>
                        <option selected={(flavor === 'Tasty')
                            ? true
                            : false}
                            value="Tasty">Tasty</option>
                        <option selected={(flavor === 'Edible')
                            ? true
                            : false} value="Edible">Edible</option>
                        <option selected={(flavor === 'Inedible')
                            ? true
                            : false} value="Inedible">Inedible</option>
                    </select>
                </div>
                <textarea
                    class="form-control"
                    id="report"
                    autoComplete="off"
                    rows="15"
                    columns="50"
                    onChange={(e) => { setReport(e.target.value) }}
                    value={report}
                    placeholder="Thoughts?"
                    required
                />
                {/* <button class="btn btn-lg btn-primary btn-block">Save</button> */}
                <div className="edit-report-btn-row">
                    <button onClick={() => navigate('/library')} className='btn btn-sm btn-light btn-block report-btn'>Go back</button>
                    <button onClick={(e) => handleEditShow(e)} className='btn btn-sm btn-light btn-block report-btn'>Save</button><br />
                </div>
            </form>
        </div>
    )
}

export default Report