
import React from 'react';
import { Activity, BarChart3 } from 'lucide-react';
import PatientInfoForm from './PatientInfoForm';
import AsthmaQuestionnaireCard from './AsthmaQuestionnaireCard';
import PatientHistory from './PatientHistory';

interface PatientData {
  name: string;
  age: string;
  gender: string;
}

interface AsthmaQuestionnaireDashboardProps {
  patientData: PatientData;
  onPatientDataChange: (data: PatientData) => void;
  onQuestionnaireSelect: (id: string) => void;
}

const AsthmaQuestionnaireDashboard: React.FC<AsthmaQuestionnaireDashboardProps> = ({
  patientData,
  onPatientDataChange,
  onQuestionnaireSelect
}) => {
  const asthmaQuestionnaires = [
    {
      id: 'act',
      title: 'ACT - Teste de Controle da Asma',
      description: 'Avalia o controle da asma nas últimas 4 semanas',
      questions: 5,
      time: '2-3 min',
      icon: Activity,
      color: 'bg-blue-500'
    },
    {
      id: 'acq',
      title: 'ACQ - Questionário de Controle da Asma',
      description: 'Instrumento validado para avaliar controle da asma',
      questions: 7,
      time: '3-4 min',
      icon: Activity,
      color: 'bg-green-500'
    },
    {
      id: 'aqlq',
      title: 'AQLQ-S - Qualidade de Vida na Asma',
      description: 'Avalia o impacto da asma na qualidade de vida',
      questions: 12,
      time: '5-7 min',
      icon: BarChart3,
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="space-y-6">
      <PatientInfoForm 
        patientData={patientData}
        onPatientDataChange={onPatientDataChange}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Activity className="h-6 w-6 text-blue-600" />
          Questionários Disponíveis
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {asthmaQuestionnaires.map((questionnaire) => (
            <AsthmaQuestionnaireCard
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

export default AsthmaQuestionnaireDashboard;
