import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './Home';
import SoloGame from './routes/SoloGame';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6CDCFF',
    },
    secondary: {
      main: '#e9b003',
    },
    background: {
      default: '#1f1f1f',
      paper: '#353535',
    },
  },
  typography: {
    h1: {
      fontWeight: 700
    },
    h6: {
      fontWeight: 700
    },
    subtitle1: {
      fontWeight: 700,
    },
    fontFamily: 'Nunito, sans-serif'
  }
});

theme = responsiveFontSizes(theme);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/solo" element={<SoloGame />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
