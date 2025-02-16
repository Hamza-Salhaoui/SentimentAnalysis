import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const Analyses = () => {
  const [text, setText] = useState("");
  const [sentiment, setSentiment] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef(null);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      recognitionRef.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognitionRef.current.continuous = false;
      recognitionRef.current.lang = "fr-FR";
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event) => {
        const spokenText = event.results[0][0].transcript;
        setTranscript(spokenText);
        setText(spokenText);
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Erreur de reconnaissance vocale :", event.error);
      };
    }
  }, []);

  const handleAnalyze = async () => {
    if (!text) return;
    setLoading(true);
    setError(null);
    setIsListening(false);
    try {
      const response = await axios.post("http://localhost:5000/analyses", { text });
      setSentiment(response.data);
    } catch (err) {
      setError("Erreur lors de l'analyse");
    } finally {
      setLoading(false);
    }
  };

  const handleSpeech = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Analyse des Sentiments</h2>
      <p style={styles.description}>
        Saisissez un texte ou utilisez la reconnaissance vocale pour analyser le sentiment.
      </p>

      <textarea
        style={styles.textarea}
        placeholder="Entrez le texte à analyser"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div style={styles.buttonContainer}>
        <button style={isListening ? styles.buttonActive : styles.button} onClick={handleSpeech}>
          {isListening ? "🎤 Écoute en cours..." : "🎙️ Activer la Voix"}
        </button>

        <button style={styles.button} onClick={handleAnalyze} disabled={loading}>
          {loading ? "⏳ Analyse..." : "🔍 Analyser"}
        </button>
      </div>

      {transcript && <p style={styles.transcript}>🎙️ Transcription : {transcript}</p>}
      {error && <p style={styles.error}>{error}</p>}

      {sentiment && (
        <div style={{ ...styles.result, backgroundColor: getSentimentColor(sentiment.label) }}>
          <h3>
            Sentiment détecté : <span>{sentiment.label}</span>
          </h3>
          <p>Confiance : <strong>{(sentiment.score * 100).toFixed(2)}%</strong></p>
        </div>
      )}
    </div>
  );
};

// Fonction pour changer la couleur du résultat en fonction du sentiment
const getSentimentColor = (label) => {
  switch (label.toLowerCase()) {
    case "positive":
      return "#4CAF50"; // Vert
    case "negative":
      return "#E53935"; // Rouge
    case "neutral":
      return "#FFC107"; // Jaune
    default:
      return "#2196F3"; // Bleu
  }
};

// Styles CSS en objet
const styles = {
  container: {
    maxWidth: "600px",

    margin: "50px auto",
      marginTop:"200px",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    backgroundColor: "#ffffff",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "20px",
  },
  textarea: {
    width: "100%",
    height: "100px",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
    resize: "none",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px",
  },
  button: {
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    backgroundColor: "#007BFF",
    color: "white",
    transition: "0.3s",
  },
  buttonActive: {
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    backgroundColor: "#28a745",
    color: "white",
    transition: "0.3s",
  },
  transcript: {
    marginTop: "10px",
    fontSize: "14px",
    fontStyle: "italic",
    color: "#555",
  },
  error: {
    marginTop: "10px",
    color: "#E53935",
    fontWeight: "bold",
  },
  result: {
    marginTop: "20px",
    padding: "15px",
    borderRadius: "5px",
    color: "white",
    fontWeight: "bold",
  },
};

export default Analyses;
