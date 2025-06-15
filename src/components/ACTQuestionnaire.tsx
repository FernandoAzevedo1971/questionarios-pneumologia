import React, { useState } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Activity, AlertCircle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ACTResultCard from './ACTResultCard';
import ACTQuestionStep from './ACTQuestionStep';

interface ACTQuestionnaireProps {
  patientData: {
    name: string;
    age: string;
    gender: string;
  };
}

const ACTQuestionnaire: React.FC<ACTQuestionnaireProps> = ({ patientData }) => {
  const { toast } = useToast();
  const [answers, setAnswers] = useState<number[]>(new Array(5).fill(0));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 1,
      text: "Nas últimas 4 semanas, quanto tempo sua asma o impediu de fazer tanto quanto normalmente faz no trabalho, na escola ou em casa?",
      options: [
        { value: 1, text: "O tempo todo" },
        { value: 2, text: "A maior parte do tempo" },
        { value: 3, text: "Algumas vezes" },
        { value: 4, text: "Pouco tempo" },
        { value: 5, text: "Nunca" }
      ]
    },
    {
      id: 2,
      text: "Nas últimas 4 semanas, com que frequência você teve falta de ar?",
      options: [
        { value: 1, text: "Mais de uma vez por dia" },
        { value: 2, text: "Uma vez por dia" },
        { value: 3, text: "3 a 6 vezes por semana" },
        { value: 4, text: "Uma ou duas vezes por semana" },
        { value: 5, text: "Nunca" }
      ]
    },
    {
      id: 3,
      text: "Nas últimas 4 semanas, com que frequência seus sintomas de asma (chiado, tosse, falta de ar, aperto no peito ou dor) acordaram você durante a noite ou mais cedo de manhã do que o habitual?",
      options: [
        { value: 1, text: "4 ou mais noites por semana" },
        { value: 2, text: "2 ou 3 noites por semana" },
        { value: 3, text: "Uma vez por semana" },
        { value: 4, text: "Uma ou duas vezes" },
        { value: 5, text: "Nunca" }
      ]
    },
    {
      id: 4,
      text: "Nas últimas 4 semanas, com que frequência você usou seu medicamento de alívio ou nebulização (como salbutamol)?",
      options: [
        { value: 1, text: "3 ou mais vezes por dia" },
        { value: 2, text: "1 ou 2 vezes por dia" },
        { value: 3, text: "2 ou 3 vezes por semana" },
        { value: 4, text: "Uma vez por semana ou menos" },
        { value: 5, text: "Nunca" }
      ]
    },
    {
      id: 5,
      text: "Como você classificaria o controle de sua asma nas últimas 4 semanas?",
      options: [
        { value: 1, text: "Nada controlada" },
        { value: 2, text: "Pouco controlada" },
        { value: 3, text: "Moderadamente controlada" },
        { value: 4, text: "Bem controlada" },
        { value: 5, text: "Completamente controlada" }
      ]
    }
  ];

  const handleAnswerSelect = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (answers[currentQuestion] === 0) {
      toast({
        title: "Resposta obrigatória",
        description: "Por favor, selecione uma resposta antes de continuar.",
        variant: "destructive"
      });
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsCompleted(true);
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    return answers.reduce((sum, answer) => sum + answer, 0);
  };

  const getInterpretation = (score: number) => {
    if (score >= 20) {
      return {
        level: "Bem controlada",
        description: "Sua asma está bem controlada. Continue com o tratamento atual e mantenha acompanhamento médico regular.",
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        icon: CheckCircle
      };
    } else if (score >= 16) {
      return {
        level: "Parcialmente controlada",
        description: "Sua asma está parcialmente controlada. Converse com seu médico sobre possíveis ajustes no tratamento.",
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-200",
        icon: AlertCircle
      };
    } else {
      return {
        level: "Não controlada",
        description: "Sua asma não está controlada. É importante procurar seu médico para revisão e ajuste do tratamento.",
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        icon: AlertCircle
      };
    }
  };

  const resetQuestionnaire = () => {
    setAnswers(new Array(5).fill(0));
    setCurrentQuestion(0);
    setIsCompleted(false);
    setShowResults(false);
  };

  const saveResults = () => {
    const results = {
      questionnaire: 'ACT',
      patientData,
      answers,
      score: calculateScore(),
      interpretation: getInterpretation(calculateScore()),
      date: new Date().toISOString(),
    };
    
    const existingResults = JSON.parse(localStorage.getItem('asmacheck_results') || '[]');
    existingResults.push(results);
    localStorage.setItem('asmacheck_results', JSON.stringify(existingResults));
    
    toast({
      title: "Resultados salvos",
      description: "Os resultados foram salvos no histórico do paciente.",
    });
  };

  if (showResults) {
    const score = calculateScore();
    const interpretation = getInterpretation(score);

    return (
      <ACTResultCard
        score={score}
        interpretation={interpretation}
        patientData={patientData}
        onSave={saveResults}
        onReset={resetQuestionnaire}
      />
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <Card className="bg-white/80 border-0 shadow-xl backdrop-blur-sm animate-scale-in">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 font-bold text-primary-700">
              <Activity className="h-5 w-5 text-blue-600" />
              ACT - Teste de Controle da Asma
            </CardTitle>
            <Badge variant="outline" className="border-primary-100 text-blue-600">
              {currentQuestion + 1} de {questions.length}
            </Badge>
          </div>
          <Progress value={progress} className="mt-2" />
        </CardHeader>
        <div className="p-6">
          <ACTQuestionStep
            question={questions[currentQuestion]}
            answer={answers[currentQuestion]}
            onSelect={handleAnswerSelect}
            onPrevious={handlePrevious}
            onNext={handleNext}
            questionIndex={currentQuestion}
            totalQuestions={questions.length}
          />
        </div>
      </Card>
    </div>
  );
};

export default ACTQuestionnaire;
