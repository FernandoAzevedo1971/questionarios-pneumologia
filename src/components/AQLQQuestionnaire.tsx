
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, BarChart3, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AQLQQuestionnaireProps {
  patientData: {
    name: string;
    age: string;
    gender: string;
  };
}

const AQLQQuestionnaire: React.FC<AQLQQuestionnaireProps> = ({ patientData }) => {
  const { toast } = useToast();
  const [answers, setAnswers] = useState<number[]>(new Array(12).fill(0));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 1,
      domain: "Limitação de Atividades",
      text: "Nas últimas 2 semanas, o quanto você se sentiu incomodado por tossir?",
      options: [
        { value: 7, text: "Nada incomodado" },
        { value: 6, text: "Quase nada incomodado" },
        { value: 5, text: "Pouco incomodado" },
        { value: 4, text: "Moderadamente incomodado" },
        { value: 3, text: "Bastante incomodado" },
        { value: 2, text: "Muito incomodado" },
        { value: 1, text: "Extremamente incomodado" }
      ]
    },
    {
      id: 2,
      domain: "Limitação de Atividades",
      text: "Nas últimas 2 semanas, o quanto você se sentiu incomodado por ter catarro/secreção?",
      options: [
        { value: 7, text: "Nada incomodado" },
        { value: 6, text: "Quase nada incomodado" },
        { value: 5, text: "Pouco incomodado" },
        { value: 4, text: "Moderadamente incomodado" },
        { value: 3, text: "Bastante incomodado" },
        { value: 2, text: "Muito incomodado" },
        { value: 1, text: "Extremamente incomodado" }
      ]
    },
    {
      id: 3,
      domain: "Limitação de Atividades",
      text: "Nas últimas 2 semanas, o quanto você se sentiu incomodado por ter falta de ar?",
      options: [
        { value: 7, text: "Nada incomodado" },
        { value: 6, text: "Quase nada incomodado" },
        { value: 5, text: "Pouco incomodado" },
        { value: 4, text: "Moderadamente incomodado" },
        { value: 3, text: "Bastante incomodado" },
        { value: 2, text: "Muito incomodado" },
        { value: 1, text: "Extremamente incomodado" }
      ]
    },
    {
      id: 4,
      domain: "Limitação de Atividades",
      text: "Nas últimas 2 semanas, com que frequência você teve que evitar fazer uma atividade por causa da sua asma?",
      options: [
        { value: 7, text: "Nunca" },
        { value: 6, text: "Quase nunca" },
        { value: 5, text: "Poucas vezes" },
        { value: 4, text: "Algumas vezes" },
        { value: 3, text: "Muitas vezes" },
        { value: 2, text: "Quase sempre" },
        { value: 1, text: "Sempre" }
      ]
    },
    {
      id: 5,
      domain: "Sintomas",
      text: "Nas últimas 2 semanas, com que frequência você sentiu falta de ar?",
      options: [
        { value: 7, text: "Nunca" },
        { value: 6, text: "Quase nunca" },
        { value: 5, text: "Poucas vezes" },
        { value: 4, text: "Algumas vezes" },
        { value: 3, text: "Muitas vezes" },
        { value: 2, text: "Quase sempre" },
        { value: 1, text: "Sempre" }
      ]
    },
    {
      id: 6,
      domain: "Sintomas",
      text: "Nas últimas 2 semanas, com que frequência você teve chiado no peito?",
      options: [
        { value: 7, text: "Nunca" },
        { value: 6, text: "Quase nunca" },
        { value: 5, text: "Poucas vezes" },
        { value: 4, text: "Algumas vezes" },
        { value: 3, text: "Muitas vezes" },
        { value: 2, text: "Quase sempre" },
        { value: 1, text: "Sempre" }
      ]
    },
    {
      id: 7,
      domain: "Função Emocional",
      text: "Nas últimas 2 semanas, com que frequência você se sentiu frustrado por causa da sua asma?",
      options: [
        { value: 7, text: "Nunca" },
        { value: 6, text: "Quase nunca" },
        { value: 5, text: "Poucas vezes" },
        { value: 4, text: "Algumas vezes" },
        { value: 3, text: "Muitas vezes" },
        { value: 2, text: "Quase sempre" },
        { value: 1, text: "Sempre" }
      ]
    },
    {
      id: 8,
      domain: "Função Emocional",
      text: "Nas últimas 2 semanas, com que frequência você se sentiu preocupado por ter asma?",
      options: [
        { value: 7, text: "Nunca" },
        { value: 6, text: "Quase nunca" },
        { value: 5, text: "Poucas vezes" },
        { value: 4, text: "Algumas vezes" },
        { value: 3, text: "Muitas vezes" },
        { value: 2, text: "Quase sempre" },
        { value: 1, text: "Sempre" }
      ]
    },
    {
      id: 9,
      domain: "Exposição Ambiental",
      text: "Nas últimas 2 semanas, com que frequência você teve que evitar uma situação ou ambiente por causa de fumaça, odores fortes ou cheiros?",
      options: [
        { value: 7, text: "Nunca" },
        { value: 6, text: "Quase nunca" },
        { value: 5, text: "Poucas vezes" },
        { value: 4, text: "Algumas vezes" },
        { value: 3, text: "Muitas vezes" },
        { value: 2, text: "Quase sempre" },
        { value: 1, text: "Sempre" }
      ]
    },
    {
      id: 10,
      domain: "Exposição Ambiental",
      text: "Nas últimas 2 semanas, com que frequência você teve que evitar sair de casa por causa do tempo ou da poluição do ar?",
      options: [
        { value: 7, text: "Nunca" },
        { value: 6, text: "Quase nunca" },
        { value: 5, text: "Poucas vezes" },
        { value: 4, text: "Algumas vezes" },
        { value: 3, text: "Muitas vezes" },
        { value: 2, text: "Quase sempre" },
        { value: 1, text: "Sempre" }
      ]
    },
    {
      id: 11,
      domain: "Limitação de Atividades",
      text: "Nas últimas 2 semanas, com que frequência sua asma interferiu em seu sono?",
      options: [
        { value: 7, text: "Nunca" },
        { value: 6, text: "Quase nunca" },
        { value: 5, text: "Poucas vezes" },
        { value: 4, text: "Algumas vezes" },
        { value: 3, text: "Muitas vezes" },
        { value: 2, text: "Quase sempre" },
        { value: 1, text: "Sempre" }
      ]
    },
    {
      id: 12,
      domain: "Limitação de Atividades",
      text: "Nas últimas 2 semanas, com que frequência você evitou atividades por medo de não ter sua medicação de alívio (bombinha) por perto?",
      options: [
        { value: 7, text: "Nunca" },
        { value: 6, text: "Quase nunca" },
        { value: 5, text: "Poucas vezes" },
        { value: 4, text: "Algumas vezes" },
        { value: 3, text: "Muitas vezes" },
        { value: 2, text: "Quase sempre" },
        { value: 1, text: "Sempre" }
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
    const sum = answers.reduce((total, answer) => total + answer, 0);
    return sum / answers.length;
  };

  const calculateDomainScores = () => {
    const domains = {
      'Limitação de Atividades': [0, 1, 2, 3, 10, 11], // questões 1,2,3,4,11,12
      'Sintomas': [4, 5], // questões 5,6
      'Função Emocional': [6, 7], // questões 7,8
      'Exposição Ambiental': [8, 9] // questões 9,10
    };

    const domainScores: { [key: string]: number } = {};
    
    Object.entries(domains).forEach(([domain, questionIndices]) => {
      const domainSum = questionIndices.reduce((sum, index) => sum + answers[index], 0);
      domainScores[domain] = domainSum / questionIndices.length;
    });

    return domainScores;
  };

  const getInterpretation = (score: number) => {
    if (score >= 6.0) {
      return {
        level: "Excelente qualidade de vida",
        description: "Sua asma tem impacto mínimo na sua qualidade de vida. Continue com o tratamento atual.",
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        icon: CheckCircle
      };
    } else if (score >= 5.0) {
      return {
        level: "Boa qualidade de vida",
        description: "Sua asma tem impacto leve na sua qualidade de vida. Monitore os sintomas regularmente.",
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
        icon: CheckCircle
      };
    } else if (score >= 4.0) {
      return {
        level: "Qualidade de vida moderada",
        description: "Sua asma tem impacto moderado na sua qualidade de vida. Considere discutir ajustes no tratamento.",
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-200",
        icon: AlertCircle
      };
    } else {
      return {
        level: "Qualidade de vida comprometida",
        description: "Sua asma tem impacto significativo na sua qualidade de vida. É importante revisar o tratamento com seu médico.",
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        icon: AlertCircle
      };
    }
  };

  const resetQuestionnaire = () => {
    setAnswers(new Array(12).fill(0));
    setCurrentQuestion(0);
    setIsCompleted(false);
    setShowResults(false);
  };

  const saveResults = () => {
    const results = {
      questionnaire: 'AQLQ-S',
      patientData,
      answers,
      score: calculateScore(),
      domainScores: calculateDomainScores(),
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
    const domainScores = calculateDomainScores();
    const interpretation = getInterpretation(score);
    const IconComponent = interpretation.icon;

    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="bg-white shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-2xl">
              <BarChart3 className="h-6 w-6 text-purple-600" />
              Resultado do AQLQ-S
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-6xl font-bold text-purple-600 mb-2">
                {score.toFixed(1)}
              </div>
              <div className="text-lg text-gray-600">
                de 7.0 pontos
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

            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-medium text-purple-800 mb-3">Pontuação por Domínio:</h4>
              <div className="space-y-2">
                {Object.entries(domainScores).map(([domain, domainScore]) => (
                  <div key={domain} className="flex justify-between items-center">
                    <span className="text-sm text-purple-700">{domain}:</span>
                    <span className="font-medium text-purple-800">{domainScore.toFixed(1)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Interpretação dos Escores AQLQ-S:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• <strong>6,0 - 7,0:</strong> Excelente qualidade de vida</li>
                <li>• <strong>5,0 - 5,9:</strong> Boa qualidade de vida</li>
                <li>• <strong>4,0 - 4,9:</strong> Qualidade de vida moderada</li>
                <li>• <strong>&lt; 4,0:</strong> Qualidade de vida comprometida</li>
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
  const currentQ = questions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-purple-600" />
              AQLQ-S - Qualidade de Vida na Asma
            </CardTitle>
            <Badge variant="outline">
              {currentQuestion + 1} de {questions.length}
            </Badge>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="secondary" className="text-xs">
              {currentQ.domain}
            </Badge>
            <Progress value={progress} className="flex-1" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              {currentQ.text}
            </h3>
            <div className="space-y-3">
              {currentQ.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswerSelect(option.value)}
                  className={`w-full p-4 text-left border-2 rounded-lg transition-all duration-200 hover:bg-purple-50 ${
                    answers[currentQuestion] === option.value
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-purple-300'
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

export default AQLQQuestionnaire;
