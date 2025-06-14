
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wind, AlertCircle, CheckCircle2 } from 'lucide-react';

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
      <div className="space-y-6">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wind className="h-6 w-6 text-orange-600" />
              Resultado do CAT - Teste de Avaliação da DPOC
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="text-6xl font-bold text-orange-600">
                {score}
              </div>
              <div className="text-xl text-gray-600">
                pontos (0-40)
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`${interpretation.bgColor} ${interpretation.borderColor} border-2`}>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${interpretation.color}`}>
              <CheckCircle2 className="h-5 w-5" />
              Interpretação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge className={`${interpretation.color} bg-white`}>
                  {interpretation.level}
                </Badge>
              </div>
              <p className={`${interpretation.color} font-medium`}>
                {interpretation.description}
              </p>
              <div className={`text-sm ${interpretation.color} bg-white/50 p-3 rounded-lg`}>
                <strong>Nota:</strong> O CAT é um questionário para avaliar o impacto da DPOC na vida diária. 
                Discuta este resultado com seu médico para um plano de tratamento adequado.
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button onClick={resetQuestionnaire} variant="outline" className="flex-1">
            Fazer Novo Teste
          </Button>
          <Button onClick={() => window.print()} className="flex-1">
            Imprimir Resultado
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wind className="h-6 w-6 text-orange-600" />
            CAT - Teste de Avaliação da DPOC
          </CardTitle>
          <p className="text-gray-600">
            Este questionário avalia como a DPOC afeta sua vida. Para cada item, 
            marque na escala de 0 a 5 o ponto que melhor descreve sua situação atual.
          </p>
        </CardHeader>
      </Card>

      {questions.map((question, index) => (
        <Card key={question.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-gray-800">
              {question.id}. Situação atual:
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <strong>0:</strong> {question.text}
              </div>
              <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                <strong>5:</strong> {question.opposite}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>{question.leftLabel}</span>
                <span>{question.rightLabel}</span>
              </div>
              <div className="flex justify-between items-center">
                {[0, 1, 2, 3, 4, 5].map((value) => (
                  <label key={value} className="flex flex-col items-center cursor-pointer">
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={value}
                      checked={answers[index] === value}
                      onChange={() => handleAnswerChange(index, value)}
                      className="mb-1 w-4 h-4 text-orange-600 focus:ring-orange-500"
                    />
                    <span className="text-sm font-medium">{value}</span>
                  </label>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Card className="bg-blue-50 border-blue-200 border-2">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <strong>Importante:</strong> Responda todas as questões baseando-se em como você se sente atualmente. 
              Este questionário foi validado para pessoas com DPOC diagnosticada.
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {canSubmit ? 'Calcular Resultado' : `Responda todas as questões (${answers.filter(a => a !== -1).length}/8)`}
        </Button>
      </div>
    </div>
  );
};

export default CATQuestionnaire;
