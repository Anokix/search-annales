'use client';

import React, { useState, useMemo } from 'react';

const data = [
  { annee: "2023", num: "1.1", question: "Définir les hypothèses sous-jacentes au modèle proposé en annexe 1 et en expliquer l'utilité pour les projets d'investissements." },
  { annee: "2023", num: "1.2", question: "Définir les termes suivants : option réelle et option d'expansion." }
  // Ajoutez vos autres données ici
];

export default function SearchAnnales() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredQuestions = useMemo(() => {
    if (!searchTerm.trim()) return data;

    const searchTermLower = searchTerm.toLowerCase();
    return data.filter(item =>
      item.question.toLowerCase().includes(searchTermLower) ||
      item.annee.includes(searchTermLower) ||
      item.num.includes(searchTermLower)
    );
  }, [searchTerm]);

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Recherche d&apos;Annales</h1>

        <input
          type="text"
          placeholder="Rechercher par mot-clé, année ou numéro..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="space-y-4">
          {filteredQuestions.map((item, index) => (
            <div
              key={index}
              className="p-4 rounded-lg border border-gray-200 hover:bg-gray-50"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold text-blue-600">Année {item.annee}</span>
                <span className="text-gray-500">|</span>
                <span className="font-medium">Question {item.num}</span>
              </div>
              <p className="text-gray-700">{item.question}</p>
            </div>
          ))}

          {filteredQuestions.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Aucun résultat trouvé pour "{searchTerm}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
}