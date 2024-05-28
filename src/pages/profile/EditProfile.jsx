import React, { useEffect, useState } from 'react'
import './Profile.css'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/features/auth/authSlice'
import Loader from '../../components/loader/Loader'
import { Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { updateUser } from '../../services/authService'
import ChangePwd from '../../components/changepwd/ChangePwd'

const EditProfile = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const user = useSelector(selectUser)  //useSelector- helps to select from slice

    //when page refresh, redux state is lost and user details will be removed from the form, to handle this 
    const { email } = user

    useEffect(() => {
        if (!email) {
            navigate("/profile")
        }
    }, [email, navigate])

    console.log(user)
    const initialState = {
        name: user?.name,    //using optional chaining to avoid error when page refresh
        email: user?.email,
        phone: user?.phone,
        bio: user?.bio,
        photo: user?.photo,
    }

    const [profile, setProfile] = useState(initialState)
    const [profileImage, setProfileImage] = useState(initialState)

    //handle  input chnage - 
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setProfile({ ...profile, [name]: value })
    }

    //handle image change-
    const handleImageChange = (e) => {
        setProfileImage(e.target.files[0])
    }

    //save updated data - communicate to BE , save image to cloudinary from FE
    const handleSaveProfile = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            //save profie data
            //handle image upload
            let imageUrl
            if (
                profileImage &&
                (profileImage.type === "image/jpeg" ||
                    profileImage.type === "image/jpg" ||
                    profileImage.type === "image/png")
            ) {
                const image = new FormData()
                image.append("file", profileImage)
                image.append("cloud_name", "dwfh8lnfl")
                image.append("upload_preset", "u6pduv4g")

                //1.save image to cloudinary
                const response = await fetch("https://api.cloudinary.com/v1_1/dwfh8lnfl/image/upload",
                    { method: "post", body: image })
                const imageData = await response.json()
                imageUrl = imageData.url.toString()
                console.log(imageData);     
                toast.success("Image Uploaded sucessfully")
            }    

                //save Profile
                const formData = {
                    name: profile.name,
                    phone: profile.phone,
                    bio: profile.bio,
                    photo: profileImage ? imageUrl : profile.photo,
                }

                const data = await updateUser(formData)
                console.log(data);
                toast.success("User Updated")
                navigate("/profile")
                setIsLoading(false)
          

        } catch (error) {
            console.log(error);
            setIsLoading(false)
            toast.error(error.message)
        }

    }


    return (
        <div className='profile --my2'>
            {isLoading && <Loader />}

            <Card className={"card --flex-dir-column"}>
                <span className="profile-Photo">
                    <img src={user?.photo} alt="profile-pic" />
                </span>
                <form name="editprofile" className="--form-control --m" onSubmit={handleSaveProfile}>
                    <span className="profile-data">
                        <p>
                            <label htmlFor='name'>Name</label>
                            <input
                                type="text"
                                name='name'
                                value={profile?.name}
                                onChange={handleInputChange}
                            />
                        </p>
                        <p>
                            <label htmlFor='email'>Email</label>
                            <input
                                type="text"
                                name='email'
                                value={user?.email}
                                disabled
                            />
                            <br />
                            <code>Email cannot be changed</code>
                        </p>
                        <p>
                            <label htmlFor='phone'>Phone</label>
                            <input
                                type="text"
                                name='phone'
                                value={profile?.phone}
                                onChange={handleInputChange}
                            />
                        </p>
                        <p>
                            <label htmlFor="bio">Bio</label>
                            <textarea
                                name="bio"
                                value={profile?.bio}
                                onChange={handleInputChange}
                                cols="30"
                                rows="3"
                            ></textarea>
                        </p>
                        <p>
                            <label htmlFor="image">Photo</label>
                            <input
                                type="file"
                                name="image"
                                onChange={handleImageChange}
                            />
                        </p>
                        <div>
                            <button className='--btn --btn-primary'>save changes</button>
                        </div>
                    </span>
                </form>
            </Card>
            <ChangePwd />
        </div>
    )
}

export default EditProfile