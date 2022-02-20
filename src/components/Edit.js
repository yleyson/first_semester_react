import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from '@mui/material'
import TeamSelector from './TeamSelector'
import { useNavigate } from 'react-router-dom'
import images from './images';

localStorage.setItem('images', JSON.stringify(images))
const regexPass = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
const regexMailCheck = new RegExp("^[a-zA-Z_\.\d\-]+@[a-zA-Z]{2,15}(\.[a-zA-Z]+){1,2}$")

export default function Edit(props) {
    let all = JSON.parse(localStorage.getItem('images'))
    let users = JSON.parse(sessionStorage.getItem(`login_user`))
    let data = JSON.parse(localStorage.getItem(`users`))

    let use = data.filter((item) => {
        return item.name === users.name && item.pass === users.pass
    })
    console.log(use)
    const [newUser, setnewUser] = useState(users);
    const [userMail, setuserMail] = useState(users.mail)
    const [userPass, setuserPass] = useState(users.pass)
    const [userUserName, setuserName] = useState(users.name)
    const [userTeam, setuserTeam] = useState(users.userTeam)
    const [newuser, setnewuser] = useState(users);
    const isMounted = useRef(false);
    const navigate = useNavigate()
    let image = all.filter((item) => {
        return item.name === newuser.userTeam
    })
    const [i, setI] = useState(image)

    const Change = () => {
        let check_user = true
        if (newuser !== undefined) {
            console.log(users)
            data.filter((item) => {
                if ((item.name === userUserName || item.mail === userMail) && (item.name !== users.name && item.mail !== users.mail)) {
                    alert('There is user name like this')
                    check_user = false
                    return
                }
            })
            if (!check_user)
                return
        }
        let check = regexPass.test(userPass)
        let Mailcheck = regexMailCheck.test(userMail)
        if (check) {
            console.log(use)
            alert('pass is ok')
            if (Mailcheck) {
                alert('mail is ok')
                setnewuser({ mail: userMail, pass: userPass, name: userUserName, userTeam: userTeam })
            }
            else {
                alert('Incorrect Mail')

            }
        }

        else {

            alert('Incorrect Password Password should contain at least:\n 1 lower case\n1 upper case\n1 special character')
        }

    }

    const GetMail = (e) => {
        setuserMail(e.target.value)
    }
    const GetPass = (e) => {
        setuserPass(e.target.value)
    }

    const GetUserName = (e) => {
        setuserName(e.target.value)
    }

    const GetTeam = (userTeam) => {
        setuserTeam(userTeam)
    }

    useEffect(() => {

        if (isMounted.current) {
            let users_Arr = JSON.parse(localStorage.users)
            image = all.filter((item) => {
                return item.name === newuser.userTeam
            })
            let user_index = null
            users_Arr.filter((user_checl, index) => {
                if (user_checl.name === users.name) {

                    user_index = index
                    return
                }

            }
            )
            users_Arr[user_index] = newuser
            localStorage.users = JSON.stringify(users_Arr)
            sessionStorage.setItem(`login_user`, JSON.stringify(newuser))
            props.setUser()
            props.handleClose()
            navigate('/UserPage')

        }
        else
            isMounted.current = true
    }, [newuser])

    return (
        <div className='RegisterImage'>

            <h1 className='h1Register' >Edit</h1>
            <div class="form-floating mb-3">
                <input type="text" onChange={GetMail} class="form-control" id="floatingInput" placeholder="name@example.com" />
                <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating mb-3">
                <input type="text" onChange={GetPass} class="form-control" id="floatingPassword" placeholder="Password" />
                <label for="floatingPassword">Password</label>
            </div>
            <div style={{ marginTop: '10px' }} class="form-floating mb-3">
                <input type="text" onChange={GetUserName} class="form-control" id="floatingPassword" placeholder="Password" />
                <label for="floatingPassword">User Name</label>
            </div>
            <TeamSelector GetFavorite={GetTeam} />
            <div className='btnRegister'>
                <Button onClick={Change} variant="contained" color="success">Edit</Button>
            </div>


        </div>)
}
