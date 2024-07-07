import React, { useState } from 'react';
import UserImg from '../layout/user/UserImg';
import profileimg from '../../assets/profileimg.jpg';
import { useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    dialogPaper: {
        maxWidth: '90%',
        margin: 'auto'
    },
    imageContainer: {
        maxWidth: '100px',
        maxHeight: '100px',
        cursor: 'pointer',
        marginRight: '10px',
    },
});

const Message = ({ message }) => {
    const { user } = useSelector(state => state.user);
    const isOwnMessage = message.sender._id === user._id;
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const classes = useStyles();

    return (
        <div className={`flex mb-4 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
            {!isOwnMessage && (
                <UserImg imag={profileimg} dim={1.4} />
            )}
            <div className={`flex flex-col ${isOwnMessage ? 'items-end' : 'items-start'} ml-2`}>
                <div className={`rounded-full p-2 h-8 flex flex-row justify-center items-center ${isOwnMessage ? 'bg-blue-600 text-white' : 'bg-gray-800 text-white'}`}>
                    <p className='text-[0.9375rem]'>{message.content}</p>
                </div>
                {message.document && message.document.url && (
                    <img src={message.document.url} alt="Document Preview" className={classes.imageContainer} onClick={handleOpen} />
                )}
            </div>
            <Dialog open={open} onClose={handleClose} classes={{ paper: classes.dialogPaper }}>
                {message.document && message.document.url && (
                    <img src={message.document.url} alt="Document" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                )}
            </Dialog>
        </div>
    );
};

export default Message;
