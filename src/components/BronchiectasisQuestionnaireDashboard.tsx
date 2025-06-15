
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Stethoscope, Gauge } from 'lucide-react';
import BronchiectasisQuestionnaireCard from './BronchiectasisQuestionnaireCard';

interface PatientData {
  name: string;
  age: string;
  gender: string;
}

interface BronchiectasisQuestionnaireDashboardProps {
  patientData: PatientData;
  onPatientDataChange: (data: PatientData) => void;
  onQuestionnaireSelect: (id: string) => void;
}

const BronchiectasisQuestionnaireDashboard: React.FC<BronchiectasisQuestionnaireDashboardProps> = ({
  patientData,
  onPatientDataChange,
  onQuestionnaireSelect,
}) => {
  // Inicialmente, só uma escala de exemplo. Novas escalas podem ser adicionadas aqui após criadas!
  const bronchiectasisQuestionnaires = [
    {
      id: 'bhpq',
      title: 'BHQ - Questionário de Saúde na Bronquiectasia',
      description: 'Avalia a qualidade de vida em pacientes com bronquiectasias.',
      questions: 10,
      time: '3-4 min',
      icon: Stethoscope, // Alterado para um ícone existente
      color: 'bg-emerald-500'
    },
    // Outras escalas podem ser colocadas aqui
  ];

  return (
    <div className="space-y-6">
      {/* Poderia ter PatientInfoForm futuramente */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Stethoscope className="h-6 w-6 text-emerald-600" />
          Escalas e Questionários Disponíveis
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bronchiectasisQuestionnaires.map((questionnaire) => (
            <BronchiectasisQuestionnaireCard
              key={questionnaire.id}
              questionnaire={questionnaire}
              onSelect={onQuestionnaireSelect}
            />
          ))}
        </div>
      </div>
      <div className="text-center">
        <Badge variant="secondary" className="text-base px-4 py-2 mt-6">
          Novas escalas para Bronquiectasias em breve
        </Badge>
      </div>
    </div>
  );
};

export default BronchiectasisQuestionnaireDashboard;
