import React, { useState } from 'react';
import BronchiectasisQuestionnaireDashboard from '@/components/BronchiectasisQuestionnaireDashboard';
import BSIQuestionnaire from "@/components/BSIQuestionnaire";

const BronchiectasisQuestionnaires = () => {
  // Preparado para coletar dados do paciente no futuro caso queira.
  const [patientData, setPatientData] = useState({
    name: '',
    age: '',
    gender: '',
  });

  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState<string | null>(null);

  // Componente para manipulação de escalas será implementado quando a escala for criada

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 pb-12">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-emerald-700 mb-6 text-center">Bronquiectasias</h1>
        <BronchiectasisQuestionnaireDashboard
          patientData={patientData}
          onPatientDataChange={setPatientData}
          onQuestionnaireSelect={setSelectedQuestionnaire}
        />
        {/* Área para o formulário/escala escolhida */}
        {selectedQuestionnaire === 'bsi' && (
          <div className="mt-8 flex justify-center">
            <BSIQuestionnaire />
          </div>
        )}
        {selectedQuestionnaire === 'bhpq' && (
          <div className="mt-8 text-center">
            <div className="inline-block bg-white border border-emerald-200 rounded-md px-8 py-6">
              <h2 className="text-2xl font-bold text-emerald-700 mb-2">Em breve!</h2>
              <p className="text-emerald-700">
                O questionário ou escala selecionado estará disponível em uma atualização futura.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BronchiectasisQuestionnaires;
