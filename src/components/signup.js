import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'

export const Signup = () => {
    const [credentials, setcredentials] = useState({name:"",email:"",password:"",cpassword:""})
    let history = useHistory()
    const handleSumbit = async (e) => {
        e.preventDefault()
        const host = "http://node3.somehost.xyz:4070"
        const {name,email,password}= credentials
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name,email,password})

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
                    <label for="exampleInputEmail1" class="form-label"> Full Name</label>
                    <input type="text" class="form-control" id="text" aria-describedby="text"name="name" onChange={onChange}/>
                </div> 
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="email" aria-describedby="email" name="email"onChange={onChange}/>
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" name="password"onChange={onChange}/>
                </div> <div class="mb-3">
                    <label for="cpassword" class="form-label">Confirm Password</label>
                    <input type="cpassword" class="form-control" id="cpassword" name="cpassword"onChange={onChange}/>
                </div>
             
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
