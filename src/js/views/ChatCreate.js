import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { withBaseLayout } from '../layouts/Base';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createChat } from '../actions/chat';
import md5 from 'crypto-js/md5';

function ChatCreate() {
    const { register, handleSubmit } = useForm();
    const user = useSelector(({ auth }) => auth.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const [imageUrl, setImageUrl] = useState('');

    const onSubmit = (data) => {
        const emailHash = md5(user.email.trim().toLowerCase()); // Membuat hash dari email pengguna
        const gravatarUrl = `https://www.gravatar.com/avatar/${emailHash}?d=identicon`;

        setImageUrl(gravatarUrl);

        const chatData = {
            name: data.name,
            description: data.description,
            image: gravatarUrl,
        };

        dispatch(createChat(chatData, user.uid))
            .then(_ => history.push('/home'));
    };

    return (
        <div className="centered-view">
            <div className="centered-container">
                <form onSubmit={handleSubmit(onSubmit)} className="centered-container-form">
                    <div className="header">Create chat now!</div>
                    <div className="subheader">Chat with people you know</div>
                    <div className="form-container">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                {...register('name')}
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                {...register('description')}
                                name="description"
                                className="form-control"
                                id="description">
                            </textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="image">Image</label>
                            <input
                                type="text"
                                className="form-control"
                                id="image"
                                name="image"
                                readOnly
                                value={imageUrl}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-outline-primary">Create</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default withBaseLayout(ChatCreate, { canGoBack: true });
