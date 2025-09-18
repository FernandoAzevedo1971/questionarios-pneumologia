import React, { useState } from 'react';
import CCQQuestionnaireForm from './CCQQuestionnaireForm';
import CCQResult from './CCQResult';

interface CCQQuestionnaireProps {
  patientData: {
    name: string;
    age: string;
    gender: string;
  };
}

const CCQQuestionnaire: React.FC<CCQQuestionnaireProps> = ({ patientData }) => {
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showResult, setShowResult] = useState(false);

  // CCQ Questions
  const questions = [
    {
      id: 1,
      text: "Sentiu falta de ar quando em repouso?",
      type: 'frequency' as const,
      scale: [
        { value: 0, label: "Nenhuma vez" },
        { value: 1, label: "Quase nunca" },
        { value: 2, label: "Poucas vezes" },
        { value: 3, label: "Algumas vezes" },
        { value: 4, label: "Muitas vezes" },
        { value: 5, label: "Na maioria das vezes" },
        { value: 6, label: "Quase o tempo todo" }
      ]
    },
    {
      id: 2,
      text: "Sentiu falta de ar ao fazer qualquer atividade física?",
      type: 'frequency' as const,
      scale: [
        { value: 0, label: "Nenhuma vez" },
        { value: 1, label: "Quase nunca" },
        { value: 2, label: "Poucas vezes" },
        { value: 3, label: "Algumas vezes" },
        { value: 4, label: "Muitas vezes" },
        { value: 5, label: "Na maioria das vezes" },
        { value: 6, label: "Quase o tempo todo" }
      ]
    },
    {
      id: 3,
      text: "Ficou preocupado/a com a possibilidade de pegar um resfriado ou que sua respiração piorasse?",
      type: 'frequency' as const,
      scale: [
        { value: 0, label: "Nenhuma vez" },
        { value: 1, label: "Quase nunca" },
        { value: 2, label: "Poucas vezes" },
        { value: 3, label: "Algumas vezes" },
        { value: 4, label: "Muitas vezes" },
        { value: 5, label: "Na maioria das vezes" },
        { value: 6, label: "Quase o tempo todo" }
      ]
    },
    {
      id: 4,
      text: "Se sentiu deprimido/a (para baixo) por causa de seus problemas de respiração?",
      type: 'frequency' as const,
      scale: [
        { value: 0, label: "Nenhuma vez" },
        { value: 1, label: "Quase nunca" },
        { value: 2, label: "Poucas vezes" },
        { value: 3, label: "Algumas vezes" },
        { value: 4, label: "Muitas vezes" },
        { value: 5, label: "Na maioria das vezes" },
        { value: 6, label: "Quase o tempo todo" }
      ]
    },
    {
      id: 5,
      text: "Você tossiu?",
      type: 'frequency' as const,
      scale: [
        { value: 0, label: "Nenhuma vez" },
        { value: 1, label: "Quase nunca" },
        { value: 2, label: "Poucas vezes" },
        { value: 3, label: "Algumas vezes" },
        { value: 4, label: "Muitas vezes" },
        { value: 5, label: "Na maioria das vezes" },
        { value: 6, label: "Quase o tempo todo" }
      ]
    },
    {
      id: 6,
      text: "Você teve catarro?",
      type: 'frequency' as const,
      scale: [
        { value: 0, label: "Nenhuma vez" },
        { value: 1, label: "Quase nunca" },
        { value: 2, label: "Poucas vezes" },
        { value: 3, label: "Algumas vezes" },
        { value: 4, label: "Muitas vezes" },
        { value: 5, label: "Na maioria das vezes" },
        { value: 6, label: "Quase o tempo todo" }
      ]
    },
    {
      id: 7,
      text: "O quanto você se sentiu limitado/a ao fazer atividades físicas cansativas (como subir escadas, se apressar, praticar esportes)?",
      type: 'limitation' as const,
      scale: [
        { value: 0, label: "Nem um pouco limitado/a" },
        { value: 1, label: "Muito pouco limitado/a" },
        { value: 2, label: "Pouco limitado/a" },
        { value: 3, label: "Moderadamente limitado/a" },
        { value: 4, label: "Muito limitado/a" },
        { value: 5, label: "Extremamente limitado/a" },
        { value: 6, label: "Totalmente limitado/a" }
      ]
    },
    {
      id: 8,
      text: "O quanto você se sentiu limitado/a ao fazer atividades físicas moderadas (como andar, fazer tarefas domésticas, fazer pequenos concertos domésticos, carregar coisas)?",
      type: 'limitation' as const,
      scale: [
        { value: 0, label: "Nem um pouco limitado/a" },
        { value: 1, label: "Muito pouco limitado/a" },
        { value: 2, label: "Pouco limitado/a" },
        { value: 3, label: "Moderadamente limitado/a" },
        { value: 4, label: "Muito limitado/a" },
        { value: 5, label: "Extremamente limitado/a" },
        { value: 6, label: "Totalmente limitado/a" }
      ]
    },
    {
      id: 9,
      text: "O quanto você se sentiu limitado/a ao fazer atividades do dia-a-dia em casa (como se vestir, tomar banho)?",
      type: 'limitation' as const,
      scale: [
        { value: 0, label: "Nem um pouco limitado/a" },
        { value: 1, label: "Muito pouco limitado/a" },
        { value: 2, label: "Pouco limitado/a" },
        { value: 3, label: "Moderadamente limitado/a" },
        { value: 4, label: "Muito limitado/a" },
        { value: 5, label: "Extremamente limitado/a" },
        { value: 6, label: "Totalmente limitado/a" }
      ]
    },
    {
      id: 10,
      text: "O quanto você se sentiu limitado/a ao fazer atividades sociais (como conversar, estar com crianças, visitar amigos ou parentes)?",
      type: 'limitation' as const,
      scale: [
        { value: 0, label: "Nem um pouco limitado/a" },
        { value: 1, label: "Muito pouco limitado/a" },
        { value: 2, label: "Pouco limitado/a" },
        { value: 3, label: "Moderadamente limitado/a" },
        { value: 4, label: "Muito limitado/a" },
        { value: 5, label: "Extremamente limitado/a" },
        { value: 6, label: "Totalmente limitado/a" }
      ]
    }
  ];

  const handleAnswerChange = (questionId: number, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const calculateScore = () => {
    const totalScore = Object.values(answers).reduce((sum, value) => sum + value, 0);
    const averageScore = totalScore / 10; // CCQ uses average score
    return {
      total: totalScore,
      average: Number(averageScore.toFixed(1))
    };
  };

  const getInterpretation = (averageScore: number) => {
    if (averageScore <= 1.0) {
      return {
        level: 'Muito Boa',
        description: 'Controle muito bom da DPOC. Os sintomas estão bem controlados.',
        color: 'text-green-600'
      };
    } else if (averageScore <= 2.0) {
      return {
        level: 'Boa',
        description: 'Controle bom da DPOC. Alguns sintomas presentes, mas manejáveis.',
        color: 'text-blue-600'
      };
    } else if (averageScore <= 3.0) {
      return {
        level: 'Moderada',
        description: 'Controle moderado da DPOC. Sintomas afetam algumas atividades.',
        color: 'text-yellow-600'
      };
    } else if (averageScore <= 4.0) {
      return {
        level: 'Ruim',
        description: 'Controle ruim da DPOC. Sintomas afetam significativamente a qualidade de vida.',
        color: 'text-orange-600'
      };
    } else {
      return {
        level: 'Muito Ruim',
        description: 'Controle muito ruim da DPOC. Sintomas graves afetam severamente a qualidade de vida.',
        color: 'text-red-600'
      };
    }
  };

  const handleSubmit = () => {
    const score = calculateScore();
    const interpretation = getInterpretation(score.average);
    
    // Save to localStorage
    const result = {
      patientData,
      answers,
      score,
      interpretation,
      date: new Date().toISOString(),
      questionnaire: 'CCQ'
    };
    
    const existingResults = JSON.parse(localStorage.getItem('questionnaireResults') || '[]');
    existingResults.push(result);
    localStorage.setItem('questionnaireResults', JSON.stringify(existingResults));
    
    setShowResult(true);
  };

  const canSubmit = Object.keys(answers).length === questions.length;

  const resetQuestionnaire = () => {
    setAnswers({});
    setShowResult(false);
  };

  if (showResult) {
    const score = calculateScore();
    const interpretation = getInterpretation(score.average);
    
    return (
      <CCQResult
        patientData={patientData}
        answers={answers}
        score={score}
        interpretation={interpretation}
        onReset={resetQuestionnaire}
      />
    );
  }

  return (
    <CCQQuestionnaireForm
      questions={questions}
      answers={answers}
      onAnswerChange={handleAnswerChange}
      onSubmit={handleSubmit}
      canSubmit={canSubmit}
    />
  );
};

export default CCQQuestionnaire;