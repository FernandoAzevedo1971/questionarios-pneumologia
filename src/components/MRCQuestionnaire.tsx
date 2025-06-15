
import React, { useState } from 'react';
import MRCQuestionnaireForm from './MRCQuestionnaireForm';
import MRCResult from './MRCResult';

interface MRCQuestionnaireProps {
  patientData: {
    name: string;
    age: string;
    gender: string;
  };
}

const MRCQuestionnaire = ({ patientData }: MRCQuestionnaireProps) => {
  const [selectedGrade, setSelectedGrade] = useState<number>(-1);
  const [showResult, setShowResult] = useState(false);

  const mrcGrades = [
    {
      grade: 0,
      description: "Só tenho falta de ar durante exercícios intensos"
    },
    {
      grade: 1,
      description: "Tenho falta de ar quando apresso o passo ou subo uma ladeira leve"
    },
    {
      grade: 2,
      description: "Ando mais devagar que pessoas da minha idade por causa da falta de ar, ou tenho que parar para respirar quando ando no meu próprio ritmo"
    },
    {
      grade: 3,
      description: "Paro para respirar depois de andar cerca de 100 metros ou após alguns minutos"
    },
    {
      grade: 4,
      description: "Tenho muita falta de ar para sair de casa, ou tenho falta de ar para me vestir ou despir"
    }
  ];

  const getInterpretation = (grade: number) => {
    switch (grade) {
      case 0:
        return {
          level: 'Grau 0 - Dispneia ausente',
          description: 'Dispneia apenas durante exercícios intensos. Função respiratória preservada para atividades cotidianas.',
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          severity: 'Leve'
        };
      case 1:
        return {
          level: 'Grau 1 - Dispneia leve',
          description: 'Dispneia ao acelerar o passo ou subir ladeiras. Limitação leve da capacidade de exercício.',
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          severity: 'Leve'
        };
      case 2:
        return {
          level: 'Grau 2 - Dispneia moderada',
          description: 'Limitação da velocidade de caminhada. Necessidade de parar para respirar durante caminhada.',
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          severity: 'Moderada'
        };
      case 3:
        return {
          level: 'Grau 3 - Dispneia grave',
          description: 'Limitação importante da capacidade de caminhada. Necessidade de parar após curtas distâncias.',
          color: 'text-orange-600',
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200',
          severity: 'Grave'
        };
      case 4:
        return {
          level: 'Grau 4 - Dispneia muito grave',
          description: 'Dispneia incapacitante. Limitação severa para atividades básicas da vida diária.',
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          severity: 'Muito Grave'
        };
      default:
        return null;
    }
  };

  const handleSubmit = () => {
    const interpretation = getInterpretation(selectedGrade);
    
    if (interpretation) {
      // Save result to localStorage
      const result = {
        questionnaire: 'MRC',
        score: selectedGrade,
        interpretation,
        patientData,
        date: new Date().toISOString(),
        answers: [selectedGrade]
      };
      
      const existingResults = JSON.parse(localStorage.getItem('asmacheck_results') || '[]');
      existingResults.push(result);
      localStorage.setItem('asmacheck_results', JSON.stringify(existingResults));
      
      setShowResult(true);
    }
  };

  const interpretation = showResult ? getInterpretation(selectedGrade) : null;

  const resetQuestionnaire = () => {
    setSelectedGrade(-1);
    setShowResult(false);
  };

  if (showResult && interpretation) {
    return (
      <MRCResult
        selectedGrade={selectedGrade}
        interpretation={interpretation}
        onReset={resetQuestionnaire}
      />
    );
  }

  return (
    <div className="animate-fade-in">
      <MRCQuestionnaireForm
        mrcGrades={mrcGrades}
        selectedGrade={selectedGrade}
        onGradeSelect={setSelectedGrade}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default MRCQuestionnaire;
