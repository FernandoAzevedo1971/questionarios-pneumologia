
import React, { useState } from 'react';
import BORGQuestionnaireForm from './BORGQuestionnaireForm';
import BORGResult from './BORGResult';

interface BORGQuestionnaireProps {
  patientData: {
    name: string;
    age: string;
    gender: string;
  };
}

const BORGQuestionnaire = ({ patientData }: BORGQuestionnaireProps) => {
  const [selectedScore, setSelectedScore] = useState<number>(-1);
  const [showResult, setShowResult] = useState(false);
  const [context, setContext] = useState<string>('');

  const getInterpretation = (score: number) => {
    if (score === 0) {
      return {
        level: 'Ausente',
        description: 'Nenhuma percepção de falta de ar. Respiração normal.',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        severity: 'Normal'
      };
    } else if (score <= 2) {
      return {
        level: 'Leve',
        description: 'Falta de ar leve, facilmente tolerável. Não interfere com a atividade.',
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        severity: 'Leve'
      };
    } else if (score <= 4) {
      return {
        level: 'Moderada',
        description: 'Falta de ar moderada, perceptível mas ainda tolerável.',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        severity: 'Moderada'
      };
    } else if (score <= 6) {
      return {
        level: 'Intensa',
        description: 'Falta de ar intensa, desconfortável mas ainda suportável.',
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
        severity: 'Intensa'
      };
    } else if (score <= 9) {
      return {
        level: 'Muito intensa',
        description: 'Falta de ar muito intensa, dificilmente suportável.',
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        severity: 'Muito Intensa'
      };
    } else {
      return {
        level: 'Máxima',
        description: 'Falta de ar máxima, a pior falta de ar já experimentada.',
        color: 'text-red-800',
        bgColor: 'bg-red-100',
        borderColor: 'border-red-300',
        severity: 'Máxima'
      };
    }
  };

  const handleSubmit = () => {
    const interpretation = getInterpretation(selectedScore);
    
    // Save result to localStorage
    const result = {
      questionnaire: 'BORG',
      score: selectedScore,
      interpretation,
      patientData,
      context,
      date: new Date().toISOString(),
      answers: [selectedScore]
    };
    
    const existingResults = JSON.parse(localStorage.getItem('asmacheck_results') || '[]');
    existingResults.push(result);
    localStorage.setItem('asmacheck_results', JSON.stringify(existingResults));
    
    setShowResult(true);
  };

  const resetQuestionnaire = () => {
    setSelectedScore(-1);
    setShowResult(false);
    setContext('');
  };

  if (showResult) {
    const interpretation = getInterpretation(selectedScore);
    return (
      <BORGResult
        selectedScore={selectedScore}
        context={context}
        interpretation={interpretation}
        onReset={resetQuestionnaire}
      />
    );
  }

  return (
    <BORGQuestionnaireForm
      selectedScore={selectedScore}
      context={context}
      onScoreSelect={setSelectedScore}
      onContextChange={setContext}
      onSubmit={handleSubmit}
    />
  );
};

export default BORGQuestionnaire;
