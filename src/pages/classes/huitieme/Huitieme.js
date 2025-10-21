import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Dropdown, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Huitieme.css';

const Huitieme = () => {
    const [matieres, setMatieres] = useState([
        {
            id: 1,
            titre: "Physique",
            description: "Découvrez les lois fondamentales de la physique et explorez les phénomènes naturels",
            icon: "⚛️",
            couleur: "primary",
        },
        {
            id: 2,
            titre: "Mathématiques",
            description: "Maîtrisez les concepts mathématiques et développez votre raisonnement logique",
            icon: "🔢",
            couleur: "success",
        },
        {
            id: 3,
            titre: "Informatique",
            description: "Apprenez la programmation et les technologies numériques modernes",
            icon: "💻",
            couleur: "info",
        },
        {
            id: 4,
            titre: "Technique",
            description: "Explorez les principes techniques et le génie technologique",
            icon: "🔧",
            couleur: "warning",
        }
    ]);

    const [showModal, setShowModal] = useState(false);
    const [nouvelleMatiere, setNouvelleMatiere] = useState({
        titre: '',
        description: '',
        icon: '📚',
        couleur: 'primary'
    });

    const supprimerMatiere = (id) => {
        setMatieres(matieres.filter(matiere => matiere.id !== id));
    };

    const ajouterMatiere = () => {
        if (nouvelleMatiere.titre.trim() === '') return;
        
        const nouvelleMatiereObj = {
            ...nouvelleMatiere,
            id: Date.now()
        };

        setMatieres([...matieres, nouvelleMatiereObj]);
        setNouvelleMatiere({
            titre: '',
            description: '',
            icon: '📚',
            couleur: 'primary'
        });
        setShowModal(false);
    };

    const iconsDisponibles = [
        { emoji: "⚛️", nom: "Physique" },
        { emoji: "🔢", nom: "Maths" },
        { emoji: "💻", nom: "Informatique" },
        { emoji: "🔧", nom: "Technique" },
        { emoji: "📚", nom: "Livre" },
        { emoji: "🎯", nom: "Cible" },
        { emoji: "🌟", nom: "Étoile" },
        { emoji: "🔬", nom: "Science" },
        { emoji: "📊", nom: "Graphique" },
        { emoji: "💡", nom: "Idée" }
    ];

    const couleursDisponibles = [
        { valeur: "primary", nom: "Bleu" },
        { valeur: "success", nom: "Vert" },
        { valeur: "info", nom: "Cyan" },
        { valeur: "warning", nom: "Orange" },
        { valeur: "danger", nom: "Rouge" },
        { valeur: "secondary", nom: "Gris" }
    ];

    return (
        <div className="huitieme-wrapper">
            <Container fluid className="huitieme-container">
                {/* En-tête de la page */}
                <Row className="text-center mb-5">
                    <Col>
                        <h1 className="page-title">Classe de 8ème</h1>
                        <p className="page-subtitle">Gérez les matières de la classe de huitième</p>
                    </Col>
                </Row>

                {/* Bouton d'ajout */}
                <Row className="mb-4">
                    <Col className="text-end">
                        <Button 
                            variant="light" 
                            className="add-btn"
                            onClick={() => setShowModal(true)}
                        >
                            <span className="add-icon">+</span>
                            Ajouter une matière
                        </Button>
                    </Col>
                </Row>

                {/* Grille des cartes de matières */}
                <Row className="g-4 justify-content-center">
                    {matieres.map((matiere) => (
                        <Col key={matiere.id} xs={12} sm={6} lg={3}>
                            <Card className={`matiere-card matiere-${matiere.couleur} h-100`}>
                                {/* Bouton de suppression */}
                                <div className="delete-btn-container">
                                    <Button 
                                        variant="danger" 
                                        size="sm" 
                                        className="delete-btn"
                                        onClick={() => supprimerMatiere(matiere.id)}
                                    >
                                        ×
                                    </Button>
                                </div>
                                
                                <Card.Body className="text-center">
                                    <div className="matiere-icon">
                                        {matiere.icon}
                                    </div>
                                    <Card.Title className="matiere-title">
                                        {matiere.titre}
                                    </Card.Title>
                                    <Card.Text className="matiere-description">
                                        {matiere.description}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer className="bg-transparent border-0">
                                    <Dropdown>
                                        <Dropdown.Toggle 
                                            variant={matiere.couleur} 
                                            className="w-100 matiere-dropdown"
                                        >
                                            Actions
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className="w-100">
                                            <Dropdown.Item as={Link} to={`/huitieme/${matiere.titre.toLowerCase()}/cours`}>
                                                📖 Cours
                                            </Dropdown.Item>
                                            <Dropdown.Item as={Link} to={`/huitieme/${matiere.titre.toLowerCase()}/devoirs`}>
                                                📝 Devoirs
                                            </Dropdown.Item>
                                            <Dropdown.Item as={Link} to={`/huitieme/${matiere.titre.toLowerCase()}/exercices`}>
                                                💪 Exercices
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))}
                </Row>

                {/* Modal d'ajout de matière */}
                <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                    <Modal.Header closeButton className="modal-header-custom">
                        <Modal.Title>Ajouter une nouvelle matière</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="modal-body-custom">
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Nom de la matière</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ex: Sciences"
                                    value={nouvelleMatiere.titre}
                                    onChange={(e) => setNouvelleMatiere({...nouvelleMatiere, titre: e.target.value})}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Description de la matière..."
                                    value={nouvelleMatiere.description}
                                    onChange={(e) => setNouvelleMatiere({...nouvelleMatiere, description: e.target.value})}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Icône</Form.Label>
                                <div className="icons-grid">
                                    {iconsDisponibles.map((icon, index) => (
                                        <div
                                            key={index}
                                            className={`icon-option ${nouvelleMatiere.icon === icon.emoji ? 'selected' : ''}`}
                                            onClick={() => setNouvelleMatiere({...nouvelleMatiere, icon: icon.emoji})}
                                        >
                                            {icon.emoji}
                                        </div>
                                    ))}
                                </div>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Couleur</Form.Label>
                                <div className="colors-grid">
                                    {couleursDisponibles.map((couleur, index) => (
                                        <div
                                            key={index}
                                            className={`color-option ${couleur.valeur} ${nouvelleMatiere.couleur === couleur.valeur ? 'selected' : ''}`}
                                            onClick={() => setNouvelleMatiere({...nouvelleMatiere, couleur: couleur.valeur})}
                                        >
                                            {couleur.nom}
                                        </div>
                                    ))}
                                </div>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer className="modal-footer-custom">
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Annuler
                        </Button>
                        <Button variant="primary" onClick={ajouterMatiere}>
                            Ajouter la matière
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    );
};

export default Huitieme;