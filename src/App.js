// src/App.js
import React, { useEffect } from 'react';
import FeedbackForm from './FeedbackForm';

const App = () => {
  useEffect(() => {
    window.Telegram.WebApp.ready();
  }, []);

  return (
    <div>
      <h1>Feedback Form</h1>
      <FeedbackForm />
    </div>
  );
};

export default App;
