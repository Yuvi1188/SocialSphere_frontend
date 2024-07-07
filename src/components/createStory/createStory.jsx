import React, { useState } from 'react';
import { Dialog, DialogContent, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { uploadStory } from '../../store/story-action';
import Loader from '../layout/loader/Loader';

const CreateStory = ({ newStory, setNewStory }) => {
    const { loading } = useSelector((state) => state.user);
    const [storyFile, setStoryFile] = useState(null);
    const [preview, setPreview] = useState("");
    const dispatch = useDispatch();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setStoryFile(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!storyFile) return; // Handle case when no file is selected
        const formData = new FormData();
        formData.append('file', storyFile);
        dispatch(uploadStory(formData));
        setNewStory(false);
    };

    return (
        <Dialog open={newStory} onClose={() => setNewStory(false)} maxWidth='md'>
            {loading ? (
                <Loader />
            ) : (
                <DialogContent style={{ width: '400px', height: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <input
                        type="file"
                        accept="video/*,image/*"
                        onChange={handleFileChange}
                        className="mt-3 mb-2"
                    />
                    {preview && (
                        <img src={preview} alt="Preview" className="max-w-full max-h-full" style={{ marginBottom: '10px' }} />
                    )}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        style={{ marginTop: '10px' }}
                    >
                        Share Story
                    </Button>
                </DialogContent>
            )}
        </Dialog>
    );
};

export default CreateStory;