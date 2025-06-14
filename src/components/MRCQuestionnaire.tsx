
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Gauge, AlertCircle, CheckCircle2 } from 'lucide-react';

interface MRCQuestionnaireProps {
  patientData: {
    name: string;
    age: string;
    gender: string;
  };
}

const MRCQuestionnaire = ({ patientData }: MRCQuestionnaireProps) => {
  const [selectedGrade, setSelectedGrade] = useState<number>(-1);
  const [showResult, setShowResult] = useState(false);

  const mrcGrades = [
    {
      grade: 0,
      description: "Só tenho falta de ar durante exercícios intensos"
    },
    {
      grade: 1,
      description: "Tenho falta de ar quando apresso o passo ou subo uma ladeira leve"
    },
    {
      grade: 2,
      description: "Ando mais devagar que pessoas da minha idade por causa da falta de ar, ou tenho que parar para respirar quando ando no meu próprio ritmo"
    },
    {
      grade: 3,
      description: "Paro para respirar depois de andar cerca de 100 metros ou após alguns minutos"
    },
    {
      grade: 4,
      description: "Tenho muita falta de ar para sair de casa, ou tenho falta de ar para me vestir ou despir"
    }
  ];

  const getInterpretation = (grade: number) => {
    switch (grade) {
      case 0:
        return {
          level: 'Grau 0 - Dispneia ausente',
          description: 'Dispneia apenas durante exercícios intensos. Função respiratória preservada para atividades cotidianas.',
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          severity: 'Leve'
        };
      case 1:
        return {
          level: 'Grau 1 - Dispneia leve',
          description: 'Dispneia ao acelerar o passo ou subir ladeiras. Limitação leve da capacidade de exercício.',
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          severity: 'Leve'
        };
      case 2:
        return {
          level: 'Grau 2 - Dispneia moderada',
          description: 'Limitação da velocidade de caminhada. Necessidade de parar para respirar durante caminhada.',
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          severity: 'Moderada'
        };
      case 3:
        return {
          level: 'Grau 3 - Dispneia grave',
          description: 'Limitação importante da capacidade de caminhada. Necessidade de parar após curtas distâncias.',
          color: 'text-orange-600',
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200',
          severity: 'Grave'
        };
      case 4:
        return {
          level: 'Grau 4 - Dispneia muito grave',
          description: 'Dispneia incapacitante. Limitação severa para atividades básicas da vida diária.',
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          severity: 'Muito Grave'
        };
      default:
        return null;
    }
  };

  const handleSubmit = () => {
    const interpretation = getInterpretation(selectedGrade);
    
    if (interpretation) {
      // Save result to localStorage
      const result = {
        questionnaire: 'MRC',
        score: selectedGrade,
        interpretation,
        patientData,
        date: new Date().toISOString(),
        answers: [selectedGrade]
      };
      
      const existingResults = JSON.parse(localStorage.getItem('asmacheck_results') || '[]');
      existingResults.push(result);
      localStorage.setItem('asmacheck_results', JSON.stringify(existingResults));
      
      setShowResult(true);
    }
  };

  const interpretation = showResult ? getInterpretation(selectedGrade) : null;

  const resetQuestionnaire = () => {
    setSelectedGrade(-1);
    setShowResult(false);
  };

  if (showResult && interpretation) {
    return (
      <div className="space-y-6">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gauge className="h-6 w-6 text-red-600" />
              Resultado da Escala de Dispneia MRC
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="text-6xl font-bold text-red-600">
                {selectedGrade}
              </div>
              <div className="text-xl text-gray-600">
                Grau MRC (0-4)
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
                <Badge variant="outline">
                  Severidade: {interpretation.severity}
                </Badge>
              </div>
              <p className={`${interpretation.color} font-medium`}>
                {interpretation.description}
              </p>
              <div className={`text-sm ${interpretation.color} bg-white/50 p-3 rounded-lg`}>
                <strong>Nota clínica:</strong> A escala MRC é amplamente utilizada para avaliar a dispneia funcional 
                e tem valor prognóstico em pacientes com DPOC. Graus ≥2 indicam limitação funcional significativa.
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button onClick={resetQuestionnaire} variant="outline" className="flex-1">
            Fazer Nova Avaliação
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
            <Gauge className="h-6 w-6 text-red-600" />
            Escala de Dispneia MRC (Medical Research Council)
          </CardTitle>
          <p className="text-gray-600">
            Selecione a opção que melhor descreve o seu grau de falta de ar (dispneia) 
            durante as atividades físicas do dia a dia.
          </p>
        </CardHeader>
      </Card>

      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg">
            Qual das seguintes frases melhor descreve sua falta de ar?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mrcGrades.map((item) => (
            <label
              key={item.grade}
              className={`flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedGrade === item.grade
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 bg-white hover:border-red-300 hover:bg-red-25'
              }`}
            >
              <input
                type="radio"
                name="mrc-grade"
                value={item.grade}
                checked={selectedGrade === item.grade}
                onChange={() => setSelectedGrade(item.grade)}
                className="mt-1 w-4 h-4 text-red-600 focus:ring-red-500"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant={selectedGrade === item.grade ? "default" : "outline"}>
                    Grau {item.grade}
                  </Badge>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {item.description}
                </p>
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
              <strong>Informações importantes:</strong>
              <ul className="mt-2 space-y-1 list-disc list-inside">
                <li>A escala MRC é utilizada para avaliar a limitação funcional causada pela dispneia</li>
                <li>É uma ferramenta importante para o acompanhamento de pacientes com DPOC</li>
                <li>Graus 2-4 indicam limitação funcional significativa</li>
                <li>Discuta o resultado com seu médico para planejamento terapêutico adequado</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button
          onClick={handleSubmit}
          disabled={selectedGrade === -1}
          className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {selectedGrade !== -1 ? 'Ver Resultado' : 'Selecione uma opção'}
        </Button>
      </div>
    </div>
  );
};

export default MRCQuestionnaire;
