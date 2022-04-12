import React, { useState } from "react";

export default function CreateUser() {

    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")

    function validateCreate() {
        return email.length > 0 && password.length > 0 && firstName.length > 0 && lastName.length > 0
    }

    async function createUser() {
        const newUser = { firstName, lastName, email, password }
        return fetch('/api/create/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser)
        })
            .then(data => data.json())
    }

    const handleSubmit = async e => {
        if (validateCreate()) {
            e.preventDefault()
            const response = await createUser()
            if (response.status === 200) {
                alert("Successfully created user!")
            } else {
                alert(`Failed to add user, status code = ${response.status}`)
            }
        } else {
            alert("Please enter email and password")
        }
    } 

    return (
        <>
            <div class="text-center">
            <form class="form-signin" onSubmit={handleSubmit}>
                <h1 class="h3 mb-3 font-weight-normal">Please enter your information</h1>
                <label class="sr-only" for="firstName">First Name</label>
                <input
                    class="form-control"
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)} />
                <label class="sr-only" for="lastName">Last Name</label>
                <input
                    class="form-control"
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)} />
                <label class="sr-only" for="email">Email</label>
                <input
                    class="form-control"
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                <label class="sr-only" for="password">Password</label>
                <input 
                    class="form-control"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                <div>
                    <button class="btn btn-lg btn-primary btn-block" type="submit">Create User</button>
                </div>
            </form>
            </div>     
        </>
    )
}