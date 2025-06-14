
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Stethoscope, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
    const IconComponent = interpretation.icon;

    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="bg-white shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-2xl">
              <Stethoscope className="h-6 w-6 text-green-600" />
              Resultado do ACQ
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-6xl font-bold text-green-600 mb-2">
                {score.toFixed(2)}
              </div>
              <div className="text-lg text-gray-600">
                pontos (0-6)
              </div>
            </div>

            <div className={`p-6 rounded-lg border-2 ${interpretation.bgColor} ${interpretation.borderColor}`}>
              <div className="flex items-center gap-3 mb-3">
                <IconComponent className={`h-6 w-6 ${interpretation.color}`} />
                <h3 className={`text-xl font-semibold ${interpretation.color}`}>
                  {interpretation.level}
                </h3>
              </div>
              <p className="text-gray-700">
                {interpretation.description}
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Interpretação dos Escores ACQ:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• <strong>≤ 0,75:</strong> Asma bem controlada</li>
                <li>• <strong>0,76 - 1,50:</strong> Asma parcialmente controlada</li>
                <li>• <strong>≥ 1,51:</strong> Asma não controlada</li>
              </ul>
            </div>

            {patientData.name && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2">Dados do Paciente:</h4>
                <p><strong>Nome:</strong> {patientData.name}</p>
                {patientData.age && <p><strong>Idade:</strong> {patientData.age} anos</p>}
                {patientData.gender && <p><strong>Sexo:</strong> {patientData.gender === 'M' ? 'Masculino' : 'Feminino'}</p>}
                <p><strong>Data:</strong> {new Date().toLocaleDateString('pt-BR')}</p>
              </div>
            )}

            <div className="flex gap-3">
              <Button onClick={saveResults} className="flex-1">
                Salvar Resultados
              </Button>
              <Button onClick={resetQuestionnaire} variant="outline" className="flex-1">
                Novo Teste
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Stethoscope className="h-5 w-5 text-green-600" />
              ACQ - Questionário de Controle da Asma
            </CardTitle>
            <Badge variant="outline">
              {currentQuestion + 1} de {questions.length}
            </Badge>
          </div>
          <Progress value={progress} className="mt-2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              {questions[currentQuestion].text}
            </h3>
            {currentQuestion === 6 && (
              <p className="text-sm text-gray-600 mb-4 italic">
                Esta pergunta é opcional. Se você não souber o valor do Pico de Fluxo Expiratório, pode pular para finalizar.
              </p>
            )}
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswerSelect(option.value)}
                  className={`w-full p-4 text-left border-2 rounded-lg transition-all duration-200 hover:bg-green-50 ${
                    answers[currentQuestion] === option.value
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option.text}</span>
                    <span className="text-sm text-gray-500">
                      {option.value} {option.value === 1 ? 'ponto' : 'pontos'}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <Button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              variant="outline"
            >
              Anterior
            </Button>
            <Button onClick={handleNext}>
              {currentQuestion === questions.length - 1 ? 'Finalizar' : 'Próxima'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ACQQuestionnaire;
