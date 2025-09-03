import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Achievements = ({ userId }) => {
    const [achievements, setAchievements] = useState({ unlocked: [], locked: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!userId) {
            setLoading(false);
            return;
        }

        const fetchAchievements = async () => {
            try {
                const token = localStorage.getItem('token');

                const response = await axios.get(`https://manabu-app.fr/api/user/${userId}/achievements`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.data) {
                    console.error('Pas de données dans la réponse');
                    setError('Pas de données reçues');
                    setLoading(false);
                    return;
                }

                if (!response.data.unlocked || !response.data.locked) {
                    console.error('Format de données invalide:', response.data);
                    setError('Format de données invalide');
                    setLoading(false);
                    return;
                }

                setAchievements(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Erreur détaillée:', err);
                console.error('Message d\'erreur:', err.message);
                console.error('Réponse d\'erreur:', err.response);
                setError(`Erreur lors du chargement des succès: ${err.message}`);
                setLoading(false);
            }
        };

        fetchAchievements();
    }, [userId]);

    if (loading) return <div>Chargement des succès...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Succès</h2>
            <div className="space-y-4">
                {achievements.unlocked && achievements.unlocked.length > 0 ? (
                    achievements.unlocked.map((achievement) => (
                        <div
                            key={achievement.id}
                            className="p-4 rounded-lg border bg-green-50 border-green-200"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl">{achievement.icon}</span>
                                        <h3 className="font-semibold">{achievement.title}</h3>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Débloqué le {new Date(achievement.unlockedAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="text-green-600 text-2xl">🏆</div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">Aucun succès débloqué</p>
                )}

                {achievements.locked && achievements.locked.length > 0 ? (
                    achievements.locked.map((achievement) => (
                        <div
                            key={achievement.id}
                            className="p-4 rounded-lg border bg-gray-50 border-gray-200"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl opacity-50">{achievement.icon}</span>
                                        <h3 className="font-semibold opacity-50">{achievement.title}</h3>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1 opacity-50">{achievement.description}</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {achievement.requiredLessons} leçons requises
                                    </p>
                                </div>
                                <div className="text-gray-400 text-2xl">🔒</div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500"></p>
                )}
            </div>
        </div>
    );
};

export default Achievements; 
