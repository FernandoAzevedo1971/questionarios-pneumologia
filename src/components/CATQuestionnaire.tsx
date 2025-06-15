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
      text: "Tosse",
      opposite: "Eu tenho tosse o tempo todo",
      leftLabel: "Eu nunca tenho tosse",
      rightLabel: "Eu tenho tosse o tempo todo"
    },
    {
      id: 2,
      text: "Secreção/Catarro",
      opposite: "Meu peito está completamente cheio de secreção (catarro)",
      leftLabel: "Não tenho nenhuma secreção (catarro) no peito",
      rightLabel: "Meu peito está completamente cheio de secreção (catarro)"
    },
    {
      id: 3,
      text: "Aperto no peito",
      opposite: "Sinto muito aperto no peito",
      leftLabel: "Não sinto nenhum aperto no peito",
      rightLabel: "Sinto muito aperto no peito"
    },
    {
      id: 4,
      text: "Falta de ar (Dispneia)",
      opposite: "Quando subo uma ladeira ou um lance de escadas fico muito sem fôlego",
      leftLabel: "Quando subo uma ladeira ou um lance de escadas não fico sem fôlego",
      rightLabel: "Quando subo uma ladeira ou um lance de escadas fico muito sem fôlego"
    },
    {
      id: 5,
      text: "Limitação de atividades domésticas",
      opposite: "Sinto-me muito limitado para fazer atividades domésticas",
      leftLabel: "Não me sinto limitado para fazer qualquer atividade doméstica",
      rightLabel: "Sinto-me muito limitado para fazer atividades domésticas"
    },
    {
      id: 6,
      text: "Confiança para sair de casa",
      opposite: "Não me sinto nada confiante para sair de casa por causa da minha doença pulmonar",
      leftLabel: "Sinto-me confiante para sair de casa, apesar da minha doença pulmonar",
      rightLabel: "Não me sinto nada confiante para sair de casa por causa da minha doença pulmonar"
    },
    {
      id: 7,
      text: "Sono",
      opposite: "Não durmo profundamente por causa da minha doença pulmonar",
      leftLabel: "Durmo profundamente",
      rightLabel: "Não durmo profundamente por causa da minha doença pulmonar"
    },
    {
      id: 8,
      text: "Energia",
      opposite: "Não tenho nenhuma energia",
      leftLabel: "Tenho muita energia",
      rightLabel: "Não tenho nenhuma energia"
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
