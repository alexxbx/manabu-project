import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

function LessonQuiz() {
    const { id: lessonId } = useParams();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();

    const [exercises, setExercises] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [score, setScore] = useState(0);
    const [animateKey, setAnimateKey] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
    const [lessonContent, setLessonContent] = useState("");
    const [showGrammar, setShowGrammar] = useState(true);
    const [feedback, setFeedback] = useState("");
    const [timer, setTimer] = useState(20);
    const [timerActive, setTimerActive] = useState(false);

    useEffect(() => {
        const fetchExercises = async () => {
            if (!token || !userId) {
                navigate('/login');
                return;
            }

            try {
                const res = await axios.get('https://manabu-app.fr/api/exercises', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const allExercises = res.data['hydra:member'] || res.data;
                const filtered = (allExercises.member || []).filter((ex) => {
                    const lessonRef = typeof ex.lesson === 'string' ? ex.lesson : ex.lesson?.['@id'];
                    return lessonRef === `/api/lessons/${lessonId}`;
                });

                setExercises(filtered);
                if (filtered.length === 0) {
                    setError("Aucun exercice pour cette leçon.");
                }
            } catch (err) {
                setError("Erreur lors du chargement des exercices.");
            } finally {
                setLoading(false);
            }
        };

        fetchExercises();
    }, [lessonId, token, userId, navigate]);

    useEffect(() => {
        const fetchLessonContent = async () => {
            try {
                const res = await axios.get(`https://manabu-app.fr/api/lessons/${lessonId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setLessonContent(res.data.content || "");
            } catch (err) {
                setLessonContent("Erreur lors du chargement du cours de grammaire.");
            }
        };
        if (lessonId && token) {
            fetchLessonContent();
        }
    }, [lessonId, token]);

    useEffect(() => {
        if (showResult && exercises.length > 0) {

            const saveProgression = async () => {
                try {
                    const userId = localStorage.getItem('userId');

                    // Appeler le backend pour compléter la leçon
                    const completeRes = await axios.post(
                        `https://manabu-app.fr/api/lessons/${lessonId}/complete`,
                        {},
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                'Content-Type': 'application/ld+json',
                            },
                        }
                    );

                    // Récupérer les leçons débloquées après mise à jour
                    const lessonsRes = await axios.get(
                        `https://manabu-app.fr/api/user/${userId}/lessons-unlocked`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    // Redirection vers la page des leçons
                    navigate('/lessons');

                } catch (err) {
                    console.error('Erreur lors de l\'enregistrement de la progression :', err);
                    console.error('Détails :', err.response?.data);
                    setError('Erreur lors de l’enregistrement de votre progression.');
                }
            };


            saveProgression();
        }
    }, [showResult]);

    useEffect(() => {
        setSelectedAnswer(null);
        setIsAnswerCorrect(null);
    }, [currentIndex]);

    // Timer effect
    useEffect(() => {
        if (!showGrammar && !showResult && selectedAnswer === null) {
            setTimer(20);
            setTimerActive(true);
        } else {
            setTimerActive(false);
        }
    }, [currentIndex, showGrammar, showResult, selectedAnswer]);

    useEffect(() => {
        if (!timerActive) return;
        if (timer <= 0) {
            setSelectedAnswer("__timeout__");
            setIsAnswerCorrect(false);
            setFeedback(`Temps écoulé ! La bonne réponse était : ${exercises[currentIndex]?.answer}`);
            setTimerActive(false);
            setTimeout(() => {
                setFeedback("");
                const nextIndex = currentIndex + 1;
                if (nextIndex < exercises.length) {
                    setAnimateKey(animateKey + 1);
                    setCurrentIndex(nextIndex);
                } else {
                    setShowResult(true);
                }
            }, 1800);
            return;
        }
        const interval = setInterval(() => {
            setTimer((t) => t - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timerActive, timer, currentIndex, exercises, animateKey, showResult]);

    const handleAnswer = async (choice) => {
        if (selectedAnswer !== null) return;
        const current = exercises[currentIndex];
        const isCorrect = choice === current.answer;
        if (isCorrect) setScore(score + 1);

        setSelectedAnswer(choice);
        setIsAnswerCorrect(isCorrect);
        setFeedback(isCorrect ? "Bonne réponse !" : `Mauvaise réponse. La bonne réponse était : ${current.answer}`);
        setTimerActive(false);

        setTimeout(() => {
            setFeedback("");
            const nextIndex = currentIndex + 1;
            if (nextIndex < exercises.length) {
                setAnimateKey(animateKey + 1);
                setCurrentIndex(nextIndex);
            } else {
                setShowResult(true);
            }
        }, 1800);
    };

    if (loading) return <div className="p-6 text-center">Chargement...</div>;
    if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
    if (!exercises.length) return null;

    const current = exercises[currentIndex];

    return (
        <div className="min-h-screen bg-[#F4E1C1] flex flex-col items-center justify-center p-6">
            {showGrammar && (
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-xl text-center mb-8">
                    <h2 className="text-2xl font-bold mb-4">Cours de grammaire</h2>
                    <div className="text-gray-700 whitespace-pre-line mb-6">{lessonContent}</div>
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
                        onClick={() => setShowGrammar(false)}
                    >
                        Commencer le quiz
                    </button>
                </div>
            )}
            {!showGrammar && (
                <AnimatePresence mode="wait">
                    {!showResult ? (
                        <motion.div
                            key={animateKey}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white p-8 rounded-lg shadow-md w-full max-w-xl text-center"
                        >
                            {!showResult && !showGrammar && (
                                <div className="mb-4 flex justify-center items-center">
                                    <span className={`text-lg font-bold ${timer <= 5 ? 'text-red-600' : 'text-gray-800'}`}>⏰ {timer}s</span>
                                </div>
                            )}
                            {current.cours && (
                                <div className="mb-4 p-4 bg-blue-50 border-l-4 border-blue-400 text-left text-blue-900 rounded">
                                    <span className="font-semibold">Explication :</span> {current.cours}
                                </div>
                            )}
                            <h2 className="text-2xl font-bold mb-4">{current.question}</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {current.options.map((option, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleAnswer(option)}
                                        disabled={selectedAnswer !== null}
                                        className={`py-3 px-6 rounded-lg transition font-semibold ${selectedAnswer === option
                                            ? isAnswerCorrect
                                                ? 'bg-green-500 text-white'
                                                : 'bg-red-500 text-white'
                                            : 'bg-[#2F4858] hover:bg-[#1F3342] text-white'}`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                            {selectedAnswer !== null && (
                                <div className={`mt-6 font-semibold ${isAnswerCorrect ? 'text-green-600' : 'text-red-600'}`}>{feedback}</div>
                            )}
                            <p className="mt-6 text-gray-600">
                                Question {currentIndex + 1} sur {exercises.length}
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white p-8 rounded-lg shadow-md text-center w-full max-w-xl"
                        >
                            <h2 className="text-2xl font-bold mb-4">Quiz terminé !</h2>
                            <p className="text-xl mb-6">Score : {score} / {exercises.length}</p>
                            <button
                                onClick={() => navigate('/lessons')}
                                className="bg-[#F26419] hover:bg-[#E15500] text-white font-semibold py-3 px-6 rounded-lg transition"
                            >
                                Retour aux leçons
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            )}
        </div>
    );
}

export default LessonQuiz;
