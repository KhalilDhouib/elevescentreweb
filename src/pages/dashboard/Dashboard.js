import { useEffect, useState } from "react";
import { Container, Row, Col, Table, Card, Button, Badge, InputGroup, Form } from "react-bootstrap";
import { Search, Plus, Edit, Trash2, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
    const [eleves, setEleves] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredEleves, setFilteredEleves] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchEleves = async () => {
            try {
                const response = await fetch("http://localhost:8090/api/eleves");
                const data = await response.json();
                setEleves(data);
                setFilteredEleves(data);
            } catch(error) {
                console.error("Error fetching eleves:", error.message);
            }
        };
        fetchEleves();
    }, []);

    // Filtrage des élèves
    useEffect(() => {
        const filtered = eleves.filter(eleve =>
            eleve.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            eleve.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            eleve.niveau.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredEleves(filtered);
    }, [searchTerm, eleves]);

    const handleDelete = async (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cet élève ?")) {
            try {
                await fetch(`http://localhost:8090/api/eleves/${id}`, {
                    method: 'DELETE'
                });
                setEleves(eleves.filter(eleve => eleve.id !== id));
            } catch (error) {
                console.error("Error deleting eleve:", error);
            }
        }
    };

    const handleUpdate = (eleve) => {
        // Naviguer vers PostUser avec les données de l'élève en paramètre
        navigate("/eleves", { 
            state: { 
                isEditing: true,
                eleveData: eleve 
            } 
        });
    };

    const handleAddNew = () => {
        navigate("/eleves", { 
            state: { 
                isEditing: false,
                eleveData: null 
            } 
        });
    };

    return (
        <div className="dashboard-container">
            {/* Header avec statistiques */}
            <Container fluid className="dashboard-header">
    <Row className="align-items-center py-4">
        <Col>
            <div className="d-flex align-items-center">
                <div className="header-logo-container me-3">
                    <img 
                        src="/images/racine.png" 
                        alt="Logo Élèves" 
                        className="header-logo"
                    />
                </div>
                <div>
                    <h1 className="dashboard-title">Gestion des Élèves</h1>
                    <p className="dashboard-subtitle">Gérez efficacement vos élèves</p>
                </div>
            </div>
        </Col>
        
        {/* Boutons des niveaux */}
        <Col xs="auto">
            <div className="level-buttons-container">
                <div className="level-buttons-row">
                    <Button variant="outline-light" className="level-button" size="sm">
                        7ème
                    </Button>
                    <Button variant="outline-light" className="level-button" size="sm">
                        8ème
                    </Button>
                    <Button variant="outline-light" className="level-button" size="sm">
                        9ème
                    </Button>
                </div>
                <div className="level-buttons-row">
                    <Button variant="outline-light" className="level-button" size="sm">
                        1ère
                    </Button>
                    <Button variant="outline-light" className="level-button" size="sm">
                        2ème
                    </Button>
                    <Button variant="outline-light" className="level-button" size="sm">
                        3ème
                    </Button>
                </div>
            </div>
        </Col>
        
        <Col xs="auto">
            <Button variant="primary" className="add-button" onClick={handleAddNew}>
                <Plus size={20} className="me-2" />
                Nouvel Élève
            </Button>
        </Col>
    </Row>
</Container>

            {/* Carte de statistique unique */}
            <Container className="mt-4">
                <Row className="g-4 mb-4">
                    <Col md={4} className="mx-auto">
                        <Card className="stat-card">
                            <Card.Body className="text-center">
                                <Users size={32} className="stat-icon text-primary mb-3" />
                                <h2 className="stat-number">{eleves.length}</h2>
                                <p className="stat-label">Total Élèves</p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Barre de recherche et filtres */}
                <Card className="search-card mb-4">
                    <Card.Body>
                        <Row className="align-items-center">
                            <Col md={8}>
                                <InputGroup>
                                    <InputGroup.Text>
                                        <Search size={18} />
                                    </InputGroup.Text>
                                    <Form.Control
                                        type="text"
                                        placeholder="Rechercher un élève par nom, email ou niveau..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="search-input"
                                    />
                                </InputGroup>
                            </Col>
                            <Col md={4} className="text-end">
                                <div className="filter-buttons">
                                    <Badge bg="light" text="dark" className="me-2 filter-badge">
                                        Tous: {eleves.length}
                                    </Badge>
                                    <Badge bg="primary" text="white" className="filter-badge">
                                        Filtrés: {filteredEleves.length}
                                    </Badge>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

                {/* Tableau des élèves */}
                <Card className="table-card">
                    <Card.Header className="table-header">
                        <h5 className="mb-0">
                            <Users size={20} className="me-2" />
                            Liste des Élèves
                        </h5>
                    </Card.Header>
                    <Card.Body className="p-0">
                        <div className="table-responsive">
                            <Table hover className="mb-0">
                                <thead className="table-dark">
                                    <tr>
                                        <th className="ps-4">Élève</th>
                                        <th>Contact</th>
                                        <th>Téléphone</th>
                                        <th>Niveau</th>
                                        <th className="text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredEleves.map(eleve => (
                                        <tr key={eleve.id} className="table-row">
                                            <td className="ps-4">
                                                <div className="d-flex align-items-center">
                                                    <div className="avatar-circle me-3">
                                                        {eleve.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <div className="student-name">{eleve.name}</div>
                                                        <small className="text-muted">ID: {eleve.id}</small>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="contact-info">
                                                    {eleve.email}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="phone-info">
                                                    {eleve.phone}
                                                </div>
                                            </td>
                                            <td>
                                                <Badge bg="secondary" className="niveau-badge">
                                                    {eleve.niveau}
                                                </Badge>
                                            </td>
                                            <td className="text-center">
                                                <Button 
                                                    variant="outline-primary" 
                                                    size="sm" 
                                                    className="me-2 action-btn"
                                                    title="Modifier"
                                                    onClick={() => handleUpdate(eleve)}
                                                >
                                                    <Edit size={16} />
                                                </Button>
                                                <Button 
                                                    variant="outline-danger" 
                                                    size="sm"
                                                    className="action-btn"
                                                    onClick={() => handleDelete(eleve.id)}
                                                    title="Supprimer"
                                                >
                                                    <Trash2 size={16} />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                        
                        {filteredEleves.length === 0 && (
                            <div className="text-center py-5 empty-state">
                                <Users size={48} className="text-muted mb-3" />
                                <h5>Aucun élève trouvé</h5>
                                <p className="text-muted">
                                    {searchTerm ? "Aucun résultat pour votre recherche." : "Commencez par ajouter votre premier élève."}
                                </p>
                                <Button variant="primary" onClick={handleAddNew}>
                                    <Plus size={16} className="me-2" />
                                    Ajouter un élève
                                </Button>
                            </div>
                        )}
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}

export default Dashboard;