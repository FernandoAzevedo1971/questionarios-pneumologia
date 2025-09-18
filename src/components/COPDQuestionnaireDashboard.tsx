
import React from 'react';
import { Wind, BarChart3, Gauge, Stethoscope } from 'lucide-react';
import PatientInfoForm from './PatientInfoForm';
import COPDQuestionnaireCard from './COPDQuestionnaireCard';
import PatientHistory from './PatientHistory';

interface PatientData {
  name: string;
  age: string;
  gender: string;
}

interface COPDQuestionnaireDashboardProps {
  patientData: PatientData;
  onPatientDataChange: (data: PatientData) => void;
  onQuestionnaireSelect: (id: string) => void;
}

const COPDQuestionnaireDashboard: React.FC<COPDQuestionnaireDashboardProps> = ({
  patientData,
  onPatientDataChange,
  onQuestionnaireSelect
}) => {
  const copdQuestionnaires = [
    {
      id: 'cat',
      title: 'CAT - Teste de Avaliação da DPOC',
      description: 'Avalia o impacto da DPOC na qualidade de vida',
      questions: 8,
      time: '2-3 min',
      icon: Wind,
      color: 'bg-orange-500'
    },
    {
      id: 'mrc',
      title: 'MRC - Escala de Dispneia',
      description: 'Avalia o grau de dispneia relacionado à atividade física',
      questions: 1,
      time: '1 min',
      icon: Gauge,
      color: 'bg-red-500'
    },
    {
      id: 'borg',
      title: 'BORG - Escala de Percepção de Esforço',
      description: 'Avalia a percepção subjetiva de esforço respiratório',
      questions: 1,
      time: '1 min',
      icon: BarChart3,
      color: 'bg-indigo-500'
    },
    {
      id: 'ccq',
      title: 'CCQ - Questionário Clínico sobre DPOC',
      description: 'Avalia sintomas, estado funcional e controle clínico da DPOC',
      questions: 10,
      time: '3-5 min',
      icon: Stethoscope,
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="space-y-6">
      <PatientInfoForm 
        patientData={patientData}
        onPatientDataChange={onPatientDataChange}
        variant="copd"
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Wind className="h-6 w-6 text-orange-600" />
          Questionários Disponíveis
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {copdQuestionnaires.map((questionnaire) => (
            <COPDQuestionnaireCard
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

export default COPDQuestionnaireDashboard;
