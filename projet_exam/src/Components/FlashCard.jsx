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

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const Flashcard = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [selectedType, setSelectedType] = useState('hiragana');
    const [animateKey, setAnimateKey] = useState(0);
    const [mode, setMode] = useState('study'); // 'study', 'quiz', ou 'writing'
    const [isRandom, setIsRandom] = useState(false);
    const canvasRef = useRef(null);

    const currentDeck = selectedType === 'hiragana' ? hiragana : katakana;
    const currentCard = currentDeck[currentIndex];

    // Fonction pour gérer les boutons de mode
    const renderModeButtons = () => (
        <div className="flex flex-wrap gap-4 justify-center">
            {['study', 'quiz', 'writing'].map((m) => (
                <button
                    key={m}
                    onClick={() => handleModeChange(m)}
                    className={`px-6 py-2 rounded-lg font-semibold transition ${mode === m ? 'bg-[#2F4858] text-white' : 'bg-white text-[#2F4858] hover:bg-gray-100'
                        }`}
                >
                    {capitalize(m)}
                </button>
            ))}
            <button
                onClick={() => setIsRandom(!isRandom)}
                className={`px-6 py-2 rounded-lg font-semibold transition ${isRandom ? 'bg-[#2F4858] text-white' : 'bg-white text-[#2F4858] hover:bg-gray-100'
                    }`}
            >
                Aléatoire
            </button>
        </div>
    );

    // Fonction pour gérer les boutons de type
    const renderTypeButtons = () => (
        <div className="flex flex-wrap gap-4 justify-center">
            {['hiragana', 'katakana'].map((type) => (
                <button
                    key={type}
                    onClick={() => handleTypeChange(type)}
                    className={`px-6 py-2 rounded-lg font-semibold transition ${selectedType === type ? 'bg-[#2F4858] text-white' : 'bg-white text-[#2F4858] hover:bg-gray-100'
                        }`}
                >
                    {capitalize(type)}
                </button>
            ))}
        </div>
    );

    // Fonction pour changer de mode
    const handleModeChange = (newMode) => {
        setMode(newMode);
        setIsFlipped(false);
        if (newMode === 'writing') clearCanvas();
    };

    // Fonction pour changer de type
    const handleTypeChange = (type) => {
        setSelectedType(type);
        setCurrentIndex(0);
        setIsFlipped(false);
    };

    // Fonction pour capitaliser une chaîne
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    // Fonction pour afficher la carte ou le canvas
    const renderCardOrCanvas = () => {
        if (mode === 'writing') {
            return (
                <div className="flex flex-col items-center gap-4 w-full max-w-xs">
                    <div className="bg-white p-4 rounded-lg shadow-lg w-full">
                        <h3 className="text-xl font-semibold mb-4 text-center">Écrivez : {currentCard.kana}</h3>
                        <div className="relative w-full">
                            <canvas
                                ref={canvasRef}
                                width={300}
                                height={300}
                                className="border border-gray-300 rounded-lg bg-white w-full h-auto touch-none"
                            />
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="perspective-1000 w-80 h-80 max-w-xs max-h-xs">
                <motion.div
                    key={animateKey}
                    className="relative w-full h-full preserve-3d"
                    animate={isFlipped ? 'back' : 'front'}
                    variants={{ front: { rotateY: 0 }, back: { rotateY: 180 } }}
                    transition={{ duration: 0.6 }}
                    onClick={() => setIsFlipped(!isFlipped)}
                >
                    <motion.div
                        className="absolute w-full h-full bg-white border border-gray-300 rounded-lg flex flex-col justify-center items-center backface-hidden shadow-lg"
                        style={{ zIndex: isFlipped ? 1 : 2 }}
                    >
                        <h3 className="text-xl font-semibold mb-4">{selectedType === 'hiragana' ? 'Hiragana' : 'Katakana'}</h3>
                        <p className="text-8xl font-bold text-[#2F4858]">{currentCard.kana}</p>
                    </motion.div>
                    <motion.div
                        className="absolute w-full h-full bg-[#2F4858] text-white border border-[#2F4858] rounded-lg flex flex-col justify-center items-center backface-hidden shadow-lg"
                        style={{ rotateY: 180, zIndex: isFlipped ? 2 : 1 }}
                    >
                        <h3 className="text-xl font-semibold mb-4">Romaji</h3>
                        <p className="text-6xl font-bold">{currentCard.romaji}</p>
                    </motion.div>
                </motion.div>
            </div>
        );
    };

    return (
        <div className="flex flex-col items-center gap-6 p-4">
            {/* Mode et Type */}
            <div className="flex flex-col gap-4 mb-4">
                {renderTypeButtons()}
                {renderModeButtons()}
            </div>
            {/* Carte ou Canvas */}
            {renderCardOrCanvas()}
        </div>
    );
};

export default Flashcard;