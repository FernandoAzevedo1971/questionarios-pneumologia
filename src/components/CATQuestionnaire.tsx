
import React, { useState } from 'react';
import CATQuestionnaireForm from './CATQuestionnaireForm';
import CATResult from './CATResult';

interface CATQuestionnaireProps {
  patientData: {
    name: string;
    age: string;
    gender: string;
  };
}

const CATQuestionnaire = ({ patientData }: CATQuestionnaireProps) => {
  const [answers, setAnswers] = useState<number[]>(Array(8).fill(-1));
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      id: 1,
      text: "Eu nunca tusso",
      opposite: "Eu tusso o tempo todo",
      leftLabel: "Nunca tusso",
      rightLabel: "Tusso constantemente"
    },
    {
      id: 2,
      text: "Não tenho nenhuma secreção (catarro) no peito",
      opposite: "Meu peito está completamente cheio de secreção (catarro)",
      leftLabel: "Sem secreção",
      rightLabel: "Cheio de secreção"
    },
    {
      id: 3,
      text: "Meu peito não se sente apertado",
      opposite: "Meu peito se sente muito apertado",
      leftLabel: "Não apertado",
      rightLabel: "Muito apertado"
    },
    {
      id: 4,
      text: "Quando subo uma ladeira ou um lance de escadas não fico com falta de ar",
      opposite: "Quando subo uma ladeira ou um lance de escadas fico muito com falta de ar",
      leftLabel: "Sem falta de ar",
      rightLabel: "Muita falta de ar"
    },
    {
      id: 5,
      text: "Não fico limitado(a) em nenhuma atividade doméstica",
      opposite: "Fico muito limitado(a) em atividades domésticas",
      leftLabel: "Sem limitação",
      rightLabel: "Muito limitado"
    },
    {
      id: 6,
      text: "Sinto-me confiante para sair de casa, apesar do meu problema pulmonar",
      opposite: "Não me sinto nada confiante para sair de casa devido ao meu problema pulmonar",
      leftLabel: "Confiante",
      rightLabel: "Sem confiança"
    },
    {
      id: 7,
      text: "Durmo profundamente",
      opposite: "Não durmo profundamente devido ao meu problema pulmonar",
      leftLabel: "Durmo bem",
      rightLabel: "Não durmo bem"
    },
    {
      id: 8,
      text: "Tenho muita energia",
      opposite: "Não tenho energia nenhuma",
      leftLabel: "Muita energia",
      rightLabel: "Sem energia"
    }
  ];

  const handleAnswerChange = (questionIndex: number, value: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = value;
    setAnswers(newAnswers);
  };

  const calculateScore = () => {
    return answers.reduce((sum, answer) => sum + answer, 0);
  };

  const getInterpretation = (score: number) => {
    if (score <= 10) {
      return {
        level: 'Baixo impacto',
        description: 'A DPOC tem baixo impacto na sua vida. Sintomas leves que não interferem significativamente nas atividades diárias.',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200'
      };
    } else if (score <= 20) {
      return {
        level: 'Médio impacto',
        description: 'A DPOC tem impacto moderado na sua vida. Sintomas que podem interferir ocasionalmente nas atividades.',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200'
      };
    } else if (score <= 30) {
      return {
        level: 'Alto impacto',
        description: 'A DPOC tem alto impacto na sua vida. Sintomas que interferem significativamente nas atividades diárias.',
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200'
      };
    } else {
      return {
        level: 'Muito alto impacto',
        description: 'A DPOC tem impacto muito alto na sua vida. Sintomas graves que limitam muito as atividades.',
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200'
      };
    }
  };

  const handleSubmit = () => {
    const score = calculateScore();
    const interpretation = getInterpretation(score);
    
    // Save result to localStorage
    const result = {
      questionnaire: 'CAT',
      score,
      interpretation,
      patientData,
      date: new Date().toISOString(),
      answers
    };
    
    const existingResults = JSON.parse(localStorage.getItem('asmacheck_results') || '[]');
    existingResults.push(result);
    localStorage.setItem('asmacheck_results', JSON.stringify(existingResults));
    
    setShowResult(true);
  };

  const canSubmit = answers.every(answer => answer !== -1);
  const score = showResult ? calculateScore() : 0;
  const interpretation = showResult ? getInterpretation(score) : null;

  const resetQuestionnaire = () => {
    setAnswers(Array(8).fill(-1));
    setShowResult(false);
  };

  if (showResult && interpretation) {
    return (
      <CATResult
        score={score}
        interpretation={interpretation}
        onReset={resetQuestionnaire}
      />
    );
  }

  return (
    <CATQuestionnaireForm
      questions={questions}
      answers={answers}
      onAnswerChange={handleAnswerChange}
      onSubmit={handleSubmit}
      canSubmit={canSubmit}
    />
  );
};

export default CATQuestionnaire;
