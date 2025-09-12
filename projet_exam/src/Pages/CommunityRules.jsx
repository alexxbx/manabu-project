import React from "react";

export default function CommunityRules() {
    const rules = [
        {
            title: "Respect et bienveillance",
            items: [
                "Traiter les autres membres avec politesse, même en cas de désaccord.",
                "Aucun propos insultant, discriminatoire, diffamatoire ou haineux ne sera toléré.",
                "Encourager un climat positif et constructif.",
            ],
        },
        {
            title: "Contenus appropriés",
            items: [
                "Publier uniquement des contenus en lien avec le thème de la communauté.",
                "Éviter le spam, la publicité non sollicitée ou les messages répétitifs.",
                "Les contenus violents, à caractère sexuel explicite, ou illégaux sont strictement interdits.",
            ],
        },
        {
            title: "Confidentialité et sécurité",
            items: [
                "Respecter la vie privée des autres membres.",
                "Ne pas tenter d’accéder aux données d’autrui ou au fonctionnement interne de la plateforme.",
                "Signaler tout comportement suspect ou dangereux à l’équipe de modération.",
            ],
        },
        {
            title: "Esprit collaboratif",
            items: [
                "Aider les nouveaux membres à s’intégrer.",
                "Partager ses connaissances et expériences pour enrichir la communauté.",
                "Rester ouvert à la critique constructive et au dialogue.",
            ],
        },
        {
            title: "Application des règles",
            items: [
                "Les modérateurs peuvent supprimer un contenu qui ne respecte pas ces règles.",
                "En cas de récidive, un avertissement ou une exclusion temporaire/définitive pourra être appliqué.",
                "Toute décision de la modération vise à protéger l’ensemble de la communauté.",
            ],
        },
        {
            title: "Engagement des membres",
            items: [
                "En participant, vous vous engagez à respecter ces règles et à contribuer à un espace sûr et agréable pour toutes et tous.",
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-6 sm:px-12 lg:px-24">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
                    📜 Règles de Conduite de la Communauté
                </h1>

                <p className="text-gray-600 text-center mb-12">
                    Bienvenue dans notre communauté ! Afin de garantir un espace
                    respectueux, bienveillant et constructif, nous vous demandons de
                    respecter les règles suivantes. Toute participation à la plateforme
                    implique l’adhésion à ce code de conduite.
                </p>

                <div className="space-y-6">
                    {rules.map((rule, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-md rounded-2xl p-6 border border-gray-200"
                        >
                            <h2 className="text-xl font-semibold text-gray-700 mb-3">
                                {index + 1}. {rule.title}
                            </h2>
                            <ul className="list-disc list-inside text-gray-600 space-y-2">
                                {rule.items.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <p className="text-gray-500 italic text-sm mt-10 text-center">
                    👉 Ces règles peuvent évoluer au fil du temps. Les mises à jour seront
                    communiquées à l’ensemble des membres.
                </p>
            </div>
        </div>
    );
}
