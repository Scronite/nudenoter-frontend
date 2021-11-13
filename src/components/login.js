import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'

export const Login = () => {
    const [credentials, setcredentials] = useState({email:"",password:""})
    let history = useHistory()
    const handleSumbit = async (e) => {
        e.preventDefault()
        const host = "http://node3.somehost.xyz:4070"
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: credentials.email,password: credentials.password})

        });
        const json = await response.json()
        console.log(json)
     
            localStorage.setItem('token',json.authtoken)
            history.push('/')
        
        
    }
    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <form onSubmit={handleSumbit}>
                <div class="mb-3">
                    <label for="email" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="email"value={credentials.email} name="email" onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>

                <button type="submit" class="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login