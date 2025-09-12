import React from "react";

export default function PrivacyPolicy() {
    const sections = [
        {
            title: "Collecte des informations",
            items: [
                "Nous collectons uniquement les informations nécessaires à l’utilisation de la plateforme (ex. : email, nom d’utilisateur, progression d’apprentissage).",
                "Aucune donnée sensible (santé, religion, opinions politiques, etc.) n’est collectée.",
                "Les données peuvent être fournies directement par vous (inscription, utilisation de la plateforme) ou générées automatiquement (logs techniques, statistiques d’usage).",
            ],
        },
        {
            title: "Utilisation des données",
            items: [
                "Améliorer l’expérience utilisateur et proposer des fonctionnalités adaptées.",
                "Assurer le bon fonctionnement technique de la plateforme.",
                "Communiquer avec vous uniquement pour des raisons liées à l’utilisation de nos services (notifications, mises à jour, support).",
            ],
        },
        {
            title: "Partage des données",
            items: [
                "Vos données ne sont jamais vendues à des tiers.",
                "Elles peuvent être partagées uniquement avec des prestataires techniques nécessaires au fonctionnement (hébergement, services d’authentification).",
                "Toute transmission est encadrée par des mesures de sécurité strictes.",
            ],
        },
        {
            title: "Sécurité des données",
            items: [
                "Nous mettons en place des mesures de sécurité adaptées (chiffrement, contrôle d’accès).",
                "Seules les personnes autorisées ont accès aux données.",
                "En cas d’incident de sécurité, vous serez informé dans les plus brefs délais.",
            ],
        },
        {
            title: "Conservation des données",
            items: [
                "Vos données sont conservées uniquement le temps nécessaire à la fourniture du service.",
                "Vous pouvez demander la suppression de vos données à tout moment.",
            ],
        },
        {
            title: "Droits des utilisateurs",
            items: [
                "Accéder à vos données personnelles.",
                "Corriger ou mettre à jour vos informations.",
                "Demander la suppression définitive de votre compte et de vos données.",
                "Exercer ces droits en nous contactant directement via l’adresse de support.",
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-6 sm:px-12 lg:px-24">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
                    🔒 Politique de Confidentialité
                </h1>

                <p className="text-gray-600 text-center mb-12">
                    La protection de vos données personnelles est une priorité.
                    Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations.
                </p>

                <div className="space-y-6">
                    {sections.map((section, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-md rounded-2xl p-6 border border-gray-200"
                        >
                            <h2 className="text-xl font-semibold text-gray-700 mb-3">
                                {index + 1}. {section.title}
                            </h2>
                            <ul className="list-disc list-inside text-gray-600 space-y-2">
                                {section.items.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <p className="text-gray-500 italic text-sm mt-10 text-center">
                    👉 Cette politique peut être mise à jour pour refléter des évolutions techniques, légales ou organisationnelles.
                    Les utilisateurs seront informés en cas de modification importante.
                </p>
            </div>
        </div>
    );
}
