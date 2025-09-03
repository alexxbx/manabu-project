// LessonSection.jsx
import React, { useState } from 'react';

function LessonSection({ lessons, onAddLesson, onDeleteLesson, onUpdateLesson }) {
    const [editingLessonId, setEditingLessonId] = useState(null);
    const [formData, setFormData] = useState({});
    const [newLesson, setNewLesson] = useState({ title: '', content: '', level: '' });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleNewLessonChange = (e) => setNewLesson({ ...newLesson, [e.target.name]: e.target.value });

    const addLesson = async () => {
        // Calcul automatique de l'ordre
        const nextOrder = lessons.length ? Math.max(...lessons.map(l => l.position || 0)) + 1 : 1;
        const lessonWithOrder = { ...newLesson, position: nextOrder };
        const success = await onAddLesson(lessonWithOrder);
        if (success) setNewLesson({ title: '', content: '', level: '' });
    };

    const updateLesson = async (lessonId) => {
        const success = await onUpdateLesson(lessonId, formData);
        if (success) { setEditingLessonId(null); setFormData({}); }
    };

    const deleteLesson = async (lessonId) => {
        await onDeleteLesson(lessonId);
    };

    return (
        <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Leçons</h2>

            <div className="bg-white p-4 rounded shadow mb-6">
                <h3 className="font-semibold mb-2">Ajouter une leçon</h3>
                <div className="flex flex-col md:flex-row gap-2">
                    <input
                        name="title"
                        placeholder="Titre"
                        className="border p-2"
                        value={newLesson.title}
                        onChange={handleNewLessonChange}
                    />
                    <input
                        name="content"
                        placeholder="Contenu"
                        className="border p-2"
                        value={newLesson.content}
                        onChange={handleNewLessonChange}
                    />
                    <input
                        name="level"
                        placeholder="Difficulté"
                        className="border p-2"
                        value={newLesson.level}
                        onChange={handleNewLessonChange}
                    />
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={addLesson}
                    >
                        Ajouter
                    </button>
                </div>
            </div>

            <ul className="space-y-4">
                {lessons.length ? lessons.map(lesson => (
                    <li key={lesson.id} className="bg-white shadow p-4 rounded-lg">
                        {editingLessonId === lesson.id ? (
                            <div className="space-y-2">
                                <input
                                    name="title"
                                    className="border p-2 w-full"
                                    defaultValue={lesson.title}
                                    onChange={handleChange}
                                />
                                <textarea
                                    name="content"
                                    className="border p-2 w-full"
                                    defaultValue={lesson.content}
                                    onChange={handleChange}
                                />
                                <input
                                    name="level"
                                    className="border p-2 w-full"
                                    defaultValue={lesson.level}
                                    onChange={handleChange}
                                />
                                <div className="flex gap-2">
                                    <button
                                        className="bg-green-500 text-white px-4 py-2 rounded"
                                        onClick={() => updateLesson(lesson.id)}
                                    >
                                        Valider
                                    </button>
                                    <button
                                        className="bg-gray-400 text-white px-4 py-2 rounded"
                                        onClick={() => setEditingLessonId(null)}
                                    >
                                        Annuler
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <p className="text-lg font-semibold">{lesson.title}</p>
                                <p className="text-sm text-gray-600 mb-2">Difficulté : {lesson.level}</p>
                                <p>{lesson.content}</p>
                                <div className="flex gap-2 mt-2">
                                    <button
                                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                                        onClick={() => setEditingLessonId(lesson.id)}
                                    >
                                        Modifier
                                    </button>
                                    <button
                                        className="bg-red-600 text-white px-3 py-1 rounded"
                                        onClick={() => deleteLesson(lesson.id)}
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            </div>
                        )}
                    </li>
                )) : (
                    <li className="bg-white shadow p-4 rounded-lg text-center text-gray-500">
                        Aucune leçon trouvée
                    </li>
                )}
            </ul>
        </section>
    );
}
export default LessonSection;