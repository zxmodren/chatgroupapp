import React from 'react';
import { withBaseLayout } from '../layouts/Base';
import { useDispatch, useSelector } from 'react-redux';
import { updateSettings } from '../actions/setting';
import { Typography, Checkbox, Button, FormControlLabel, FormGroup, Card, CardContent } from '@mui/material';
import './style/setting.scss'
function Setting() {
    const dispatch = useDispatch();
    const {
        isDarkTheme,
        showNotifications,
        playSound } = useSelector(({ settings }) => settings)
    const handleChange = ({ target: { checked, name } }) => {
        dispatch(updateSettings(name, checked))
    }
    return (
    <div className="centered-view">
        <div className="centered-container">
            <Card>
                <CardContent>
                    <Typography variant="h5" gutterBottom>Adjust application settings</Typography>
                    <div className="form-container">
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox checked={isDarkTheme} onChange={handleChange} name="isDarkTheme" />}
                                label="Dark Theme"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={showNotifications} onChange={handleChange} name="showNotifications" />}
                                label="Enable Notification"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={playSound} onChange={handleChange} name="playSound" />}
                                label="Sound notification"
                            />
                        </FormGroup>
                        <Button onClick={() => electron.appApi.quitApp()} variant="contained" color="error" className="btn-quit">
                            Quit App
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>


    )
}
export default withBaseLayout(Setting, { canGoBack: true });