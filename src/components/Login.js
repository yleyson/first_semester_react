import { Button } from '@mui/material'
import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Login(props) {
    const [userUserName, setuserName] = useState("")
    const [pass, setPass] = useState("")
    const navigate = useNavigate()


    const changeUserName = (e) => {
        setuserName(e.target.value)
    }
    const changePass = (e) => {
        setPass(e.target.value)
    }
    const LoginUser = () => {

        let user_name = userUserName
        let user_password = pass

        let data = JSON.parse(localStorage.getItem(`users`))
        let user = data.filter((item) => {
            return item.name === user_name && item.pass === user_password
        })

        if (userUserName === 'admin' && pass === 'admin') {
            props.setAdmin()
            props.handleClose()
            return
        }

        if (user.length == 0) {
            alert(`המשתמש לא נמצא במאגר`)
            return false
        }
        //המרה לאובייקט על ידי שמירת הערך שנמצא באיבר הראשון במערך שקיבלנו
        user = user[0]

        if (user.pass !== user_password) {
            alert(`פרטי הזיהוי שגויים`)
            return false
        }

        //session storage פרטי הזהוי נכונים והמשתמש נמצא במאגר ולכן נעבור לדף פרופיל לאחר שמירה ב 
        props.setUserLog()
        props.handleClose()
        sessionStorage.setItem(`login_user`, JSON.stringify(user))
        navigate('/UserPage')

    }


    return (
        <div className='Login_container RegisterImage Login'>
            <h1>Log In</h1>

            <div class="form-floating mb-3">
                <input type="text" onChange={changePass} class="form-control" id="floatingPassword" placeholder="Password" />
                <label for="floatingPassword">Password</label>
            </div>
            <div style={{ marginTop: '10px' }} class="form-floating mb-3">
                <input type="text" onChange={changeUserName} class="form-control" id="floatingPassword" placeholder="Password" />
                <label for="floatingPassword">User Name</label>
            </div>
            <Button onClick={LoginUser} style={{ marginTop: 30 }} variant="contained" color="success">Log in</Button>
        </div >

    )
}


