import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../Components/Header';
import { motion } from "framer-motion";

const Lessons = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  const completedCount = lessons.filter(l => l.completed).length;
  const progressPercent = lessons.length ? (completedCount / lessons.length) * 100 : 0;

  const fetchLessons = async () => {
    try {
      // Récupération utilisateur
      const userRes = await axios.get(`https://manabu-app.fr/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(userRes.data);

      // Récupération leçons avec leur état
      const lessonsRes = await axios.get(`https://manabu-app.fr/api/user/${userId}/lessons-unlocked`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      let lessonsData = lessonsRes.data || [];

      // S'assurer que toutes les leçons ont un ordre
      lessonsData = lessonsData.map((lesson, index) => ({
        ...lesson,
        position: lesson.position || index + 1,
        content: lesson.content || "",
        isUnlocked: lesson.isUnlocked ?? false
      }));

      setLessons(lessonsData);
      setLoading(false);

    } catch (error) {
      console.error("Erreur récupération leçons:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token || !userId) return navigate('/login');
    fetchLessons();
  }, [token, userId, navigate]);

  if (loading) return <div>Chargement...</div>;

  const sortedLessons = [...lessons].sort((a, b) => (a.position || 0) - (b.position || 0));

  return (
    <div className="bg-gray-50 min-h-screen relative">
      <Header />
      <div className="container mx-auto px-4 md:px-6 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-10">
          Bienvenue {user?.username}
        </h1>

        {/* Bouton Mode Immersion */}
        <div className="flex justify-center mb-8 md:mb-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/ImmersionMode')}
            className="bg-[#F4E1C1] hover:bg-[#E8D4B3] text-gray-800 font-bold py-2 md:py-3 px-4 md:px-6 rounded-lg shadow-lg flex items-center gap-2 transition-all duration-300 border-2 border-[#D4BFA0] text-sm md:text-base"
          >
            <span className="text-lg md:text-xl">🎯</span>
            <span>Mode Immersion</span>
          </motion.button>
        </div>

        {sortedLessons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 relative">
            {/* Ligne verticale */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-full border-l-4 border-dotted border-gray-300 z-0 hidden md:block" />
            <div
              className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-green-500 z-10 transition-all duration-1000 ease-in-out hidden md:block"
              style={{ height: `${progressPercent}%`, top: 0 }}
            />

            {sortedLessons.map((lesson, index) => {
              const unlocked = lesson.unlocked;
              const isCompleted = lesson.completed;
              const isLeft = index % 2 === 0;
              const isLast = index === sortedLessons.length - 1;

              const LessonCard = (
                <div className="relative w-full max-w-xs mx-auto md:mx-0 z-10">

                  <div
                    className={`bg-white p-4 rounded-lg shadow-md transition-all duration-500 ease-in-out transform
                      ${isCompleted ? 'border-l-8 border-green-500 shadow-lg scale-105 bg-green-50' : ''}
                      ${unlocked ? 'hover:scale-105' : ''}`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-white border-4 transition
                        ${isCompleted ? 'bg-green-500 border-green-700' :
                          unlocked ? 'bg-blue-500 border-blue-700' :
                            'bg-gray-300 border-gray-400'}`}>
                        {index + 1}
                      </div>
                      <h2 className="text-base md:text-lg font-semibold">{lesson.title}</h2>
                    </div>
                    <p className="text-xs md:text-sm text-gray-600 mb-2">
                      {lesson.content.substring(0, 80)}{lesson.content.length > 80 ? '...' : ''}
                    </p>
                    <button
                      className={`w-full px-3 md:px-4 py-1.5 md:py-2 rounded text-xs md:text-sm font-medium transition
                        ${unlocked ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
                      onClick={() => unlocked && navigate(`/lessons/${lesson.id}`)}
                      disabled={!unlocked}
                    >
                      {unlocked ? (isCompleted ? 'Revoir' : 'Commencer') : 'Verrouillée'}
                    </button>
                  </div>
                </div>
              );

              return (
                <React.Fragment key={lesson.id}>
                  {isLeft ? (
                    <>
                      <div className="flex justify-center md:justify-end">{LessonCard}</div>
                      <div className="hidden md:block" />
                      <div className="hidden md:block" />
                    </>
                  ) : (
                    <>
                      <div className="hidden md:block" />
                      <div className="hidden md:block" />
                      <div className="flex justify-center md:justify-start">{LessonCard}</div>
                    </>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        ) : (
          <div className="text-center mt-10 md:mt-20">
            <p className="text-gray-500 mb-4">Aucune leçon trouvée</p>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-5 py-2 rounded font-medium text-sm md:text-base"
              onClick={() => window.location.reload()}
            >
              Rafraîchir
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lessons;
