import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Card, Spin, Typography, Button } from "antd";
import ReactECharts from "echarts-for-react";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

function Statistics() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();  // Utilisation de useNavigate pour rediriger

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const response = await axios.get("http://localhost:5000/statistics");
                setStats(response.data);
            } catch (error) {
                setError("Erreur lors de la récupération des statistiques.");
            } finally {
                setLoading(false);
            }
        };

        fetchStatistics();
    }, []);

    const handleRedirectToUpload = () => {
        navigate('/upload');  // Redirection vers la page de téléchargement
    };

    if (loading) {
        return (
            <div style={{ textAlign: "center", marginTop: "100px" }}>
                <Spin size="large" />
            </div>
        );
    }

    if (error) {
        return (
            <p style={{ color: "red", textAlign: "center", marginTop: "50px" }}>
                {error}
            </p>
        );
    }

    if (!stats) {
        return (
            <div style={{ textAlign: "center", marginTop: "100px" }}>
                <Title level={3}>Aucun fichier téléchargé.</Title>
                <Button type="primary" onClick={handleRedirectToUpload}>
                    Télécharger un fichier
                </Button>
            </div>
        );
    }

    // Préparer les options pour les graphiques
    const ratingChartOptions = {
        title: {
            text: "Répartition des évaluations",
            left: "center",
        },
        xAxis: {
            type: "category",
            data: Object.keys(stats.rating_distribution),
            name: "Notes",
        },
        yAxis: {
            type: "value",
            name: "Nombre d'avis",
        },
        series: [
            {
                data: Object.values(stats.rating_distribution),
                type: "bar",
                color: "#4e73df",
            },
        ],
    };

    const productChartOptions = {
        title: {
            text: "Avis par produit",
            left: "center",
        },
        tooltip: {
            trigger: "axis",
        },
        xAxis: {
            type: "category",
            data: Object.keys(stats.product_reviews),
            name: "Produits",
            axisLabel: {
                rotate: 90,
            },
        },
        yAxis: {
            type: "value",
            name: "Nombre d'avis",
        },
        series: [
            {
                data: Object.values(stats.product_reviews),
                type: "line",
                smooth: true,
                color: "#36b9cc",
            },
        ],
    };

    const regionChartOptions = {
        title: {
            text: "Avis par région",
            left: "center",
        },
        xAxis: {
            type: "category",
            data: Object.keys(stats.region_reviews),
            name: "Régions",
            axisLabel: {
                rotate: 90,
            },
        },
        yAxis: {
            type: "value",
            name: "Nombre d'avis",
        },
        series: [
            {
                data: Object.values(stats.region_reviews),
                type: "bar",
                color: "#f6c23e",
            },
        ],
    };





    return (
        <div style={{ padding: "30px", paddingTop: "100px", minHeight: "100vh" }}>
            <Title level={2} style={{ textAlign: "center", marginBottom: "50px" }}>
                Statistiques des Avis
            </Title>

            <Row gutter={[16, 16]} justify="center">
                {/* Première rangée : Répartition des évaluations + Avis par région */}
                <Col xs={24} sm={24} md={12} lg={12}>
                    <Card title="Répartition des évaluations" bordered style={{ height: "450px", width: "700px" }}>
                        <ReactECharts option={ratingChartOptions} style={{ height: "400px", width: "650px" }} />
                    </Card>
                </Col>

                <Col xs={24} sm={24} md={12} lg={12}>
                    <Card title="Avis par région" bordered style={{ height: "450px", width: "700px" }}>
                        <ReactECharts option={regionChartOptions} style={{ height: "380px", width: "650px" }} />
                    </Card>
                </Col>

                {/* Deuxième rangée : Avis par produit (pleine largeur) */}
                <Col xs={24} sm={24} md={24} lg={24}>
                    <Card title="Avis par produit" bordered style={{ width: "1500px", height: "600px" }}>
                        <ReactECharts
                            option={productChartOptions}
                            style={{ width: "1400px", height: "400px" }}
                        />
                    </Card>
                </Col>

            </Row>
        </div>
    );
}

export default Statistics;