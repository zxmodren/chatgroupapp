import React from 'react';

import { createRoot } from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

const container = document.getElementById('chatApp')
const root = createRoot(container);

root.render(<App />);