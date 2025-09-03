import React, { useState } from 'react';

function ExerciseSection({ exercises, lessons, onAddExercise, onDeleteExercise, onUpdateExercise }) {
    const [editingExerciseId, setEditingExerciseId] = useState(null);
    const [formData, setFormData] = useState({});
    const [newExercise, setNewExercise] = useState({
        question: '',
        type: 'qcm',
        options: '',
        answer: '',
        lesson: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNewExerciseChange = (e) => {
        setNewExercise({ ...newExercise, [e.target.name]: e.target.value });
    };

    const handleAddExercise = async () => {
        const payload = {
            ...newExercise,
            options: newExercise.options
                .split("\n") // coupe par ligne
                .map(opt => opt.trim()) // supprime les espaces
                .filter(opt => opt !== ""), // enlève les vides
            lesson: newExercise.lesson ? `/api/lessons/${newExercise.lesson}` : null,
        };

        const success = await onAddExercise(payload);
        if (success) {
            setNewExercise({ question: '', type: 'qcm', options: '', answer: '', lesson: '' });
        }
    };

    // Suppression corrigée
    const handleDelete = (exercise) => {
        if (!exercise || !exercise['@id']) {
            console.error("Exercice invalide :", exercise);
            return;
        }
        onDeleteExercise(exercise);
    };

    const handleUpdateExercise = async (exerciseUri) => {
        if (!exerciseUri) return console.error("URI de l'exercice manquante !");

        const payload = {
            ...formData,
            ...(formData.options
                ? { options: formData.options.split("\n").map(opt => opt.trim()).filter(opt => opt !== "") }
                : {}
            ),
            ...(formData.lesson ? { lesson: `/api/lessons/${formData.lesson}` } : {}),
            ...(formData.cours !== undefined ? { cours: formData.cours } : {})
        };

        const success = await onUpdateExercise(exerciseUri, payload);
        if (success) {
            setEditingExerciseId(null);
            setFormData({});
        }
    };




    return (
        <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Exercices</h2>

            <div className="bg-white p-4 rounded shadow mb-6">
                <h3 className="font-semibold mb-2">Ajouter un exercice</h3>
                <div className="flex flex-col gap-2">
                    <input
                        name="question"
                        className="border p-2"
                        placeholder="Question"
                        value={newExercise.question}
                        onChange={handleNewExerciseChange}
                    />
                    <select
                        name="type"
                        className="border p-2"
                        value={newExercise.type}
                        onChange={handleNewExerciseChange}
                    >
                        <option value="qcm">QCM</option>
                        <option value="texte">Texte libre</option>
                    </select>
                    <textarea
                        name="options"
                        className="border p-2"
                        placeholder="Options (une par ligne pour QCM)"
                        value={newExercise.options}
                        onChange={handleNewExerciseChange}
                        rows="4"
                    />
                    <input
                        name="answer"
                        className="border p-2"
                        placeholder="Réponse"
                        value={newExercise.answer}
                        onChange={handleNewExerciseChange}
                    />
                    <select
                        name="lesson"
                        className="border p-2"
                        value={newExercise.lesson}
                        onChange={handleNewExerciseChange}
                    >
                        <option value="">Sélectionner une leçon</option>
                        {Array.isArray(lessons) && lessons.map(lesson => (
                            <option key={lesson.id} value={lesson.id}>
                                {lesson.title}
                            </option>
                        ))}
                    </select>
                    <textarea
                        name="cours"
                        className="border p-2"
                        placeholder="Explication / Cours (optionnel)"
                        value={newExercise.cours || ""}
                        onChange={handleNewExerciseChange}
                        rows="3"
                    />
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={handleAddExercise}
                    >
                        Ajouter
                    </button>
                </div>
            </div>

            <ul className="space-y-4">
                {Array.isArray(exercises) && exercises.length > 0 ? (
                    exercises.map(exercise => (
                        <li key={exercise['@id']} className="bg-white shadow p-4 rounded-lg">
                            {editingExerciseId === exercise['@id'] ? (
                                <div className="space-y-2">
                                    <input
                                        name="question"
                                        className="border p-2 w-full"
                                        defaultValue={exercise.question}
                                        onChange={handleChange}
                                    />
                                    <select
                                        name="type"
                                        className="border p-2 w-full"
                                        defaultValue={exercise.type}
                                        onChange={handleChange}
                                    >
                                        <option value="qcm">QCM</option>
                                        <option value="texte">Texte libre</option>
                                    </select>
                                    <textarea
                                        name="options"
                                        className="border p-2 w-full"
                                        defaultValue={Array.isArray(exercise.options) ? exercise.options.join("\n") : ""}
                                        onChange={handleChange}
                                        rows="4"
                                    />
                                    <input
                                        name="answer"
                                        className="border p-2 w-full"
                                        defaultValue={exercise.answer}
                                        onChange={handleChange}
                                    />
                                    <select
                                        name="lesson"
                                        className="border p-2 w-full"
                                        defaultValue={exercise.lesson?.id || ''}
                                        onChange={handleChange}
                                    >
                                        <option value="">Sélectionner une leçon</option>
                                        {Array.isArray(lessons) && lessons.map(lesson => (
                                            <option key={lesson.id} value={lesson.id}>{lesson.title}</option>
                                        ))}
                                    </select>
                                    <textarea
                                        name="cours"
                                        className="border p-2 w-full"
                                        defaultValue={exercise.cours || ''}
                                        onChange={handleChange}
                                        rows="3"
                                        placeholder="Explication / Cours (optionnel)"
                                    />
                                    <div className="flex gap-2">
                                        <button
                                            className="bg-green-500 text-white px-4 py-2 rounded"
                                            onClick={() => handleUpdateExercise(exercise['@id'])}
                                        >
                                            Valider
                                        </button>
                                        <button
                                            className="bg-gray-400 text-white px-4 py-2 rounded"
                                            onClick={() => setEditingExerciseId(null)}
                                        >
                                            Annuler
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                    <div>
                                        <h3 className="font-semibold">{exercise.question}</h3>
                                        <p className="text-gray-600 mt-2">Type: {exercise.type}</p>
                                        <p className="text-sm text-gray-500 mt-2">
                                            Options: {Array.isArray(exercise.options) ? exercise.options.join(", ") : ""}
                                        </p>
                                        <p className="text-sm text-gray-500">Réponse: {exercise.answer}</p>
                                        <p className="text-sm text-gray-500">Leçon: {exercise.lesson?.title || 'Non assignée'}</p>
                                        <p className="text-sm text-gray-500">Explication: {exercise.cours || ''}</p>
                                    </div>
                                    <div className="flex gap-2 mt-2 md:mt-0">
                                        <button
                                            className="bg-yellow-500 text-white px-3 py-1 rounded"
                                            onClick={() => setEditingExerciseId(exercise['@id'])}
                                        >
                                            Modifier
                                        </button>
                                        <button
                                            className="bg-red-600 text-white px-3 py-1 rounded"
                                            onClick={() => handleDelete(exercise)}
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                </div>
                            )}

                        </li>
                    ))
                ) : (
                    <li className="bg-white shadow p-4 rounded-lg text-center text-gray-500">
                        Aucun exercice trouvé
                    </li>
                )}
            </ul>
        </section>
    );
}

export default ExerciseSection;
