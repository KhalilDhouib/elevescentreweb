import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap"
import { Link } from "react-router-dom";
import "./Header.css"

const Header = () => {
    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <strong>Eleves Management System</strong>
                    </Navbar.Brand>
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to="/" className="nav-link">
                            Eleves
                        </Nav.Link>
                        <Nav.Link as={Link} to="/eleves" className="nav-link">
                            Post Eleves
                        </Nav.Link>
                        <NavDropdown title="Niveau" id="niveau-dropdown">
                            <NavDropdown.Item as={Link} to="/septieme">
                                7ème
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/huitieme">
                                8ème
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/niveau/9eme">
                                9ème
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/niveau/1ere">
                                1ère
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/niveau/2eme">
                                2ème
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/niveau/3eme">
                                3ème
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;