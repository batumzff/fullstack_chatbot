import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { authSchema } from "../../Helpers/formValidation";
import { authFormInputs } from "../../Helpers/formInputs";
import { encryptData } from "../../Helpers/crypto";
import useAxios from "../../custom-hooks/useAxios";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const AuthForm = ({ formType }) => {
  const { axiosPublic } = useAxios();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm({ resolver: yupResolver(authSchema) });

  const onSubmit = async (data) => {
    try {
      const url = formType === "register" ? "users" : "auth/login";
      const userInfo = await axiosPublic.post(url, data);

      // console.log(userInfo);
      const encryptedData = encryptData(userInfo);
      sessionStorage.setItem("user_data", encryptedData);
      navigate("/chat");
    } catch (error) {
      console.error("Error during form submission", error); // Error message here
    }
  };

  // Reset form after a successful submission
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  // Handle navigation for login/register
  const handleNavigate = () => {
    const targetPath = formType === "login" ? "/register" : "/login";
    navigate(targetPath);
  };
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="w-100">
        <Col md={6} lg={4} className="mx-auto">
          <main className="p-4 border rounded shadow-sm bg-light">
            <h2 className="text-center mb-4">
              {formType === "login" ? "Login Form" : "Register Form"}
            </h2>
            <Form onSubmit={handleSubmit(onSubmit)} noValidate>
              {authFormInputs.map((item) => (
                <Form.Group key={item.name} className="mb-3">
                  <Form.Label htmlFor={item.name}>{item.label}</Form.Label>
                  <Form.Control
                    type={item.type}
                    id={item.name}
                    name={item.name}
                    placeholder={item.label}
                    {...register(item.name)}
                    isInvalid={!!errors[item.name]}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors[item.name]?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              ))}
              <Button
                variant="primary"
                type="submit"
                className="w-100"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Submitting..."
                  : formType === "register"
                  ? "Register"
                  : "Login"}
              </Button>

              <div className="text-center mt-3">
                <span>
                  {formType === "login"
                    ? "Don't have an account?"
                    : "Already have an account?"}
                </span>
                <Button
                  variant="link"
                  className="d-inline-block p-0 m-0 align-baseline"
                  onClick={handleNavigate}
                >
                  {formType === "login" ? "Register" : "Login"}
                </Button>
              </div>
            </Form>
          </main>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthForm;
