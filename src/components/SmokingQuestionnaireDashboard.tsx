
import React from 'react';
import { Cigarette } from 'lucide-react';
import PatientInfoForm from './PatientInfoForm';
import SmokingQuestionnaireCard from './SmokingQuestionnaireCard';
import PatientHistory from './PatientHistory';

interface PatientData {
  name: string;
  age: string;
  gender: string;
}

interface SmokingQuestionnaireDashboardProps {
  patientData: PatientData;
  onPatientDataChange: (data: PatientData) => void;
  onQuestionnaireSelect: (id: string) => void;
}

const SmokingQuestionnaireDashboard: React.FC<SmokingQuestionnaireDashboardProps> = ({
  patientData,
  onPatientDataChange,
  onQuestionnaireSelect
}) => {
  const smokingQuestionnaires = [
    {
      id: 'fagerstrom',
      title: 'Teste de Fagerström',
      description: 'Avalia o grau de dependência à nicotina',
      questions: 6,
      time: '2-3 min',
      icon: Cigarette,
      color: 'bg-amber-500'
    }
  ];

  return (
    <div className="space-y-6">
      <PatientInfoForm 
        patientData={patientData}
        onPatientDataChange={onPatientDataChange}
        variant="smoking"
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Cigarette className="h-6 w-6 text-amber-600" />
          Questionários Disponíveis
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {smokingQuestionnaires.map((questionnaire) => (
            <SmokingQuestionnaireCard
              key={questionnaire.id}
              questionnaire={questionnaire}
              onSelect={onQuestionnaireSelect}
            />
          ))}
        </div>
      </div>

      <PatientHistory />
    </div>
  );
};

export default SmokingQuestionnaireDashboard;
