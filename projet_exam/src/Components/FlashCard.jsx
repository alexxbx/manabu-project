import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import React from 'react';

const hiragana = [
    { kana: 'あ', romaji: 'a' }, { kana: 'い', romaji: 'i' }, { kana: 'う', romaji: 'u' },
    { kana: 'え', romaji: 'e' }, { kana: 'お', romaji: 'o' }, { kana: 'か', romaji: 'ka' },
    { kana: 'き', romaji: 'ki' }, { kana: 'く', romaji: 'ku' }, { kana: 'け', romaji: 'ke' },
    { kana: 'こ', romaji: 'ko' }, { kana: 'さ', romaji: 'sa' }, { kana: 'し', romaji: 'shi' },
    { kana: 'す', romaji: 'su' }, { kana: 'せ', romaji: 'se' }, { kana: 'そ', romaji: 'so' },
    { kana: 'た', romaji: 'ta' }, { kana: 'ち', romaji: 'chi' }, { kana: 'つ', romaji: 'tsu' },
    { kana: 'て', romaji: 'te' }, { kana: 'と', romaji: 'to' }, { kana: 'な', romaji: 'na' },
    { kana: 'に', romaji: 'ni' }, { kana: 'ぬ', romaji: 'nu' }, { kana: 'ね', romaji: 'ne' },
    { kana: 'の', romaji: 'no' }, { kana: 'は', romaji: 'ha' }, { kana: 'ひ', romaji: 'hi' },
    { kana: 'ふ', romaji: 'fu' }, { kana: 'へ', romaji: 'he' }, { kana: 'ほ', romaji: 'ho' },
    { kana: 'ま', romaji: 'ma' }, { kana: 'み', romaji: 'mi' }, { kana: 'む', romaji: 'mu' },
    { kana: 'め', romaji: 'me' }, { kana: 'も', romaji: 'mo' }, { kana: 'や', romaji: 'ya' },
    { kana: 'ゆ', romaji: 'yu' }, { kana: 'よ', romaji: 'yo' }, { kana: 'ら', romaji: 'ra' },
    { kana: 'り', romaji: 'ri' }, { kana: 'る', romaji: 'ru' }, { kana: 'れ', romaji: 're' },
    { kana: 'ろ', romaji: 'ro' }, { kana: 'わ', romaji: 'wa' }, { kana: 'を', romaji: 'wo' },
    { kana: 'ん', romaji: 'n' }
];

const katakana = [
    { kana: 'ア', romaji: 'a' }, { kana: 'イ', romaji: 'i' }, { kana: 'ウ', romaji: 'u' },
    { kana: 'エ', romaji: 'e' }, { kana: 'オ', romaji: 'o' }, { kana: 'カ', romaji: 'ka' },
    { kana: 'キ', romaji: 'ki' }, { kana: 'ク', romaji: 'ku' }, { kana: 'ケ', romaji: 'ke' },
    { kana: 'コ', romaji: 'ko' }, { kana: 'サ', romaji: 'sa' }, { kana: 'シ', romaji: 'shi' },
    { kana: 'ス', romaji: 'su' }, { kana: 'セ', romaji: 'se' }, { kana: 'ソ', romaji: 'so' },
    { kana: 'タ', romaji: 'ta' }, { kana: 'チ', romaji: 'chi' }, { kana: 'ツ', romaji: 'tsu' },
    { kana: 'テ', romaji: 'te' }, { kana: 'ト', romaji: 'to' }, { kana: 'ナ', romaji: 'na' },
    { kana: 'ニ', romaji: 'ni' }, { kana: 'ヌ', romaji: 'nu' }, { kana: 'ネ', romaji: 'ne' },
    { kana: 'ノ', romaji: 'no' }, { kana: 'ハ', romaji: 'ha' }, { kana: 'ヒ', romaji: 'hi' },
    { kana: 'フ', romaji: 'fu' }, { kana: 'ヘ', romaji: 'he' }, { kana: 'ホ', romaji: 'ho' },
    { kana: 'マ', romaji: 'ma' }, { kana: 'ミ', romaji: 'mi' }, { kana: 'ム', romaji: 'mu' },
    { kana: 'メ', romaji: 'me' }, { kana: 'モ', romaji: 'mo' }, { kana: 'ヤ', romaji: 'ya' },
    { kana: 'ユ', romaji: 'yu' }, { kana: 'ヨ', romaji: 'yo' }, { kana: 'ラ', romaji: 'ra' },
    { kana: 'リ', romaji: 'ri' }, { kana: 'ル', romaji: 'ru' }, { kana: 'レ', romaji: 're' },
    { kana: 'ロ', romaji: 'ro' }, { kana: 'ワ', romaji: 'wa' }, { kana: 'ヲ', romaji: 'wo' },
    { kana: 'ン', romaji: 'n' }
];

const Flashcard = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [selectedType, setSelectedType] = useState('hiragana');
    const [animateKey, setAnimateKey] = useState(0);
    const [mode, setMode] = useState('study'); // 'study', 'quiz', ou 'writing'
    const [isRandom, setIsRandom] = useState(false);
    const [stats, setStats] = useState({ correct: 0, incorrect: 0, total: 0 });
    const [progress, setProgress] = useState({ hiragana: {}, katakana: {} });
    const [quizOptions, setQuizOptions] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [isDrawing, setIsDrawing] = useState(false);
    const canvasRef = useRef(null);

    const currentDeck = selectedType === 'hiragana' ? hiragana : katakana;
    const currentCard = currentDeck[currentIndex];

    // Canvas configuration
    useEffect(() => {
        if (mode === 'writing' && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.strokeStyle = '#2F4858';
            ctx.lineWidth = 8;

            ctx.font = `${canvas.width * 0.6}px sans-serif`;
            ctx.fillStyle = 'rgba(0,0,0,0.1)';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(currentCard.kana, canvas.width / 2, canvas.height / 2);
        }
    }, [mode, currentCard.kana]);

    // Drawing functions
    const getPos = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        if (e.touches) {
            return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
        } else {
            return { x: e.clientX - rect.left, y: e.clientY - rect.top };
        }
    };

    const startDrawing = (e) => {
        if (!canvasRef.current) return;
        const { x, y } = getPos(e);
        const ctx = canvasRef.current.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(x, y);
        setIsDrawing(true);
    };

    const draw = (e) => {
        if (!isDrawing || !canvasRef.current) return;
        const { x, y } = getPos(e);
        const ctx = canvasRef.current.getContext('2d');
        ctx.lineTo(x, y);
        ctx.stroke();
    };

    const stopDrawing = () => setIsDrawing(false);

    const clearCanvas = () => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = `${canvas.width * 0.6}px sans-serif`;
        ctx.fillStyle = 'rgba(0,0,0,0.1)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(currentCard.kana, canvas.width / 2, canvas.height / 2);
    };

    // Touch drawing handlers
    const startTouchDrawing = (e) => { e.preventDefault(); startDrawing(e); };
    const touchDraw = (e) => { e.preventDefault(); draw(e); };
    const stopTouchDrawing = (e) => { e.preventDefault(); stopDrawing(e); };

    // Quiz options
    useEffect(() => {
        if (mode === 'quiz') {
            const correctAnswer = currentCard.romaji;
            const otherOptions = currentDeck
                .filter(c => c.romaji !== correctAnswer)
                .sort(() => Math.random() - 0.5)
                .slice(0, 3)
                .map(c => c.romaji);
            setQuizOptions([...otherOptions, correctAnswer].sort(() => Math.random() - 0.5));
        }
    }, [currentIndex, selectedType, mode]);

    const handleNext = () => {
        const nextIndex = isRandom ? Math.floor(Math.random() * currentDeck.length) : (currentIndex + 1) % currentDeck.length;
        setIsFlipped(false);
        setAnimateKey(animateKey + 1);
        setCurrentIndex(nextIndex);
        setSelectedAnswer(null);
        setShowResult(false);
        if (mode === 'writing') clearCanvas();
    };

    const handlePrevious = () => {
        const prevIndex = isRandom ? Math.floor(Math.random() * currentDeck.length) : (currentIndex - 1 + currentDeck.length) % currentDeck.length;
        setIsFlipped(false);
        setAnimateKey(animateKey + 1);
        setCurrentIndex(prevIndex);
        setSelectedAnswer(null);
        setShowResult(false);
        if (mode === 'writing') clearCanvas();
    };

    const handleFlip = () => { if (mode === 'study') setIsFlipped(!isFlipped); };

    const handleQuizAnswer = (answer) => {
        if (selectedAnswer !== null) return;
        const isCorrect = answer === currentCard.romaji;
        setSelectedAnswer(answer);
        setShowResult(true);

        setStats(prev => ({
            ...prev,
            correct: isCorrect ? prev.correct + 1 : prev.correct,
            incorrect: !isCorrect ? prev.incorrect + 1 : prev.incorrect,
            total: prev.total + 1
        }));

        setProgress(prev => ({
            ...prev,
            [selectedType]: {
                ...prev[selectedType],
                [currentCard.kana]: {
                    ...prev[selectedType]?.[currentCard.kana],
                    correct: isCorrect ? (prev[selectedType]?.[currentCard.kana]?.correct || 0) + 1 : (prev[selectedType]?.[currentCard.kana]?.correct || 0),
                    total: (prev[selectedType]?.[currentCard.kana]?.total || 0) + 1
                }
            }
        }));

        setTimeout(() => { handleNext(); }, 1500);
    };

    return (
        <div className="flex flex-col items-center gap-6 p-4">
            {/* Mode et Type */}
            <div className="flex flex-col gap-4 mb-4">
                <div className="flex flex-wrap gap-4 justify-center">
                    <button
                        onClick={() => { setSelectedType('hiragana'); setCurrentIndex(0); setIsFlipped(false); }}
                        className={`px-6 py-2 rounded-lg font-semibold transition ${selectedType === 'hiragana' ? 'bg-[#2F4858] text-white' : 'bg-white text-[#2F4858] hover:bg-gray-100'}`}
                    >Hiragana</button>
                    <button
                        onClick={() => { setSelectedType('katakana'); setCurrentIndex(0); setIsFlipped(false); }}
                        className={`px-6 py-2 rounded-lg font-semibold transition ${selectedType === 'katakana' ? 'bg-[#2F4858] text-white' : 'bg-white text-[#2F4858] hover:bg-gray-100'}`}
                    >Katakana</button>
                </div>
                <div className="flex flex-wrap gap-4 justify-center">
                    <button onClick={() => { setMode('study'); setSelectedAnswer(null); setShowResult(false); }}
                        className={`px-6 py-2 rounded-lg font-semibold transition ${mode === 'study' ? 'bg-[#2F4858] text-white' : 'bg-white text-[#2F4858] hover:bg-gray-100'}`}>Étude</button>
                    <button onClick={() => { setMode('quiz'); setSelectedAnswer(null); setShowResult(false); }}
                        className={`px-6 py-2 rounded-lg font-semibold transition ${mode === 'quiz' ? 'bg-[#2F4858] text-white' : 'bg-white text-[#2F4858] hover:bg-gray-100'}`}>Quiz</button>
                    <button onClick={() => { setMode('writing'); clearCanvas(); }}
                        className={`px-6 py-2 rounded-lg font-semibold transition ${mode === 'writing' ? 'bg-[#2F4858] text-white' : 'bg-white text-[#2F4858] hover:bg-gray-100'}`}>Écriture</button>
                    <button onClick={() => setIsRandom(!isRandom)}
                        className={`px-6 py-2 rounded-lg font-semibold transition ${isRandom ? 'bg-[#2F4858] text-white' : 'bg-white text-[#2F4858] hover:bg-gray-100'}`}>Aléatoire</button>
                </div>
            </div>

            {/* Carte ou Canvas */}
            {mode === 'writing' ? (
                <div className="flex flex-col items-center gap-4 w-full max-w-xs">
                    <div className="bg-white p-4 rounded-lg shadow-lg w-full">
                        <h3 className="text-xl font-semibold mb-4 text-center">Écrivez : {currentCard.kana}</h3>
                        <div className="relative w-full">
                            <canvas
                                ref={canvasRef}
                                width={Math.min(300, window.innerWidth * 0.8)}
                                height={Math.min(300, window.innerWidth * 0.8)}
                                className="border border-gray-300 rounded-lg bg-white w-full h-auto touch-none"
                                onMouseDown={startDrawing}
                                onMouseMove={draw}
                                onMouseUp={stopDrawing}
                                onMouseLeave={stopDrawing}
                                onTouchStart={startTouchDrawing}
                                onTouchMove={touchDraw}
                                onTouchEnd={stopTouchDrawing}
                                onTouchCancel={stopTouchDrawing}
                            />
                        </div>
                    </div>
                    <div className="flex gap-4 flex-wrap justify-center">
                        <button onClick={clearCanvas} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition">Effacer</button>
                        <button onClick={() => { clearCanvas(); handleNext(); }} className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition">Suivant</button>
                    </div>
                </div>
            ) : (
                <>
                    <div className="perspective-1000 w-80 h-80 max-w-xs max-h-xs">
                        <motion.div
                            key={animateKey}
                            className="relative w-full h-full preserve-3d"
                            animate={isFlipped ? 'back' : 'front'}
                            variants={{ front: { rotateY: 0 }, back: { rotateY: 180 } }}
                            transition={{ duration: 0.6 }}
                            onClick={handleFlip}
                            initial={{ opacity: 1 }}
                        >
                            <motion.div
                                className="absolute w-full h-full bg-white border border-gray-300 rounded-lg flex flex-col justify-center items-center backface-hidden shadow-lg"
                                style={{ zIndex: isFlipped ? 1 : 2, opacity: 1 }}
                            >
                                <h3 className="text-xl font-semibold mb-4">{selectedType === 'hiragana' ? 'Hiragana' : 'Katakana'}</h3>
                                <p className="text-8xl font-bold text-[#2F4858]">{currentCard.kana}</p>
                            </motion.div>
                            <motion.div
                                className="absolute w-full h-full bg-[#2F4858] text-white border border-[#2F4858] rounded-lg flex flex-col justify-center items-center backface-hidden shadow-lg"
                                style={{ rotateY: 180, zIndex: isFlipped ? 2 : 1, opacity: 1 }}
                            >
                                <h3 className="text-xl font-semibold mb-4">Romaji</h3>
                                <p className="text-6xl font-bold">{currentCard.romaji}</p>
                            </motion.div>
                        </motion.div>
                    </div>

                    {mode === 'quiz' && (
                        <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                            {quizOptions.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleQuizAnswer(option)}
                                    className={`px-4 py-2 rounded-lg font-semibold transition ${
                                        selectedAnswer === option
                                            ? option === currentCard.romaji
                                                ? 'bg-green-500 text-white'
                                                : 'bg-red-500 text-white'
                                            : 'bg-white border border-gray-300 hover:bg-gray-100'
                                    }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    )}
                </>
            )}

            {/* Navigation */}
            {mode !== 'writing' && (
                <div className="flex gap-4 flex-wrap justify-center mt-4">
                    <button onClick={handlePrevious} className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-lg transition">Précédent</button>
                    <button onClick={handleNext} className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-lg transition">Suivant</button>
                </div>
            )}

            {/* Stats */}
            {mode === 'quiz' && (
                <div className="mt-4 text-center">
                    <p>Correct : {stats.correct} | Incorrect : {stats.incorrect} | Total : {stats.total}</p>
                </div>
            )}
        </div>
    );
};

export default Flashcard;
