import React, { useEffect, useRef, useState } from "react";
import useAxios from "../../custom-hooks/useAxios";
import { getSessionUserData } from "../../Helpers/crypto";
import { useNavigate } from "react-router-dom";
import "./Chat.css";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

const Chat = () => {
  const [questions, setQuestions] = useState([]);
  const [answer, setAnswer] = useState("");
  const [currentQuestionOrder, setCurrentQuestionOrder] = useState(() => {
    // Get last question from sessionStorage
    const storedQuestionOrder = sessionStorage.getItem("lastQuestion");
    return storedQuestionOrder ? JSON.parse(storedQuestionOrder) + 1 : 1;
  });
  // console.log(currentQuestionOrder);
  const [chatHistory, setChatHistory] = useState([]);
  const { axiosWithToken } = useAxios();
  const user = getSessionUserData();
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const timerRef = useRef(null);

  const getQuestions = async () => {
    const { data } = await axiosWithToken("questions"); // for get all questions
    setQuestions(data.data);
    // console.log(data.data);
  };

  const oldQuestion = async () => {
    const data = await axiosWithToken(`chats/${chatId}`);
    // console.log(data);
    setChatHistory(data?.data?.data?.questionAnswer);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e?.preventDefault();

    setCurrentQuestionOrder((prev) => prev + 1);

    const postData = {
      userId: user?.data?.user?._id || user?.data?.data?._id,
      questionAnswer: [{ question: currentQuestion[0].text, answer: answer }],
    };

    try {
      let response;
      if (chatId) {
        response = await axiosWithToken.put("chats", {
          chatId,
          userId: user?.data?.user?._id,
          questionAnswer: [
            { question: currentQuestion[0].text, answer: answer },
          ],
        });
      } else {
        // If no chatId, create a new chat
        response = await axiosWithToken.post("chats", postData);
        chatId = response?.data?.data?._id;
        sessionStorage.setItem("chatId", JSON.stringify(chatId));
      }

      setChatHistory(response?.data?.data?.questionAnswer);
      sessionStorage.setItem(
        "lastQuestion",
        JSON.stringify(currentQuestionOrder)
      );

      // If this was the last question, navigate to home
      if (currentQuestionOrder + 1 > questions.length) {
        sessionStorage.removeItem("chatId");
        sessionStorage.removeItem("lastQuestion");

        timerRef.current = setTimeout(() => {
          navigate("/");
        }, 5000);
      }
    } catch (error) {
      console.error("Error during chat submission:", error);
    }

    setAnswer(""); // Clear answer input
  };

  const handleLogout = async () => {
    const data = await axiosWithToken("auth/logout");
    sessionStorage.clear();
    navigate("/login");
  };

  // Scroll to the bottom whenever chatHistory updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [chatHistory]);

  useEffect(() => {
    getQuestions();
    oldQuestion();
  }, []);

  // Filter out the current question based on order
  const currentQuestion = questions.filter(
    (question) => question.order == currentQuestionOrder
  );

  let chatId = JSON.parse(sessionStorage.getItem("chatId")) || "";

  // console.log(chatHistory);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form from refreshing
      if (answer.trim() !== "") {
        handleSubmit();
      }
    }
  };

  // console.log(user);
  return (
    <section
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh", width: "100%" }}
    >
      <main className="d-flex flex-column justify-content-center w-100 chatbot">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} className="text-center d-flex flex-column">
              <h1>ChatBot</h1>
              <h2>
                Welcome, Dear{" "}
                {user?.data?.user?.username || user?.data?.data?.username}
              </h2>
              <div className="d-flex justify-content-end w-100">
                <Button
                  className="w-25"
                  variant="danger"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            </Col>
          </Row>

          <Row className="justify-content-center mt-4">
            <Col md={8} lg={6}>
              <div className="chat-box">
                {chatHistory?.map((chat, index) => (
                  <Row
                    key={index}
                    className={`chat-message ${chat.sender} mb-2`}
                  >
                    <Col className="text-start">
                      <p className="question">
                        <strong>ChatBot:</strong> {chat.question}
                      </p>
                    </Col>
                    <Col className="text-end">
                      <p className="answer">
                        <strong>
                          {user?.data?.user?.username ||
                            user?.data?.data?.username}
                          :
                        </strong>{" "}
                        {chat.answer}
                      </p>
                    </Col>
                  </Row>
                ))}

                {currentQuestionOrder <= questions.length ? (
                  <div className=" question chat-message bot text-center">
                    <strong>ChatBot:</strong>
                    {currentQuestion[0]?.text}
                  </div>
                ) : (
                  <div className="chat-message bot text-center">
                    Chat Finished. Thank you for your answers!
                  </div>
                )}
                <div ref={messagesEndRef}></div>
              </div>
            </Col>
          </Row>

          {currentQuestionOrder <= questions.length && (
            <Row className="justify-content-center mt-3">
              <Col md={8} lg={6}>
                <Form className="d-flex justify-content-between align-items-center input-button">
                  <Form.Group controlId="userAnswer">
                    <Form.Control
                      style={{
                        width: "320px",
                      }}
                      type="text"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      placeholder="Type your answer here..."
                      autoFocus
                      onKeyDown={handleKeyPress}
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    className=" w-25"
                    onClick={handleSubmit}
                    disabled={answer.trim() === ""}
                  >
                    SEND
                  </Button>
                </Form>
              </Col>
            </Row>
          )}
        </Container>
      </main>
    </section>
  );
};

export default Chat;
