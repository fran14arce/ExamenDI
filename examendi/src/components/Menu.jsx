import React from "react";
import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';
import {PaginasApp} from '../data/PaginasApp';
import { Link } from 'react-router-dom';
import icon from '../assets/images/logo.png';

class Menu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="#home">
                        <img className="icon_menu" src={icon}></img>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            {PaginasApp.map((item) => {
                                return (
                                    <Nav.Link as={Link} to={item.path}>
                                      {item.title}
                                    </Nav.Link>
                                  );
                            })}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default Menu;