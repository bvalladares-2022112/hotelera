import './MyProfilePage.css';
import { Navbar } from '../../components/Navbar/Navbar';
import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { getDetailsUser } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { useUpdateUser } from '../../shared/hooks/useUpdateUser';

export const MyProfilePage = () => {
  const [initialProfileState, setInitialProfileState] = useState({
    name: '',
    surname: '',
    username: '',
    email: '',
    profileImage: ''
  });

  const [profile, setProfile] = useState(initialProfileState);
  const [isDirty, setIsDirty] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [originalProfileImage, setOriginalProfileImage] = useState('');
  const [reloadComponent, setReloadComponent] = useState(false);

  const { updateUser } = useUpdateUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const userDetails = await getDetailsUser();
          if (userDetails) {
            setProfile(userDetails);
            setInitialProfileState(userDetails);
            setOriginalProfileImage(userDetails.profileImage);
            const userId = userDetails.uid
            if (userId) {
              const userProfileUrl = `/stayGo/myprofile/${userId}`
              if (window.location.pathname !== userProfileUrl) {
                navigate(userProfileUrl)
              }
            } else {
              console.error('User ID is undefined')
            }
          } else {
            navigate('/stayGo/login')
          }
        } else {
          navigate('/stayGo/login');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [navigate, reloadComponent]);

  const handleCancel = () => {
    setProfile(initialProfileState);
    setIsDirty(false);
    setIsEditing(false);
  };

  const handleUpdate = async () => {
    try {
      await updateUser(localStorage.getItem('token'), profile);
      if (profile.profileImage === '') {
        setProfile(prevProfile => ({
          ...prevProfile,
          profileImage: originalProfileImage
        }));
      }
      setIsDirty(false);
      setIsEditing(false);
      setReloadComponent(prevState => !prevState);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    setIsDirty(true);
    setIsEditing(true);
  };

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <header className="profile-header">
          <h1>My Profile</h1>
        </header>
        <div className="profile-content">
          <div className="profile-image">
            <img src={!isEditing && profile.profileImage || originalProfileImage || "https://s1.elespanol.com/2023/04/12/curiosidades/naturaleza-planeta-tierra/755684659_232351311_1706x960.jpg"} alt="Profile" />
            <button className={`update-button ${!isDirty ? 'disabled' : ''}`} onClick={handleUpdate} disabled={!isDirty}>Update profile</button>
            {isDirty && (
              <button className="cancel-button" onClick={handleCancel}>Cancel</button>
            )}
          </div>
          <div className="profile-info">
            <div className="profile-field">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="profile-field">
              <label>Surname:</label>
              <input
                type="text"
                name="surname"
                value={profile.surname}
                onChange={handleInputChange}
              />
            </div>
            <div className="profile-field">
              <label>Username:</label>
              <input
                type="text"
                name="username"
                value={profile.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="profile-field">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="profile-field">
              <label>Image URL:</label>
              <input
                type="text"
                name="profileImage"
                value={profile.profileImage}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <Toaster />
      </div>
    </>
  );
};