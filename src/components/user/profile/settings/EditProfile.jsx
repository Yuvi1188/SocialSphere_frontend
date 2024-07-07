import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../../../../store/user-actions';

const EditProfile = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);

    const [profile, setProfile] = useState({
        fullName: '',
        bio: '',
        website: '',
        gender: '',
        userImgUrl: {
            public_id: '',
            url: ''
        }
    });

    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        if (user) {
            setProfile({
                fullName: user.fullName || '',
                bio: user.bio || '',
                website: user.website || '',
                gender: user.gender || '',
                userImgUrl: user.userImgUrl || { public_id: '', url: '' }
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({
            ...profile,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setAvatar(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setProfile((prevProfile) => ({
                ...prevProfile,
                userImgUrl: {
                    ...prevProfile.userImgUrl,
                    url: reader.result
                }
            }));
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a copy of profile data
        const updatedProfile = { ...profile };

        // Add avatar only if a new image is uploaded
        if (avatar) {
            updatedProfile.avatar = avatar;
        }

        try {
            await dispatch(updateProfile(updatedProfile));
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div className='flex min-h-screen' style={{ width: '890px' }}>
            <div className="bg-black text-white p-10 rounded-lg shadow-md w-[680px] h-full ml-[72px]">
                <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
                <div className="flex items-center mb-6">
                    <img
                        className="w-20 h-20 rounded-full object-cover border-2 border-gray-300 mr-4"
                        src={profile.userImgUrl.url || 'www.urlk.com'}
                        alt="Profile"
                    />
                    <div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="bg-blue-500 text-white py-2 px-4 rounded-md text-sm"
                        />
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="fullName" className="block text-sm font-medium mb-1">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={profile.fullName}
                            onChange={handleChange}
                            placeholder={user.fullName || 'Add your full name'}
                            className="w-full p-2 rounded-md bg-gray-800 text-white"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="bio" className="block text-sm font-medium mb-1">Bio</label>
                        <textarea
                            id="bio"
                            name="bio"
                            value={profile.bio}
                            onChange={handleChange}
                            placeholder={user.bio || 'Add your bio'}
                            className="w-full p-2 rounded-md bg-gray-800 text-white"
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="website" className="block text-sm font-medium mb-1">Website</label>
                        <input
                            type="text"
                            id="website"
                            name="website"
                            value={profile.website}
                            onChange={handleChange}
                            placeholder={user.website || 'Add your website'}
                            className="w-full p-2 rounded-md bg-gray-800 text-white"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="gender" className="block text-sm font-medium mb-1">Gender</label>
                        <select
                            id="gender"
                            name="gender"
                            value={profile.gender}
                            onChange={handleChange}
                            className="w-full p-2 rounded-md bg-gray-800 text-white"
                        >
                            <option value="">Select your gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="prefer not to say">Prefer not to say</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;