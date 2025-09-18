import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Stethoscope, RotateCcw, Download, User, Calendar } from 'lucide-react';

interface CCQResultProps {
  patientData: {
    name: string;
    age: string;
    gender: string;
  };
  answers: { [key: number]: number };
  score: {
    total: number;
    average: number;
  };
  interpretation: {
    level: string;
    description: string;
    color: string;
  };
  onReset: () => void;
}

const CCQResult: React.FC<CCQResultProps> = ({
  patientData,
  answers,
  score,
  interpretation,
  onReset
}) => {
  const currentDate = new Date().toLocaleDateString('pt-BR');

  const handleDownload = () => {
    const resultData = {
      questionnaire: 'CCQ - Questionário Clínico sobre DPOC',
      patientData,
      date: currentDate,
      score,
      interpretation,
      answers
    };

    const dataStr = JSON.stringify(resultData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `CCQ_${patientData.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const getScoreColor = (average: number) => {
    if (average <= 1.0) return 'bg-green-100 text-green-800 border-green-300';
    if (average <= 2.0) return 'bg-blue-100 text-blue-800 border-blue-300';
    if (average <= 3.0) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    if (average <= 4.0) return 'bg-orange-100 text-orange-800 border-orange-300';
    return 'bg-red-100 text-red-800 border-red-300';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-red-50">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-3 text-3xl font-bold text-orange-800">
            <div className="p-2 bg-orange-100 rounded-full">
              <Stethoscope className="h-8 w-8 text-orange-600" />
            </div>
            Resultado CCQ
          </CardTitle>
          <p className="text-orange-700 mt-2">Questionário Clínico sobre DPOC</p>
        </CardHeader>
      </Card>

      {/* Patient Info */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <User className="h-5 w-5" />
            Informações do Paciente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <span className="font-medium text-gray-600">Nome:</span>
              <p className="text-lg">{patientData.name || 'Não informado'}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Idade:</span>
              <p className="text-lg">{patientData.age || 'Não informada'}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Gênero:</span>
              <p className="text-lg">{patientData.gender || 'Não informado'}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>Data da avaliação: {currentDate}</span>
          </div>
        </CardContent>
      </Card>

      {/* Score Results */}
      <Card className={`border-2 ${getScoreColor(score.average)}`}>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Pontuação CCQ</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="space-y-2">
            <div className="text-4xl font-bold">
              {score.average}
            </div>
            <p className="text-lg">Pontuação Média CCQ</p>
            <p className="text-sm text-gray-600">
              (Pontuação Total: {score.total}/60)
            </p>
          </div>
          
          <Badge className={`text-lg px-4 py-2 ${interpretation.color.replace('text-', 'bg-').replace('-600', '-100')} ${interpretation.color} border-current`}>
            Controle: {interpretation.level}
          </Badge>
          
          <p className="text-gray-700 max-w-2xl mx-auto">
            {interpretation.description}
          </p>
        </CardContent>
      </Card>

      {/* Detailed Interpretation */}
      <Card className="border-blue-200 bg-blue-50/30">
        <CardHeader>
          <CardTitle className="text-xl text-blue-800">Interpretação Detalhada</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-blue-700 mb-2">Escala de Interpretação CCQ:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="flex justify-between p-2 bg-green-100 rounded border-l-4 border-green-500">
                  <span>0.0 - 1.0</span>
                  <span className="font-medium text-green-700">Muito Boa</span>
                </div>
                <div className="flex justify-between p-2 bg-blue-100 rounded border-l-4 border-blue-500">
                  <span>1.1 - 2.0</span>
                  <span className="font-medium text-blue-700">Boa</span>
                </div>
                <div className="flex justify-between p-2 bg-yellow-100 rounded border-l-4 border-yellow-500">
                  <span>2.1 - 3.0</span>
                  <span className="font-medium text-yellow-700">Moderada</span>
                </div>
                <div className="flex justify-between p-2 bg-orange-100 rounded border-l-4 border-orange-500">
                  <span>3.1 - 4.0</span>
                  <span className="font-medium text-orange-700">Ruim</span>
                </div>
                <div className="flex justify-between p-2 bg-red-100 rounded border-l-4 border-red-500 md:col-span-2">
                  <span>4.1 - 6.0</span>
                  <span className="font-medium text-red-700">Muito Ruim</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-white rounded-lg border">
              <h4 className="font-semibold text-gray-800 mb-2">Recomendações:</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Discuta os resultados com seu médico pneumologista</li>
                <li>• O CCQ avalia sintomas e limitações funcionais relacionadas à DPOC</li>
                <li>• Scores mais altos indicam maior impacto da doença na qualidade de vida</li>
                <li>• Use este resultado para monitorar mudanças ao longo do tempo</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Card className="border-gray-200">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onReset}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Refazer Questionário
            </Button>
            <Button
              onClick={handleDownload}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Baixar Resultado
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CCQResult;