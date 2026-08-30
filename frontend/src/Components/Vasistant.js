import React, { useState, useEffect, useRef  } from 'react';
import './V.css';

const Vasistant = () => {
    const [isListening, setIsListening] = useState(false);
    const [transcription, setTranscription] = useState('');
    const [voiceNote, setVoiceNote] = useState(null);
    const [savedTranscriptions, setSavedTranscriptions] = useState([]);
    const [statusMessage, setStatusMessage] = useState('');

    const recognitionRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            setStatusMessage("Speech Recognition is not supported in this browser.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;

        recognition.onstart = () => {
            setIsListening(true);
            setStatusMessage('');
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setTranscription(transcript);
        };

        recognitionRef.current = recognition;
    }, []);

    const handleMicClick = async () => {
        if (!isListening) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                audioChunksRef.current = [];
                mediaRecorderRef.current = new MediaRecorder(stream);

                mediaRecorderRef.current.ondataavailable = (e) => {
                    audioChunksRef.current.push(e.data);
                };

                mediaRecorderRef.current.onstop = () => {
                    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                    const audioURL = URL.createObjectURL(audioBlob);
                    setVoiceNote(audioURL);

                    if (transcription) {
                        setSavedTranscriptions(prev => [...prev, { transcription, voiceNote: audioURL }]);
                        setStatusMessage('Transcription and voice note saved successfully.');
                    } else {
                        setStatusMessage('No transcription to save.');
                    }
                };

                mediaRecorderRef.current.start();
                recognitionRef.current.start();
            } catch (error) {
                setStatusMessage('Microphone access denied.');
            }
        } else {
            recognitionRef.current.stop();
            mediaRecorderRef.current.stop();
            setIsListening(false);
        }
    };

    const handleClearClick = () => {
        setTranscription('');
        setVoiceNote(null);
        setStatusMessage('Transcription and voice note cleared.');
    };

    const handleSendClick = async () => {
        try {
            await fetch(process.env.REACT_APP_API_URL + '/saveTranscription', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ transcription }),
            });
            setStatusMessage('Transcription sent successfully.');
        } catch (error) {
            console.error('Error sending transcription:', error);
            setStatusMessage('Error sending transcription. Please try again.');
        }
    };

    return (
        <section className="vassistant-container">
            <div className="checkContainer">
                <div className="mic-container">
                    <div className="mic-icon" onClick={handleMicClick}>
                        {isListening ? '🛑' : '🎙️'}
                    </div>
                </div>

                <div className="transcription-container">
                    <h3 className="h2-mulish">Need Help?</h3>
                    <h4 className="h3-mulish">Get Your Voice Assistance Here</h4>
                    <h5 className="h4-mulish">Click and Speak, and You Will Get Every Access About Our App</h5>

                    {transcription && <div className="transcription-text">{transcription}</div>}

                    {voiceNote && (
                        <audio controls>
                            <source src={voiceNote} type="audio/wav" />
                        </audio>
                    )}

                    {statusMessage && <div className="status-message">{statusMessage}</div>}

                    {transcription && (
                        <div className="icon-container">
                            <div className="send-icon" onClick={handleSendClick}>📤</div>
                            <div className="clear-icon" onClick={handleClearClick}>🗑️</div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Vasistant;