'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch('/api/contact', {
      method: 'POST',
      body: new FormData(e.target),
    });

    if (res.redirected) {
      window.location.href = res.url;
    } else {
      const data = await res.json();
      setMessage(data.message || 'Form submitted!');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Maintenance Request</h1>
      <input name="name" placeholder="Your Name" required />
      <input name="email" type="email" placeholder="Your Email" required />
      <textarea name="message" placeholder="Your Message" required />
      <button type="submit">Submit</button>
      <p>{message}</p>
    </form>
  );
}
