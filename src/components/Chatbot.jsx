import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import { FaPaperPlane } from "react-icons/fa";
import { Container, Row, Col, InputGroup, FormControl, Button } from "react-bootstrap";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Load API Key from .env
  const API_KEY = process.env.REACT_APP_API_KEY; 

  const handleMessageSend = async () => {
    if (input.trim() !== "") {
      const userMessage = { text: input, sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput("");

      try {
        const response = await axios.post(
          `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`,
          {
            contents: [{ parts: [{ text: input }] }],
          }
        );

        const botReply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "I'm not sure how to respond.";
        const botMessage = { text: botReply, sender: "bot" };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error("Error fetching response:", error);
        const errorMessage = { text: "Sorry, I couldn't get a response. Try again!", sender: "bot" };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      }
    }
  };

  return (
    <Container fluid className="d-flex flex-column align-items-center chat-container">
      <Row className="chat-box">
        <Col className="overflow-auto">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              <div className="message-bubble">{message.text}</div>
            </div>
          ))}
        </Col>
      </Row>

      {/* Input inside the chat container */}
      <Row className="input-box w-100">
        <Col md={8} className="d-flex">
          <InputGroup className="w-100">
            <FormControl
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleMessageSend()}
            />
            <Button variant="success" onClick={handleMessageSend}>
              <FaPaperPlane />
            </Button>
          </InputGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default Chatbot;
