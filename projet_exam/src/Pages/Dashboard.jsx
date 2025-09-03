import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserSection from '../Components/Dashboard/UserSection';
import LessonSection from '../Components/Dashboard/LessonSection';
import ExerciseSection from '../Components/Dashboard/ExerciseSection';
import { jwtDecode } from 'jwt-decode';

function Dashboard() {
    const [users, setUsers] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            setError("Token manquant");
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
		    try {
    const decoded = jwtDecode(token);
    const roles = decoded.roles || [];
    if (!roles.includes('ROLE_ADMIN')) {
        setError("Accès réservé aux administrateurs");
        setLoading(false);
        navigate('/');
        return;
    }
} catch (err) {
    setError("Token invalide");
    setLoading(false);
    navigate('/login');
    return;
}

                    const [usersRes, lessonsRes, exercisesRes] = await Promise.all([
                    axios.get('https://manabu-app.fr/api/users', {
                        headers: { Authorization: `Bearer ${token}`, 'Accept': 'application/ld+json' }
                    }),
                    axios.get('https://manabu-app.fr/api/lessons', {
                        headers: { Authorization: `Bearer ${token}`, 'Accept': 'application/ld+json' }
                    }),
                    axios.get('https://manabu-app.fr/api/exercises', {
                        headers: { Authorization: `Bearer ${token}`, 'Accept': 'application/ld+json' }
                    }),
                ]);


                setUsers(usersRes.data.member || []);
                setLessons(lessonsRes.data.member || []);
                setExercises(exercisesRes.data.member || []);
            } catch (err) {
                setError("Erreur lors du chargement des données : " + (err.response?.data?.message || err.message));
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token, navigate]);

    // ---------- CRUD Utilisateurs ----------
    const handleAddUser = async (newUser) => {
        try {
            const res = await axios.post('https://manabu-app.fr/api/register', newUser, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(prev => [...prev, res.data]);
            return true;
        } catch (err) {
            setError('Erreur ajout utilisateur');
            return false;
        }
    };

    const handleUpdateUser = async (userId, formData) => {
        try {
            await axios.patch(`https://manabu-app.fr/api/users/${userId}`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(prev => prev.map(user => user.id === userId ? { ...user, ...formData } : user));
            return true;
        } catch (err) {
            setError('Erreur modification utilisateur');
            return false;
        }
    };

    const handleDeleteUser = async (user) => {
        if (!user || !user['@id']) return;
        const userId = user['@id'].split('/').pop();

        try {
            await axios.delete(`https://manabu-app.fr/api/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(prev => prev.filter(u => u['@id'] !== user['@id']));
        } catch (err) {
            setError('Erreur suppression utilisateur');
        }
    };


    // ---------- CRUD Leçons ----------
    const handleAddLesson = async (newLesson) => {
        try {
            const res = await axios.post('https://manabu-app.fr/api/lessons', newLesson, {
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/ld+json', 'Accept': 'application/ld+json' }
            });
            setLessons(prev => [...prev, res.data]);
            return true;
        } catch (err) {
            setError(err.response?.data?.hydra?.description || 'Erreur ajout leçon');
            return false;
        }
    };

    const handleUpdateLesson = async (lessonId, formData) => {
        try {
            await axios.put(`https://manabu-app.fr/api/lessons/${lessonId}`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setLessons(prev => prev.map(l => l.id === lessonId ? { ...l, ...formData } : l));
            return true;
        } catch (err) {
            setError('Erreur modification leçon');
            return false;
        }
    };

    const handleDeleteLesson = async (lessonId) => {
        try {
            await axios.delete(`https://manabu-app.fr/api/lessons/${lessonId}`, {
                headers: { Authorization: `Bearer ${token}` } // si JWT
            });
            setLessons(lessons.filter(l => l.id !== lessonId));
        } catch (err) {
            console.error('Erreur suppression leçon:', err);
        }
    };


    // ---------- CRUD Exercices ----------
    const handleAddExercise = async (newExercise) => {
        if (!newExercise.lesson) {
            setError("Veuillez sélectionner une leçon pour l'exercice");
            return false;
        }
        try {
            const res = await axios.post('https://manabu-app.fr/api/exercises', newExercise, {
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/ld+json' }
            });
            setExercises(prev => [...prev, res.data]);
            return true;
        } catch (err) {
            setError('Erreur ajout exercice');
            return false;
        }
    };

    const handleUpdateExercise = async (exerciseUri, formData) => {
        try {
            await axios.put(`https://manabu-app.fr${exerciseUri}`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setExercises(prev => prev.map(ex => ex['@id'] === exerciseUri ? { ...ex, ...formData } : ex));
            return true;
        } catch (err) {
            setError('Erreur modification exercice');
            return false;
        }
    };


    const handleDeleteExercise = async (exercise) => {
        if (!exercise || !exercise['@id']) {
            console.error("Exercice invalide :", exercise);
            return;
        }

        const exerciseId = exercise['@id'].split('/').pop();
        try {
            await axios.delete(`https://manabu-app.fr/api/exercises/${exerciseId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setExercises(prev => prev.filter(e => e['@id'] !== exercise['@id']));
        } catch (err) {
            setError('Erreur suppression exercice');
        }
    };

    if (loading) return <p>Chargement...</p>;
    if (error) return <p className="text-red-600">{error}</p>;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center">Dashboard Admin</h1>

            <UserSection
                users={users}
                onAddUser={handleAddUser}
                onDeleteUser={handleDeleteUser}
                onUpdateUser={handleUpdateUser}
            />

            <LessonSection
                lessons={lessons}
                onAddLesson={handleAddLesson}
                onDeleteLesson={handleDeleteLesson}
                onUpdateLesson={handleUpdateLesson}
            />

            <ExerciseSection
                exercises={exercises}
                lessons={lessons}
                onAddExercise={handleAddExercise}
                onDeleteExercise={handleDeleteExercise}
                onUpdateExercise={handleUpdateExercise}
            />
        </div>
    );
}

export default Dashboard;
