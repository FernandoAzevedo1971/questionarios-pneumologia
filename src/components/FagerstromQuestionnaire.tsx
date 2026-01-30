
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Cigarette, BookOpen, ArrowRight, RotateCcw, Info } from 'lucide-react';
import FagerstromResult from './FagerstromResult';

interface PatientData {
  name: string;
  age: string;
  gender: string;
}

interface FagerstromQuestionnaireProps {
  patientData: PatientData;
  onComplete: () => void;
}

interface Question {
  id: number;
  text: string;
  options: { text: string; score: number }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "Em quanto tempo depois de acordar você fuma o primeiro cigarro?",
    options: [
      { text: "Dentro de 5 minutos", score: 3 },
      { text: "6-30 minutos", score: 2 },
      { text: "31-60 minutos", score: 1 },
      { text: "Depois de 60 minutos", score: 0 }
    ]
  },
  {
    id: 2,
    text: "Você acha difícil deixar de fumar em lugares onde é proibido (por exemplo, na igreja, no cinema, em bibliotecas, etc.)?",
    options: [
      { text: "Sim", score: 1 },
      { text: "Não", score: 0 }
    ]
  },
  {
    id: 3,
    text: "Que cigarro você mais sofreria em deixar?",
    options: [
      { text: "O primeiro da manhã", score: 1 },
      { text: "Qualquer um", score: 0 }
    ]
  },
  {
    id: 4,
    text: "Quantos cigarros você fuma por dia?",
    options: [
      { text: "31 ou mais", score: 3 },
      { text: "21-30", score: 2 },
      { text: "11-20", score: 1 },
      { text: "10 ou menos", score: 0 }
    ]
  },
  {
    id: 5,
    text: "Você fuma mais durante as primeiras horas após acordar do que durante o resto do dia?",
    options: [
      { text: "Sim", score: 1 },
      { text: "Não", score: 0 }
    ]
  },
  {
    id: 6,
    text: "Você fuma mesmo estando tão doente que precise ficar de cama quase todo o dia?",
    options: [
      { text: "Sim", score: 1 },
      { text: "Não", score: 0 }
    ]
  }
];

const FagerstromQuestionnaire: React.FC<FagerstromQuestionnaireProps> = ({
  patientData,
  onComplete
}) => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (questionId: number, score: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: score
    }));
  };

  const calculateSubtotal = () => {
    return Object.values(answers).reduce((sum, score) => sum + score, 0);
  };

  const allAnswered = Object.keys(answers).length === questions.length;

  const handleSubmit = () => {
    if (allAnswered) {
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setShowResult(false);
  };

  if (showResult) {
    return (
      <FagerstromResult
        score={calculateSubtotal()}
        patientData={patientData}
        onReset={handleReset}
        onComplete={onComplete}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Introdução */}
      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-800">
            <Info className="h-5 w-5" />
            Sobre o Teste de Fagerström
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-700 space-y-3">
          <p>
            O <strong>Teste de Fagerström para Dependência de Nicotina (FTND)</strong> é um instrumento 
            padronizado e amplamente utilizado para avaliar o grau de dependência física à nicotina 
            em fumantes. Desenvolvido por Karl Fagerström em 1978 e revisado em 1991, este questionário 
            é essencial na prática clínica para:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Identificar o nível de dependência nicotínica do paciente</li>
            <li>Auxiliar no planejamento do tratamento para cessação do tabagismo</li>
            <li>Determinar a necessidade e intensidade de terapia de reposição de nicotina</li>
            <li>Monitorar a evolução do paciente durante o tratamento</li>
          </ul>
          <p>
            A pontuação varia de 0 a 10 pontos, classificando a dependência em cinco níveis: 
            muito baixa, baixa, média, elevada e muito elevada.
          </p>
        </CardContent>
      </Card>

      {/* Cabeçalho do questionário */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-full">
                <Cigarette className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <CardTitle>Teste de Fagerström</CardTitle>
                <CardDescription>Avaliação da Dependência à Nicotina</CardDescription>
              </div>
            </div>
            <div className="text-right">
              <Badge variant="outline" className="text-lg px-4 py-2 bg-amber-100 text-amber-800 border-amber-300">
                Subtotal: {calculateSubtotal()} pontos
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Perguntas */}
      <div className="space-y-4">
        {questions.map((question, index) => (
          <Card key={question.id} className="bg-white/90 backdrop-blur-sm border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Badge className="bg-amber-500 text-white min-w-[32px] justify-center">
                    {index + 1}
                  </Badge>
                  <p className="text-gray-800 font-medium flex-1">{question.text}</p>
                </div>
                
                <div className="flex flex-col gap-2 ml-10">
                  {question.options.map((option, optIndex) => (
                    <Button
                      key={optIndex}
                      variant={answers[question.id] === option.score && 
                        Object.prototype.hasOwnProperty.call(answers, question.id) ? "default" : "outline"}
                      className={`justify-start h-auto py-3 px-4 text-left ${
                        answers[question.id] === option.score && 
                        Object.prototype.hasOwnProperty.call(answers, question.id)
                          ? 'bg-amber-500 hover:bg-amber-600 text-white'
                          : 'hover:bg-amber-50 hover:border-amber-300'
                      }`}
                      onClick={() => handleAnswer(question.id, option.score)}
                    >
                      <span className="flex items-center gap-2">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          answers[question.id] === option.score && 
                          Object.prototype.hasOwnProperty.call(answers, question.id)
                            ? 'bg-white text-amber-600'
                            : 'bg-amber-100 text-amber-600'
                        }`}>
                          {option.score}
                        </span>
                        {option.text}
                      </span>
                    </Button>
                  ))}
                </div>

                {Object.prototype.hasOwnProperty.call(answers, question.id) && (
                  <div className="ml-10 text-sm text-amber-600">
                    Pontuação desta questão: {answers[question.id]} ponto(s)
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Subtotal e Ações */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg sticky bottom-4">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-600">Questões respondidas</p>
                <p className="text-2xl font-bold text-amber-600">
                  {Object.keys(answers).length} / {questions.length}
                </p>
              </div>
              <div className="h-12 w-px bg-gray-200" />
              <div className="text-center">
                <p className="text-sm text-gray-600">Pontuação atual</p>
                <p className="text-2xl font-bold text-amber-600">{calculateSubtotal()}</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleReset}
                className="flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Reiniciar
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!allAnswered}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 flex items-center gap-2"
              >
                Ver Resultado
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Referências */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <BookOpen className="h-5 w-5 text-amber-600" />
            Referências Bibliográficas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-l-4 border-amber-500 pl-4 space-y-1">
            <p className="font-semibold text-gray-800">Questionário Original</p>
            <p className="text-sm text-gray-600">
              Fagerström KO, Schneider NG. Measuring nicotine dependence: a review of the Fagerström 
              Tolerance Questionnaire. <em>J Behav Med</em>. 1989;12(2):159-82. 
              DOI: 10.1007/BF00846549
            </p>
          </div>
          <div className="border-l-4 border-amber-500 pl-4 space-y-1">
            <p className="font-semibold text-gray-800">Versão Original do Teste</p>
            <p className="text-sm text-gray-600">
              Heatherton TF, Kozlowski LT, Frecker RC, Fagerström KO. The Fagerström Test for Nicotine 
              Dependence: a revision of the Fagerström Tolerance Questionnaire. <em>Br J Addict</em>. 
              1991;86(9):1119-27. DOI: 10.1111/j.1360-0443.1991.tb01879.x
            </p>
          </div>
          <div className="border-l-4 border-amber-500 pl-4 space-y-1">
            <p className="font-semibold text-gray-800">Validação em Português Brasileiro</p>
            <p className="text-sm text-gray-600">
              Carmo JT, Pueyo AA. A adaptação ao português do Fagerström Test for Nicotine Dependence 
              (FTND) para avaliar a dependência e tolerância à nicotina em fumantes brasileiros. 
              <em>Rev Bras Med</em>. 2002;59(1/2):73-80.
            </p>
          </div>
          <div className="border-l-4 border-amber-500 pl-4 space-y-1">
            <p className="font-semibold text-gray-800">Diretrizes Brasileiras</p>
            <p className="text-sm text-gray-600">
              Reichert J, Araújo AJ, Gonçalves CMC, et al. Diretrizes para cessação do tabagismo - 2008. 
              <em>J Bras Pneumol</em>. 2008;34(10):845-80. DOI: 10.1590/S1806-37132008001000014
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FagerstromQuestionnaire;
