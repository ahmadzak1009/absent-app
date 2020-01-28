import React, { useState, useGlobal } from "reactn";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import axios from "axios";

const Login = props => {
  const [value, setValue] = useGlobal();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async e => {
    e.preventDefault();

    const response = await axios.post("/auth/login", { email, password });
    const data = await response.data;
    if (!data.token) return window.alert(data);

    setValue(v => ({
      user: data.user
    }));
    localStorage.setItem("token", data.token);
    localStorage.setItem("id", data.id);
    props.history.push("/dashboard");
  };

  return (
    <>
      <Container fluid="true" className="bg-dark" style={{ height: "100vh" }}>
        <Row className="h-100 mx-4">
          <Col md={4} className="m-auto bg-light p-3 rounded">
            <h4 className="text-center mb-3">Login</h4>
            <Form>
              <Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={e => setEmail(e.target.value)}
                  value={email}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={e => setPassword(e.target.value)}
                  value={password}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="float-right" onClick={onSubmit}>
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
