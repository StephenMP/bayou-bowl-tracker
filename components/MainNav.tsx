import { useUser } from "@auth0/nextjs-auth0";
import React from "react";
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown"
import { constants } from "../util/constants";
import Link from 'next/link'

function NavBrand() {
    return (
        <>
            <Link href="/" passHref>
                <Navbar.Brand>
                    <img
                        src="/img/Nav-Logo.png"
                        alt="Logo"
                        height={30}
                        width={30}
                        className="d-inline-block align-top"
                    />{' '}
                    {constants.appName}
                </Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </>
    )
}

function NavLinks() {
    return (
        <>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Link href="/" passHref><Nav.Link href="/">Home</Nav.Link></Link>
                    <Link href="/events" passHref><Nav.Link>Events</Nav.Link></Link>
                    <NavDropdown title="Info" id="info-nav-dropdown">
                        <Link href="/info/about" passHref><NavDropdown.Item href="#">About</NavDropdown.Item></Link>
                        <Link href="/info/news" passHref><NavDropdown.Item href="#">News</NavDropdown.Item></Link>
                        <Link href="/info/partners" passHref><NavDropdown.Item href="#">Partners</NavDropdown.Item></Link>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
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
                    <NavLinks />
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
                <NavLinks />
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <Nav.Link href="/api/auth/login">Sign In</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}
