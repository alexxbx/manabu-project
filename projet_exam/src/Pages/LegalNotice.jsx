import React from "react";

export default function LegalNotice() {
  const sections = [
    {
      title: "Éditeur du site",
      items: [
        "Nom de l’éditeur : [Nom ou Raison sociale]",
        "Statut juridique : [SARL, SAS, Association, etc.]",
        "Adresse : [Adresse postale complète]",
        "Téléphone : [Numéro de contact]",
        "Email : [Adresse email de contact]",
        "Numéro d’immatriculation : [SIRET / RCS]",
        "Directeur de la publication : [Nom du responsable légal]",
      ],
    },
    {
      title: "Hébergement",
      items: [
        "Hébergeur : [Nom de l’hébergeur]",
        "Adresse : [Adresse complète de l’hébergeur]",
        "Téléphone : [Numéro de contact]",
      ],
    },
    {
      title: "Propriété intellectuelle",
      items: [
        "L’ensemble du contenu (textes, images, vidéos, logos, etc.) est protégé par le droit d’auteur.",
        "Toute reproduction ou utilisation non autorisée est interdite sans accord préalable.",
      ],
    },
    {
      title: "Responsabilité",
      items: [
        "L’éditeur s’efforce de garantir l’exactitude des informations publiées.",
        "Toutefois, il ne peut être tenu responsable en cas d’erreurs, d’omissions ou de dommages liés à l’utilisation du site.",
      ],
    },
    {
      title: "Données personnelles",
      items: [
        "Les données personnelles collectées sont traitées conformément à la Politique de Confidentialité.",
        "Vous disposez d’un droit d’accès, de rectification et de suppression de vos données.",
      ],
    },
    {
      title: "Contact",
      items: [
        "Pour toute question ou demande, vous pouvez nous contacter via : [Adresse email de contact]",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 sm:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          ⚖️ Mentions Légales
        </h1>

        <p className="text-gray-600 text-center mb-12">
          Conformément aux dispositions légales en vigueur, vous trouverez ci-dessous les informations relatives à l’édition, l’hébergement et l’utilisation de ce site.
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
          👉 Ces mentions légales sont susceptibles d’évoluer en fonction des dispositions légales et réglementaires.
        </p>
      </div>
    </div>
  );
}
