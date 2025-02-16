import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

function AnalysesLive() {
    const [emotionData, setEmotionData] = useState([]);
    const [emojis, setEmojis] = useState([]); // Emojis flottants
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [isRecording, setIsRecording] = useState(false);
    let intervalId = useRef(null);

    useEffect(() => {
        const startVideo = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                videoRef.current.srcObject = stream;
            } catch (error) {
                console.error("Erreur d'accès à la caméra:", error);
            }
        };
        startVideo();

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const tracks = videoRef.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            }
            clearInterval(intervalId.current);
        };
    }, []);

    const captureFrame = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas) return null;
        const context = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL('image/jpeg');
    };

    const analyzeEmotion = async () => {
        const image = captureFrame();
        if (!image) return;
        const formData = new FormData();
        formData.append('image', dataURItoBlob(image));

        try {
            const response = await axios.post('http://localhost:5000/analyseslive', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const newEmotionData = response.data;
            setEmotionData(newEmotionData);

            // Ajouter un emoji correspondant SEULEMENT si l'émotion détectée change
            if (newEmotionData.length > 0) {
                const detectedEmotion = newEmotionData[0].emotion;
                const emoji = getEmoji(detectedEmotion);

                // Mettre à jour uniquement les emojis correspondant à l'émotion détectée
                setEmojis((prevEmojis) => [
                    ...prevEmojis,
                    { emoji, id: Date.now(), emotion: detectedEmotion },
                ]);
            }
        } catch (error) {
            console.error("Erreur lors de l'analyse de l'émotion:", error);
        }
    };

    const dataURItoBlob = (dataURI) => {
        const byteString = atob(dataURI.split(',')[1]);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: 'image/jpeg' });
    };

    const toggleRecording = () => {
        if (isRecording) {
            clearInterval(intervalId.current);
            setIsRecording(false);

            // Arrêter l'animation des emojis
            setEmojis([]);
        } else {
            setIsRecording(true);
            intervalId.current = setInterval(analyzeEmotion, 500); // Détection rapide
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Analyse des émotions en temps réel</h1>
            <div style={styles.videoContainer}>
                <video ref={videoRef} autoPlay style={styles.video} />
                <canvas ref={canvasRef} style={{ display: 'none' }} />
            </div>
            <button
                onClick={toggleRecording}
                style={isRecording ? { ...styles.button, ...styles.buttonActive } : styles.button}
            >
                {isRecording ? 'Arrêter' : 'Démarrer'}
            </button>

            {/* Résultats */}
            <div style={styles.resultContainer}>
                {emotionData.length > 0 && (
                    <div style={styles.emotionResult}>
                        <span style={styles.emoji}>{getEmoji(emotionData[0].emotion)}</span>
                        <strong>{translateEmo(emotionData[0].emotion)}</strong>: {emotionData[0].score.toFixed(2)}%
                    </div>
                )}
            </div>

            {/* Animation des emojis */}
            <div style={styles.emojiAnimationContainer}>
                {emojis.map((emojiObj) => (
                    <span
                        key={emojiObj.id}
                        className="floating-emoji"
                        style={{
                            ...styles.floatingEmoji,
                            left: `${Math.random() * 90}%`,
                        }}
                    >
                        {emojiObj.emoji}
                    </span>
                ))}
            </div>
        </div>
    );
}

const getEmoji = (emotion) => {
    switch (emotion) {
        case 'happy': return '😊';
        case 'sad': return '😢';
        case 'angry': return '😡';
        case 'surprised': return '😲';
        case 'neutral': return '😐';
        default: return '🤔';
    }
};

const translateEmo = (emotion) => {
    switch (emotion) {
        case 'happy': return 'Heureux';
        case 'sad': return 'Triste';
        case 'angry': return 'Énervé';
        case 'surprised': return 'Surpris';
        case 'neutral': return 'Neutre';
        default: return 'Neutre';
    }
};

const styles = {
    container: {
        fontFamily: 'Helvetica, Arial, sans-serif',
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#f4f4f4',
        color: '#333',
        paddingTop: '90px',
        minHeight: '100vh',
        overflow: 'hidden',
        position: 'relative',
    },
    title: {
        fontSize: '28px',
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: '20px',
    },
    videoContainer: {
        border: '5px solid #2c3e50',
        borderRadius: '10px',
        overflow: 'hidden',
        width: '700px',
        height: '380px',

        margin: 'auto',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    },
    video: {
        width: '700px',
        height: 'auto',
    },
    button: {
        marginTop: '20px',
        padding: '15px 30px',
        fontSize: '18px',
        color: '#fff',
        backgroundColor: '#2c3e50',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background 0.3s ease',
    },
    buttonActive: {
        backgroundColor: '#e74c3c',
    },
    resultContainer: {
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#ecf0f1',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        width: '700px',
        margin: '20px auto',
    },
    emotionResult: {
        fontSize: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    emoji: {
        fontSize: '36px',
        marginRight: '10px',
    },
    emojiAnimationContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden',
    },
    floatingEmoji: {
        position: 'absolute',
        bottom: '-50px',
        animation: 'float 3s linear infinite',
        fontSize: '30px',
    },
};

/* Animation CSS */
const animationCSS = `
@keyframes float {
    0% {
        transform: translateY(0) scale(1);
        opacity: 1;
    }
    100% {
        transform: translateY(-100vh) scale(0.6);
        opacity: 0;
    }
}
.floating-emoji {
    animation: float 3s linear infinite;
}
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = animationCSS;
document.head.appendChild(styleSheet);

export default AnalysesLive;
