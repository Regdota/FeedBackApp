// src/FeedbackForm.js
import React, { useState } from 'react';
import axios from 'axios';

const FeedbackForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !feedback || (!phone && !email)) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      const response = await axios.post('https://example.com/api/feedback', {
        name,
        phone,
        email,
        feedback,
        rating,
      });

      if (response.status === 200) {
        setSuccess(true);
        window.Telegram.WebApp.close();
        window.Telegram.WebApp.MainButton.text = 'Thank you!';
        window.Telegram.WebApp.MainButton.show();
        setTimeout(() => {
          window.Telegram.WebApp.MainButton.hide();
        }, 3000);
      }
    } catch (err) {
      setError('Failed to send feedback. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Phone:</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Feedback:</label>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Rating:</label>
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            onClick={() => setRating(value)}
            style={{ cursor: 'pointer', fontSize: '24px', margin: '0 5px' }}
          >
            {value <= rating ? '😊' : '😐'}
          </span>
        ))}
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>Feedback sent successfully!</div>}
      <button type="submit">Submit</button>
    </form>
  );
};

export default FeedbackForm;
