import "./PostUser.css";
import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate, useLocation } from "react-router-dom";

const PostUser = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        niveau: ""
    });
    
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    // Récupérer les données de navigation
    useEffect(() => {
        if (location.state) {
            const { isEditing, eleveData } = location.state;
            setIsEditing(isEditing);
            
            if (isEditing && eleveData) {
                setFormData({
                    name: eleveData.name || "",
                    email: eleveData.email || "",
                    phone: eleveData.phone || "",
                    niveau: eleveData.niveau || ""
                });
                setCurrentId(eleveData.id);
            } else {
                // Réinitialiser le formulaire pour une nouvelle création
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    niveau: ""
                });
                setCurrentId(null);
            }
        }
    }, [location.state]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        try {
            if (isEditing && currentId) {
                // Mise à jour d'un élève existant
                const response = await fetch(`http://localhost:8090/api/eleves/${currentId}`, {
                    method: "PUT",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify(formData)
                });

                if (!response.ok) {
                    throw new Error("Erreur lors de la mise à jour");
                }

                const data = await response.json();
                console.log("Élève mis à jour: ", data);
            } else {
                // Création d'un nouvel élève
                const response = await fetch("http://localhost:8090/api/eleves", {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();
                console.log("Élève créé: ", data);
            }
            
            navigate("/");
        } catch (error) {
            console.log("Erreur: ", error.message);
        }
    };

    return (
        <>
            <div className="center-form">
                <h1>{isEditing ? "Modifier l'Élève" : "Ajouter un Nouvel Élève"}</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicName" className="mb-3">
                        <Form.Control 
                            type="text"
                            name="name"
                            placeholder="Entrez le nom"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail" className="mb-3">
                        <Form.Control 
                            type="email"
                            name="email"
                            placeholder="Entrez l'email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPhone" className="mb-3">
                        <Form.Control 
                            type="text"
                            name="phone"
                            placeholder="Entrez le téléphone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicNiveau" className="mb-3">
                        <Form.Control 
                            type="text"
                            name="niveau"
                            placeholder="Entrez le niveau"
                            value={formData.niveau}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <Button 
                            variant="secondary" 
                            className="me-md-2"
                            onClick={() => navigate("/")}
                        >
                            Annuler
                        </Button>
                        <Button variant="primary" type="submit">
                            {isEditing ? "Modifier l'Élève" : "Ajouter l'Élève"}
                        </Button>
                    </div>
                </Form>
            </div>
        </>
    );
};

export default PostUser;