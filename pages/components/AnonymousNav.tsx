import React from "react";
import Image from "next/image"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar";
import AppName from "./AppName";

export default function AnonymousNav() {
    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="/">
                    <img
                        src="/img/Nav-Logo.png"
                        alt="Gameswithdeath Logo"
                        height={30}
                        width={30}
                        className="d-inline-block align-top"
                    />{' '}
                    <AppName />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <Nav.Link href="/">Sign In</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}