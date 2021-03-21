import { useUser } from "@auth0/nextjs-auth0";
import React from "react";
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar";
import { constants } from "../pages/util/constants";

function NavBrand() {
    return (
        <>
            <Navbar.Brand href="/">
                <img
                    src="/img/Nav-Logo.png"
                    alt="Logo"
                    height={30}
                    width={30}
                    className="d-inline-block align-top"
                />{' '}
                {constants.appName}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </>
    )
}

export default function AnonymousNav() {
    const { user, error, isLoading } = useUser();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    if (user) {
        return (
            <>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <NavBrand />
                    <Navbar.Collapse className="justify-content-end">
                        Welcome {user.name}
                        <Nav>
                            <Nav.Link href="/api/auth/logout">Sign Out</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </>
        )
    }

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <NavBrand />
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <Nav.Link href="/api/auth/login">Sign In</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}
