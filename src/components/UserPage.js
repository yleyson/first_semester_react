import { useEffect, useState } from 'react'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { useNavigate } from 'react-router-dom'
import * as React from 'react';
import images from './images';
import BasicModal from './BasicModal';
import ModeEditOutlineSharpIcon from '@mui/icons-material/ModeEditOutlineSharp';
import Button from '@mui/material/Button';

export default function UserPage(props) {

    localStorage.setItem('images', JSON.stringify(images))
    const [users, setUsers] = useState(JSON.parse(localStorage.users))
    const [usersSession, setusersSession] = useState(JSON.parse(sessionStorage.login_user))
    const setNewUser = () => {
        setusersSession(JSON.parse(sessionStorage.login_user))

    }
    let image = images.filter((item) => {
        return item.name === usersSession.userTeam
    })

    const [i, setI] = useState(image[0].src)
    const navigate = useNavigate()

    let user = JSON.parse(sessionStorage.getItem(`login_user`))

    useEffect(() => {

        setUsers(JSON.parse(localStorage.users))
        image = images.filter((item) => {
            return item.name === usersSession.userTeam
        })
        setI(image[0].src)
    }, [usersSession])


    const DeleteUser = (name) => {
        let new_list = users.filter(user => user.name === name)
        let local_list = users.filter(user => user.name !== name)
        props.setUserLog(false)
        user = JSON.parse(localStorage.setItem('users', JSON.stringify(local_list)))
        navigate('/')

    }

    if (props.user === false) {
        navigate("/")
    }

    return (

        <div className='home_page_container'>
            <img style={{ "height": 186, "margin-top": 95 }} src={i} />
            <div className='UserPage_container'>
                <h1 style={{ fontSize: 40, color: 'white' }}>Hello {user.name}</h1>
                <h3 style={{ fontSize: 40, color: 'white' }}>Fan of {user.userTeam}</h3>
                <div className='favourite_list_container'>



                    <div className='edit_btn'>
                        <Button variant='contained'><DeleteOutlineRoundedIcon onClick={() => DeleteUser(user.name)} /></Button>

                        <BasicModal comp={"edit"} text={<ModeEditOutlineSharpIcon />} setUser={setNewUser} />
                    </div>



                </div>
            </div>
        </div>
    )
}


