import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
export default function Header() {
  return (
    <Navbar className="w-100" bg="dark">
      <Container>
        <Navbar.Brand className="text-white">Test Assignment</Navbar.Brand>
      </Container>
    </Navbar>
  );
}
