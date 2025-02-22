import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import Card from './Card';
import styled from 'styled-components';

const Form = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.send(
      'service_ovpqslr',
      'template_rda90vb',
      {
        from_name: name,
        to_name: 'Vansh',
        message: message,
        reply_to: email,
        subject: subject,
      },
      '0FwH9M4iilV0-V1pU'
    )
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert('Message Sent Successfully');
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      })
      .catch((err) => {
        console.log('FAILED...', err);
      });
  };

  return (
    <StyledWrapper>
      <div className="form-card1">
        <div className="form-card2">
          <form className="form" onSubmit={sendEmail}>
            <p className="form-heading">Get In Touch</p>
            <div className="form-field">
              <input
                required
                placeholder="Name"
                className="input-field"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-field">
              <input
                required
                placeholder="Email"
                className="input-field"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-field">
              <input
                required
                placeholder="Subject"
                className="input-field"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className="form-field">
              <textarea
                required
                placeholder="Message"
                cols={30}
                rows={3}
                className="input-field"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <button className="sendMessage-btn" type="submit">
              Send Message
            </button>
            <Card />
          </form>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
   .form {
    display: flex;
    flex-direction: column;
    align-self: center;
    font-family: inherit;
    gap: 10px;
    padding-inline: 2em;
    padding-bottom: 0.4em;
    background-color: rgb(15, 123, 181);
    //background-color: #0a192f;
    border-radius: 20px;
    border: 3px solid  #64ffda;
  }
  .form:hover {
    cursor: pointer;
  }

  .form-heading {
    text-align: center;
    margin: 2em;
    color:rgb(255, 255, 255);
    font-size: 1.2em;
    background-color: transparent;
    align-self: center;
  }

  .form-field {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
    border-radius: 10px;
    padding: 0.6em;
    border: none;
    outline: none;
    color: white;
    background-color:rgba(23, 23, 23, 0.41);
    box-shadow: inset 2px 5px 10px rgba(251, 251, 251, 0.12);
  }

  .input-field {
    background: none;
    border: none;
    outline: none;
    width: 100%;
    color: #ccd6f6;
    padding-inline: 1em;
  }

  .sendMessage-btn {
    cursor: pointer;
    margin-bottom: 3em;
    padding: 1em;
    border-radius: 10px;
    border: none;
    outline: none;
    background-color: transparent;
    color: #64ffda;
    font-weight: bold;
    outline: 1px solid #64ffda;
    transition: all ease-in-out 0.3s;
  }

  .sendMessage-btn:hover {
    transition: all ease-in-out 0.3s;
    background-color: #64ffda;
    color: #000;
    cursor: pointer;
    box-shadow: inset 2px 5px 10px rgb(5, 5, 5);
  }

  .form-card1 {
    background-image: linear-gradient(163deg, #64ffda 0%, #64ffda 100%);
    border-radius: 22px;
    transition: all 0.3s;
  }

  .form-card1:hover {
    box-shadow: 0px 0px 30px 1px rgba(100, 255, 218, 0.3);
  }

  .form-card2 {
    border-radius: 0;
    transition: all 0.2s;
  }

  .form-card2:hover {
    transform: scale(0.98);
    border-radius: 20px;
  }
`;

export default Form;