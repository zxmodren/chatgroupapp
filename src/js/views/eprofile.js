import React, { useState, useEffect } from 'react';
import { withBaseLayout } from '../layouts/Base';
import { useSelector, useDispatch } from 'react-redux';
import 'firebase/storage'
import firebase from 'firebase/app';
import { updateUserData, updateUserAvatar } from '../actions/auth';

function EProfile() {
    const dispatch = useDispatch();
    const user = useSelector(({ auth }) => auth.user)
    const [imgUpload, setImgUpload] = useState(null);
    const [imgPreview, setImgPreview] = useState(user.avatar);
    const [userData, setUserData] = useState({ username: '' });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const profileRef = firebase.firestore().collection('profiles').doc(user.uid);
                const userProfile = await profileRef.get();
                const userData = userProfile.data();
                setUserData(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
    
        fetchUserData();
    }, [user.uid]);
    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImgUpload(file);
        setImgPreview(URL.createObjectURL(file));
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(`Changing ${name} to ${value}`); // Menampilkan perubahan nilai username
        setUserData((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };
    const uploadImg = async () => {
        if (imgUpload == null) return;
    
        const storageRef = firebase.storage().ref();
        const imgRef = storageRef.child(`avatars/${user.uid}/${imgUpload.name}`);
    
        try {
            // Hapus avatar lama jika ada
            const profileRef = firebase.firestore().collection('profiles').doc(user.uid);
            const doc = await profileRef.get();
            if (doc.exists) {
                const oldAvatarUrl = doc.data().avatar;
                if (oldAvatarUrl) {
                    const oldAvatarRef = storageRef.storage.refFromURL(oldAvatarUrl);
                    await oldAvatarRef.delete();
                    console.log('Old avatar deleted successfully');
                }
            }
    
            // Upload avatar baru
            const uploadTask = await imgRef.put(imgUpload);
            console.log('Image uploaded successfully');
    
            // Perbarui URL avatar dalam Firestore
            const downloadURL = await uploadTask.ref.getDownloadURL();
            await profileRef.update({ avatar: downloadURL });
            console.log('Avatar URL updated in profiles');
            dispatch(updateUserAvatar(downloadURL));
        } catch (error) {
            console.error('Error uploading image or updating avatar URL:', error);
        }
    };
    const updateUserProfile = async () => {
        try {
            if (user.username !== userData.username) {
                // Perbarui username di Firestore
                const profileRef = firebase.firestore().collection('profiles').doc(user.uid);
                await profileRef.update({ username: userData.username });
                console.log('Username updated successfully', userData.username);
    
                // Update data pengguna di Redux state
                dispatch(updateUserData({ username: userData.username }));
            } else {
                console.log('No changes in username');
            }
        } catch (error) {
            console.error('Error updating username:', error);
        }
    };
    
    const saveProfile = async () => {
        await uploadImg(); // Upload avatar
        await updateUserProfile(); // Perbarui username

  
    };

    return(
    <div class="container rounded bg-white mt-5" style={{ border: '2px solid #ccc', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <div class="row"> 
            <div class="col-md-4 border-right" style={{ border: '2px solid #ccc' }}>
                    <div class="d-flex flex-column align-items-center text-center p-3 py-5">
                        <img
                            className="rounded-circle mt-5"
                            src={imgPreview || user.avatar}
                            width="90"
                            style={{ cursor: 'pointer', border: '2px solid #ccc' }}
                            onClick={() => document.getElementById('fileInput').click()}
                        />
                        <input id="fileInput" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
                        <span class="text-black-50">{user.email}</span>
                    </div>
            </div>
            <div class="col-md-8" style={{ border: '2px solid #ccc' }}>
                <div class="p-3 py-5">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <div class="d-flex flex-row align-items-center back"><i class="fa fa-long-arrow-left mr-1 mb-1"></i>
                        <h6 class="text-right">Edit Profile</h6>
                        </div>
                    </div>
                    <div class="row mt-2">
                            <div class="col-md-6">
                                <span class="text-black-50">Email</span>
                                <input type="text" class="form-control" placeholder="Email" value={user.email} readOnly/>
                            </div>
                    </div>
                    <div class="row mt-3">
                            <div class="col-md-6">
                                <span class="text-black-50">Username</span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Username"
                                    name="username"
                                    id="username"
                                    value={userData.username}
                                    onChange={handleChange}
                                />
                            </div>
                    </div>
                        <div class="mt-5 text-right">
                            <button class="btn btn-primary profile-button" type="button" onClick={saveProfile}>Save Profile</button>
                        </div>
                </div>
            </div>
        </div>
        </div>
    )
};

export default withBaseLayout(EProfile, { canGoBack: true });