import React from "react";
import { useSelector } from 'react-redux';
import LoadingBar from "./Loader";

export default function LoadingView({ message = 'Wait a Minutes' }) {
    const isDarkTheme = useSelector(({ settings }) => settings.isDarkTheme);
    return (
        <div className={isDarkTheme ? 'dark' : 'light'}>
            <div className="loading-screen">
                <div className="loading-view">
                    <div className="loading-view-container">
                        <div className="mb-3">{message}</div>
                        <LoadingBar />
                    </div>
                </div>
            </div>
        </div>
    )
}