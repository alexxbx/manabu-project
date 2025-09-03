// src/Pages/AboutUs.jsx
import React from 'react';

function AboutUs() {
    return (
        <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 text-center">
                Qui sommes-nous ?
            </h1>

            <div className="max-w-3xl text-gray-700 text-lg space-y-4">
                <p>
                    Bienvenue sur notre plateforme ! Nous sommes une équipe passionnée par l'éducation et la technologie.
                    Notre objectif est de créer des outils interactifs et accessibles pour faciliter l'apprentissage et le partage de connaissances.
                </p>
                <p>
                    Nous croyons que l'apprentissage doit être engageant, simple et disponible pour tous, quel que soit le niveau ou le lieu.
                    Chaque fonctionnalité de notre site est pensée pour vous aider à progresser rapidement et efficacement.
                </p>
                <p>
                    Notre équipe combine expertise technique, pédagogie et créativité pour vous offrir une expérience unique.
                    Merci de faire partie de cette aventure avec nous !
                </p>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-6">
                {/* Exemple : réseaux sociaux */}
                <a href="#" className="text-pink-500 hover:text-pink-700 font-semibold">Instagram</a>
                <a href="#" className="text-blue-600 hover:text-blue-800 font-semibold">Facebook</a>
                <a href="#" className="text-blue-400 hover:text-blue-600 font-semibold">Twitter</a>
            </div>
        </div>
    );
}

export default AboutUs;
