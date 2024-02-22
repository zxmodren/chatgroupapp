import React, { useState } from 'react';
import { createTimestamp } from '../utils/tm';

export default function Messenger({ onSubmit }) {
    const [value, setValue] = useState('');

    const onKeyPress = e => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
            setValue('');
        }
    }

    const sendMessage = () => {
        if (value.trim() === '') { return; }

        const message = {
            content: value.trim(),
            timestamp: createTimestamp()
        }

        onSubmit(message);
    }

    return (
        <div className="chat-input form-group mt-3 mb-0 d-flex justify-content-between">
            <textarea
                onChange={e => setValue(e.target.value)}
                onKeyPress={onKeyPress}
                value={value}
                className="form-control mr-2"
                rows="1"
                placeholder="Type your message here..">
            </textarea>
            <button onClick={sendMessage} className="btn btn-primary align-self-end mt-2">Send</button>
        </div>
    )
}
