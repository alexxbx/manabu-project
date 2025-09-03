import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
function ExerciseForm({ token, onExerciseAdded }) {
    const [exercise, setExercise] = useState({
        question: '',
        type: 'qcm',
        options: ['', '', '', ''],
        answer: '',
        cours: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExercise({ ...exercise, [name]: value });
    };

    const handleOptionChange = (index, value) => {
        const newOptions = [...exercise.options];
        newOptions[index] = value;
        setExercise({ ...exercise, options: newOptions });
    };
    const [lessons, setLessons] = useState([]);
    const [selectedLesson, setSelectedLesson] = useState('');


    // Dans le useEffect (version robuste)
    useEffect(() => {
        if (token) {
            axios.get('https://manabu-app.fr/api/lessons', {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(res => {

                    // Extraction correcte des leçons
                    const lessonsData = res.data?.member || [];
                    setLessons(lessonsData);
                })
                .catch(err => {
                    console.error("Erreur API :", err.response?.data || err.message);
                    setError("Impossible de charger les leçons");
                });
        }
    }, [token]);



    const handleSubmit = async (e) => {
        e.preventDefault();

        // Vérification que l'utilisateur a choisi une leçon
        if (!selectedLesson) {
            setError("Veuillez sélectionner une leçon avant de créer l'exercice.");
            return;
        }

        // On nettoie les options pour enlever les vides
        const optionsArray = exercise.options
            .map(opt => opt.trim())
            .filter(opt => opt);

        const payload = {
            question: exercise.question,
            type: exercise.type,
            options: optionsArray,
            answer: exercise.answer,
            cours: exercise.cours || null,
            lesson: `/api/lessons/${selectedLesson}`
        };

        try {
            await axios.post("https://manabu-app.fr/api/exercises", payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/ld+json"
                }
            });

            setExercise({
                question: "",
                type: "qcm",
                options: ["", "", "", ""],
                answer: "",
                cours: ""
            });
            setSelectedLesson("");
            setError("");
            if (onExerciseAdded) onExerciseAdded();
        } catch (err) {
            console.error("Erreur API :", err.response?.data || err.message);
            setError("Erreur lors de l'ajout de l'exercice.");
        }
    };


    return (

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4">

            <h2 className="text-xl font-semibold">Ajouter un exercice</h2>

            {error && <p className="text-red-600">{error}</p>}

            <div>
                <label className="block text-sm font-medium">Leçon liée : </label>

                <select
                    value={selectedLesson}
                    onChange={(e) => setSelectedLesson(e.target.value)}
                    className="w-full border p-2 rounded mt-1" // Ajoutez des styles si nécessaire
                >
                    <option value="">-- Sélectionner une leçon --</option>
                    {lessons.length > 0 ? (
                        lessons.map((lesson) => (
                            <option key={lesson.id} value={lesson.id}>
                                {lesson.id} - {lesson.title}
                            </option>
                        ))
                    ) : (
                        <option disabled>Aucune leçon disponible</option>
                    )}
                </select>
            </div>


            <div>
                <label className="block text-sm font-medium">Question :</label>
                <input
                    type="text"
                    name="question"
                    value={exercise.question}
                    onChange={handleChange}
                    required
                    className="w-full border p-2 rounded mt-1"
                />
            </div>

            <div>
                <label className="block text-sm font-medium">Type :</label>
                <select
                    name="type"
                    value={exercise.type}
                    onChange={handleChange}
                    className="w-full border p-2 rounded mt-1"
                >
                    <option value="qcm">QCM</option>
                    <option value="texte_a_trous">Texte à trous</option>
                    <option value="glisser_deposer">Glisser-déposer</option>
                </select>
            </div>

            {(exercise.type === 'qcm' || exercise.type === 'glisser_deposer') && (
                <div>
                    <label className="block text-sm font-medium mb-1">Options :</label>
                    <div className="space-y-2">
                        {exercise.options.map((opt, i) => (
                            <input
                                key={i}
                                type="text"
                                value={opt}
                                onChange={(e) => handleOptionChange(i, e.target.value)}
                                placeholder={`Option ${i + 1}`}
                                required
                                className="w-full border p-2 rounded"
                            />
                        ))}
                    </div>
                </div>
            )}

            <div>
                <label className="block text-sm font-medium">Réponse correcte :</label>
                <input
                    type="text"
                    name="answer"
                    value={exercise.answer}
                    onChange={handleChange}
                    required
                    className="w-full border p-2 rounded mt-1"
                />
            </div>

            <div>
                <label className="block text-sm font-medium">Explication / Cours (optionnel) :</label>
                <textarea
                    name="cours"
                    value={exercise.cours}
                    onChange={handleChange}
                    className="w-full border p-2 rounded mt-1"
                    placeholder="Ajoutez ici une explication, un rappel de grammaire, etc."
                    rows={3}
                />
            </div>

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
                Créer l'exercice
            </button>


        </form>
    );
}
export default ExerciseForm;
