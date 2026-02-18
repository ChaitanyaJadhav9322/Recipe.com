import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Draggable from "react-draggable"; // ✅ Import Draggable
import "../App.css";
import { FaPaperPlane, FaRobot, FaTimes } from "react-icons/fa";
import { Container, Row, Col, InputGroup, FormControl, Button } from "react-bootstrap";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const chatRef = useRef(null);

  const API_KEY ="AIzaSyCGpXlU9j0ZU4U21Cbex5DBbComuSm0jO8";

  const handleMessageSend = async () => {
    if (input.trim() !== "") {
      const userMessage = { text: input, sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput("");

      try {
        console.log("API Key:", API_KEY); // ✅ Debugging API key
        const response = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
          { contents: [{ role: "user", parts: [{ text: input }] }] } // ✅ Fixed payload structure
        );

        console.log("API Response:", response.data); // ✅ Debug API response
        const botReply =
          response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
          "I'm not sure how to respond.";
        setMessages((prevMessages) => [...prevMessages, { text: botReply, sender: "bot" }]);
      } catch (error) {
        console.error("Error fetching response:", error.response?.data || error.message);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "❌ API Error! Please try again later.", sender: "bot" },
        ]);
      }
    }
  };

  // ✅ Scroll to bottom when new message appears
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  // ✅ Close chat when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {/* ✅ Floating Chatbot Button (Draggable) */}
      {!isOpen && (
        <Draggable bounds="parent" grid={[1, 1]}>
          <div className="chatbot-button" onClick={() => setIsOpen(true)}>
            <FaRobot size={30} />
          </div>
        </Draggable>
      )}

      {/* ✅ Draggable Chatbox */}
      {isOpen && (
        <Draggable handle=".chat-header" bounds="parent" grid={[1, 1]}>
          <div className="chat-container" ref={chatRef}>
            <Container fluid className="chat-box">
              {/* Chat Header */}
              <div className="chat-header">
                <h5 className="drag-handle">AI Assistant 🤖</h5>
                <button className="close-btn" onClick={() => setIsOpen(false)}>
                  <FaTimes />
                </button>
              </div>

              {/* Messages */}
              <Row className="chat-content">
                <Col className="overflow-auto">
                  {messages.map((message, index) => (
                    <div key={index} className={`message ${message.sender}`}>
                      <div className="message-bubble">{message.text}</div>
                    </div>
                  ))}
                </Col>
              </Row>

              {/* Input */}
              <Row className="input-box">
                <Col md={12} className="d-flex">
                  <InputGroup className="w-100">
                    <FormControl
                      type="text"
                      placeholder="Type a message..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleMessageSend()} // ✅ Fixed event
                    />
                    <Button variant="success" onClick={handleMessageSend}>
                      <FaPaperPlane />
                    </Button>
                  </InputGroup>
                </Col>
              </Row>
            </Container>
          </div>
        </Draggable>
      )}
    </>
  );
}
 
