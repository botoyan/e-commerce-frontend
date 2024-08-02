import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

function PopUp({ show, handleClose }) {
  const REGEX_EMAIL =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [variant, setVariant] = useState("primary");
  const [email, setEmail] = useState("");
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{ textAlign: "center" }}>
          Reset Password
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              style={{ fontSize: "13px !important" }}
              placeholder="Email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
        </Form>
        {REGEX_EMAIL.test(email) || email.length === 0 ? (
          ""
        ) : (
          <Alert variant="danger">Please provide a valid email address!</Alert>
        )}
        {variant === "danger" ? (
          <Alert variant="success">Please check your email!</Alert>
        ) : (
          ""
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant={variant}
          onClick={() => {
            setVariant("danger");
            setTimeout(() => {
              setVariant("primary");
            }, 30000);
            if (variant === "danger") {
              return;
            }
          }}
        >
          {variant === "danger"
            ? `You can resend the code after 30 seconds`
            : "Send me the verification code"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PopUp;
