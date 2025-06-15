import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, Progress } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Stethoscope } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ACQResultCard from './ACQResultCard';
import ACQQuestionStep from './ACQQuestionStep';

interface ACQQuestionnaireProps {
  patientData: {
    name: string;
    age: string;
    gender: string;
  };
}

const ACQQuestionnaire: React.FC<ACQQuestionnaireProps> = ({ patientData }) => {
  const { toast } = useToast();
  const [answers, setAnswers] = useState<number[]>(new Array(7).fill(-1));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 1,
      text: "Em média, durante as últimas 7 noites, com que frequência você acordou por causa de sua asma?",
      options: [
        { value: 0, text: "Nunca" },
        { value: 1, text: "Quase nunca" },
        { value: 2, text: "Poucas vezes" },
        { value: 3, text: "Várias vezes" },
        { value: 4, text: "Muitas vezes" },
        { value: 5, text: "Muitíssimas vezes" },
        { value: 6, text: "Não consegui dormir por causa da asma" }
      ]
    },
    {
      id: 2,
      text: "Em média, durante a última semana, quão ruins foram os seus sintomas de asma quando você acordou pela manhã?",
      options: [
        { value: 0, text: "Sem sintomas" },
        { value: 1, text: "Sintomas muito leves" },
        { value: 2, text: "Sintomas leves" },
        { value: 3, text: "Sintomas moderados" },
        { value: 4, text: "Sintomas um pouco graves" },
        { value: 5, text: "Sintomas graves" },
        { value: 6, text: "Sintomas muito graves" }
      ]
    },
    {
      id: 3,
      text: "De uma forma geral, durante a última semana, o quanto você se sentiu limitado em suas atividades por causa de sua asma?",
      options: [
        { value: 0, text: "Nada limitado" },
        { value: 1, text: "Muito pouco limitado" },
        { value: 2, text: "Pouco limitado" },
        { value: 3, text: "Moderadamente limitado" },
        { value: 4, text: "Muito limitado" },
        { value: 5, text: "Extremamente limitado" },
        { value: 6, text: "Totalmente limitado" }
      ]
    },
    {
      id: 4,
      text: "De uma forma geral, durante a última semana, o quanto você sentiu falta de ar por causa de sua asma?",
      options: [
        { value: 0, text: "Nenhuma falta de ar" },
        { value: 1, text: "Muito pouca falta de ar" },
        { value: 2, text: "Pouca falta de ar" },
        { value: 3, text: "Moderada falta de ar" },
        { value: 4, text: "Muita falta de ar" },
        { value: 5, text: "Extrema falta de ar" },
        { value: 6, text: "Máxima falta de ar" }
      ]
    },
    {
      id: 5,
      text: "De uma forma geral, durante a última semana, quanto tempo você teve chiado?",
      options: [
        { value: 0, text: "Nunca" },
        { value: 1, text: "Quase nunca" },
        { value: 2, text: "Pouco tempo" },
        { value: 3, text: "Moderado tempo" },
        { value: 4, text: "Muito tempo" },
        { value: 5, text: "Quase sempre" },
        { value: 6, text: "Sempre" }
      ]
    },
    {
      id: 6,
      text: "Em média, durante a última semana, quantas doses de broncodilatador de alívio (salbutamol, fenoterol) você usou por dia?",
      options: [
        { value: 0, text: "Nenhuma" },
        { value: 1, text: "1-2 doses por semana" },
        { value: 2, text: "3-6 doses por semana" },
        { value: 3, text: "1-2 doses por dia" },
        { value: 4, text: "3-4 doses por dia" },
        { value: 5, text: "5-8 doses por dia" },
        { value: 6, text: "Mais de 8 doses por dia" }
      ]
    },
    {
      id: 7,
      text: "Qual foi o seu melhor Pico de Fluxo Expiratório (PFE) na manhã de hoje? (Se não souber, deixe em branco)",
      options: [
        { value: 0, text: "Mais de 95% do meu melhor" },
        { value: 1, text: "95-90% do meu melhor" },
        { value: 2, text: "89-80% do meu melhor" },
        { value: 3, text: "79-70% do meu melhor" },
        { value: 4, text: "69-60% do meu melhor" },
        { value: 5, text: "59-50% do meu melhor" },
        { value: 6, text: "Menos de 50% do meu melhor" }
      ]
    }
  ];

  const handleAnswerSelect = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (answers[currentQuestion] === -1 && currentQuestion !== 6) { // Pergunta 7 é opcional
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
    const validAnswers = answers.filter((answer, index) => answer !== -1);
    if (validAnswers.length === 0) return 0;
    
    const sum = validAnswers.reduce((total, answer) => total + answer, 0);
    return sum / validAnswers.length;
  };

  const getInterpretation = (score: number) => {
    if (score <= 0.75) {
      return {
        level: "Bem controlada",
        description: "Sua asma está bem controlada. Continue com o tratamento atual e mantenha acompanhamento médico regular.",
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        icon: CheckCircle
      };
    } else if (score <= 1.50) {
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
    setAnswers(new Array(7).fill(-1));
    setCurrentQuestion(0);
    setIsCompleted(false);
    setShowResults(false);
  };

  const saveResults = () => {
    const results = {
      questionnaire: 'ACQ',
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
      <ACQResultCard
        score={score}
        interpretation={interpretation}
        patientData={patientData}
        onSave={saveResults}
        onReset={resetQuestionnaire}
      />
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isOptional = currentQuestion === 6;

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <Card className="bg-white/80 border-0 shadow-xl backdrop-blur-sm animate-scale-in">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 font-bold text-green-700">
              <Stethoscope className="h-5 w-5 text-green-600" />
              ACQ - Questionário de Controle da Asma
            </CardTitle>
            <Badge variant="outline" className="border-green-200 text-green-600">{currentQuestion + 1} de {questions.length}</Badge>
          </div>
          <Progress value={progress} className="mt-2" />
        </CardHeader>
        <div className="p-6">
          <ACQQuestionStep
            question={questions[currentQuestion]}
            answer={answers[currentQuestion]}
            onSelect={handleAnswerSelect}
            onPrevious={handlePrevious}
            onNext={handleNext}
            questionIndex={currentQuestion}
            totalQuestions={questions.length}
            isOptional={isOptional}
          />
        </div>
      </Card>
    </div>
  );
};

export default ACQQuestionnaire;
