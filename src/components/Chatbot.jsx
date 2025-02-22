import React, { useState } from 'react';
import '../App.css';
import ReactMarkdown from 'react-markdown';
import { FaPaperPlane } from 'react-icons/fa';
import { Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleMessageSend = () => {
    if (input.trim() !== '') {
      const newMessage = { text: input, sender: 'user' };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setInput('');

      // Simulating bot response
      setTimeout(() => {
        const botMessage = { text: "Hello! How can I help you?", sender: 'bot' };
        setMessages(prevMessages => [...prevMessages, botMessage]);
      }, 1000);
    }
  };

  return (
    <Container fluid className="d-flex flex-column justify-content-center align-items-center chat-container">
      <Row className="chat-box p-3">
        <Col className="overflow-auto">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender} p-2 rounded`}>
              {message.sender === 'bot' ? (
                <ReactMarkdown>{message.text}</ReactMarkdown>
              ) : (
                message.text
              )}
            </div>
          ))}
        </Col>
      </Row>
      <Row className="input-box fixed-bottom w-100 d-flex justify-content-center">
        <Col md={6}>
          <InputGroup className="shadow-sm">
            <FormControl
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleMessageSend();
                }
              }}
            />
            <Button variant="warning" onClick={handleMessageSend}>
              <FaPaperPlane />
            </Button>
          </InputGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default Chatbot;
