
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, AlertCircle, Activity } from 'lucide-react';

interface BORGQuestionnaireFormProps {
  selectedScore: number;
  context: string;
  onScoreSelect: (score: number) => void;
  onContextChange: (context: string) => void;
  onSubmit: () => void;
}

const BORGQuestionnaireForm: React.FC<BORGQuestionnaireFormProps> = ({
  selectedScore,
  context,
  onScoreSelect,
  onContextChange,
  onSubmit
}) => {
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
            onChange={(e) => onContextChange(e.target.value)}
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
                onChange={() => onScoreSelect(item.score)}
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
          onClick={onSubmit}
          disabled={selectedScore === -1}
          className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {selectedScore !== -1 ? 'Ver Resultado' : 'Selecione uma pontuação'}
        </Button>
      </div>
    </div>
  );
};

export default BORGQuestionnaireForm;
