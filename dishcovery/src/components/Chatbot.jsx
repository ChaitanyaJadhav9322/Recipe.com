import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Draggable from "react-draggable";
import "../App.css";
import { FaPaperPlane, FaRobot, FaTimes } from "react-icons/fa";
import { Container, Row, Col, InputGroup, FormControl, Button } from "react-bootstrap";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  // ⚠️ Direct API key (visible in frontend)
  const API_KEY = "AIzaSyC4jBo27fnBw6ytJ-0N1hwXwModrlJLlig";

  const handleMessageSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
     const response = await axios.post(
  `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
  {
    contents: [
      {
        role: "user",
        parts: [{ text: input }],
      },
    ],
  }
);


      const botReply =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response generated.";

      setMessages((prev) => [...prev, { text: botReply, sender: "bot" }]);
    } catch (error) {
      console.error(error.response?.data || error.message);
      setMessages((prev) => [
        ...prev,
        { text: "❌ API Error. Please try again.", sender: "bot" },
      ]);
    }

    setLoading(false);
  };

  // ✅ Auto-scroll
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      {!isOpen && (
        <Draggable>
          <div className="chatbot-button" onClick={() => setIsOpen(true)}>
            <FaRobot size={30} />
          </div>
        </Draggable>
      )}

      {isOpen && (
        <Draggable handle=".chat-header">
          <div className="chat-container">
            <Container fluid className="chat-box">
              {/* Header */}
              <div className="chat-header">
                <h5>AI Assistant 🤖</h5>
                <button className="close-btn" onClick={() => setIsOpen(false)}>
                  <FaTimes />
                </button>
              </div>

              {/* Messages */}
              <Row className="chat-content">
                <Col className="overflow-auto" ref={chatRef}>
                  {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                      <div className="message-bubble">{msg.text}</div>
                    </div>
                  ))}
                  {loading && (
                    <div className="message bot">
                      <div className="message-bubble">Typing...</div>
                    </div>
                  )}
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
                      disabled={loading}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleMessageSend()
                      }
                    />
                    <Button
                      variant="success"
                      onClick={handleMessageSend}
                      disabled={loading}
                    >
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

export default Chatbot;
