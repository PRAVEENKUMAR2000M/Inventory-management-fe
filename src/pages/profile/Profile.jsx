import React, { useEffect, useState } from 'react'
import { SpinnerImg } from "../../components/loader/Loader"
import './Profile.css'
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser'
import { useDispatch } from 'react-redux'
import { selectIsLoading } from '../../redux/features/product/productSlice'
import { getUser } from '../../services/authService'
import { SET_NAME, SET_USER } from '../../redux/features/auth/authSlice'
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'

const Profile = () => {
    useRedirectLoggedOutUser("/login")
    const dispatch = useDispatch()

    const [profile, setProfile] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        async function getUserData() {
            const data = await getUser()
            console.log(data)

            setProfile(data)
            setIsLoading(false)
            await dispatch(SET_USER(data))
            await dispatch(SET_NAME(data.name))
        }
        getUserData()
    }, [dispatch])

    return (
        <div className='profile --my2'>
            {isLoading && <SpinnerImg />}
            <>
                {!isLoading && profile === null ? (
                    <p>Something went wrong, please reload the page</p>
                ) : (
                    <Card className={"card --flex-dir-column"}>
                        <span className="profile-Photo">
                            <img src={profile?.photo} alt="profile-pic" />
                        </span>
                        <span className="profile-data">
                            <p>
                                <b>Name: </b> {profile?.name}
                            </p>
                            <p>
                                <b>Email: </b> {profile?.email}
                            </p>
                            <p>
                                <b>Phone: </b> {profile?.phone}
                            </p>
                            <p>
                                <b>BIO: </b> {profile?.bio}
                            </p>
                            <div>
                                <Link to="/edit-profile">
                                    <button className='--btn --btn-primary'>Edit Profile</button>
                                </Link>
                            </div>
                        </span>
                    </Card>
                )}
            </>
        </div>
    )
}

export default Profile