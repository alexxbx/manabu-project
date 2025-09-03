import React from 'react';

function Terms() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-8">
            <h1 className="text-3xl font-bold mb-6">Conditions d'utilisation</h1>

            <div className="max-w-3xl bg-white p-6 rounded-lg shadow-md text-gray-800 space-y-4">
                <p>Bienvenue sur notre site ! Voici les conditions d'utilisation :</p>
                <ol className="list-decimal list-inside space-y-2">
                    <li>Vous devez avoir au moins 13 ans pour utiliser ce service.</li>
                    <li>Respectez les autres utilisateurs et ne publiez pas de contenu inapproprié.</li>
                    <li>Vos données personnelles sont protégées conformément à notre politique de confidentialité.</li>
                    <li>Tout comportement frauduleux ou violation des règles peut entraîner la suppression de votre compte.</li>
                    {/* Ajoute autant de points que nécessaire */}
                </ol>
            </div>
        </div>
    );
}

export default Terms;
