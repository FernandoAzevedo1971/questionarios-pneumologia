
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart3, AlertCircle, CheckCircle2, Activity } from 'lucide-react';

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

  const borgScale = [
    { score: 0, description: "Nenhuma falta de ar" },
    { score: 0.5, description: "Falta de ar muito, muito leve (quase imperceptível)" },
    { score: 1, description: "Falta de ar muito leve" },
    { score: 2, description: "Falta de ar leve" },
    { score: 3, description: "Falta de ar moderada" },
    { score: 4, description: "Falta de ar um pouco intensa" },
    { score: 5, description: "Falta de ar intensa" },
    { score: 6, description: "Falta de ar intensa (mais intensa)" },
    { score: 7, description: "Falta de ar muito intensa" },
    { score: 8, description: "Falta de ar muito intensa (mais intensa)" },
    { score: 9, description: "Falta de ar muito, muito intensa (quase máxima)" },
    { score: 10, description: "Falta de ar máxima" }
  ];

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

  const interpretation = showResult ? getInterpretation(selectedScore) : null;

  const resetQuestionnaire = () => {
    setSelectedScore(-1);
    setShowResult(false);
    setContext('');
  };

  if (showResult && interpretation) {
    return (
      <div className="space-y-6">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-indigo-600" />
              Resultado da Escala de BORG
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="text-6xl font-bold text-indigo-600">
                {selectedScore}
              </div>
              <div className="text-xl text-gray-600">
                Pontuação BORG (0-10)
              </div>
              {context && (
                <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                  <strong>Contexto:</strong> {context}
                </div>
              )}
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
                <Badge variant="outline">
                  Intensidade: {interpretation.severity}
                </Badge>
              </div>
              <p className={`${interpretation.color} font-medium`}>
                {interpretation.description}
              </p>
              <div className={`text-sm ${interpretation.color} bg-white/50 p-3 rounded-lg`}>
                <strong>Aplicação clínica:</strong> A escala de BORG é útil para:
                <ul className="mt-2 list-disc list-inside space-y-1">
                  <li>Monitoramento durante exercícios e reabilitação pulmonar</li>
                  <li>Avaliação da resposta ao tratamento</li>
                  <li>Orientação para intensidade de atividade física segura</li>
                  <li>Comunicação efetiva sobre sintomas com a equipe médica</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button onClick={resetQuestionnaire} variant="outline" className="flex-1">
            Nova Avaliação
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
            <BarChart3 className="h-6 w-6 text-indigo-600" />
            Escala de BORG - Percepção de Esforço Respiratório
          </CardTitle>
          <p className="text-gray-600">
            A escala de BORG avalia sua percepção subjetiva de falta de ar. 
            Selecione o número que melhor representa sua sensação atual ou durante uma atividade específica.
          </p>
        </CardHeader>
      </Card>

      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Contexto da Avaliação (Opcional)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            rows={2}
            placeholder="Ex: Durante caminhada, subindo escadas, em repouso, após exercício..."
            value={context}
            onChange={(e) => setContext(e.target.value)}
          />
        </CardContent>
      </Card>

      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg">
            Como está sua falta de ar neste momento?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {borgScale.map((item) => (
            <label
              key={item.score}
              className={`flex items-center gap-4 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                selectedScore === item.score
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-25'
              }`}
            >
              <input
                type="radio"
                name="borg-score"
                value={item.score}
                checked={selectedScore === item.score}
                onChange={() => setSelectedScore(item.score)}
                className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
              />
              <div className="flex items-center gap-3 flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  selectedScore === item.score ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
                }`}>
                  {item.score}
                </div>
                <span className="text-gray-700 text-sm">
                  {item.description}
                </span>
              </div>
            </label>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-blue-200 border-2">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <strong>Como usar a escala de BORG:</strong>
              <ul className="mt-2 space-y-1 list-disc list-inside">
                <li>0 = Nenhuma falta de ar (respiração normal)</li>
                <li>0,5-2 = Falta de ar leve (facilmente tolerável)</li>
                <li>3-4 = Falta de ar moderada (perceptível)</li>
                <li>5-6 = Falta de ar intensa (desconfortável)</li>
                <li>7-9 = Falta de ar muito intensa (dificilmente suportável)</li>
                <li>10 = Falta de ar máxima (a pior já experimentada)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button
          onClick={handleSubmit}
          disabled={selectedScore === -1}
          className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {selectedScore !== -1 ? 'Ver Resultado' : 'Selecione uma pontuação'}
        </Button>
      </div>
    </div>
  );
};

export default BORGQuestionnaire;
