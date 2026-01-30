
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Cigarette, RotateCcw, Home, AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface PatientData {
  name: string;
  age: string;
  gender: string;
}

interface FagerstromResultProps {
  score: number;
  patientData: PatientData;
  onReset: () => void;
  onComplete: () => void;
}

const FagerstromResult: React.FC<FagerstromResultProps> = ({
  score,
  patientData,
  onReset,
  onComplete
}) => {
  const getDependencyLevel = (score: number) => {
    if (score <= 2) {
      return {
        level: 'Muito Baixa',
        color: 'bg-green-500',
        textColor: 'text-green-700',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        icon: CheckCircle,
        description: 'O paciente apresenta dependência muito baixa à nicotina. A cessação do tabagismo pode ser alcançada com suporte comportamental e motivacional, sem necessidade obrigatória de farmacoterapia.',
        recommendation: 'Recomenda-se aconselhamento breve e suporte motivacional. A terapia de reposição de nicotina pode não ser necessária.'
      };
    } else if (score <= 4) {
      return {
        level: 'Baixa',
        color: 'bg-lime-500',
        textColor: 'text-lime-700',
        bgColor: 'bg-lime-50',
        borderColor: 'border-lime-200',
        icon: CheckCircle,
        description: 'O paciente apresenta baixa dependência à nicotina. A cessação pode ser facilitada com estratégias comportamentais e, em alguns casos, suporte farmacológico leve.',
        recommendation: 'Aconselhamento estruturado é recomendado. Considerar terapia de reposição de nicotina em baixas doses se houver dificuldade na cessação.'
      };
    } else if (score === 5) {
      return {
        level: 'Média',
        color: 'bg-yellow-500',
        textColor: 'text-yellow-700',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        icon: Info,
        description: 'O paciente apresenta dependência moderada à nicotina. É provável que necessite de suporte farmacológico combinado com terapia comportamental para cessação bem-sucedida.',
        recommendation: 'Recomenda-se terapia de reposição de nicotina (adesivos, gomas ou pastilhas) associada a aconselhamento estruturado.'
      };
    } else if (score <= 7) {
      return {
        level: 'Elevada',
        color: 'bg-orange-500',
        textColor: 'text-orange-700',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
        icon: AlertTriangle,
        description: 'O paciente apresenta alta dependência à nicotina. A cessação requer abordagem intensiva com farmacoterapia e acompanhamento regular.',
        recommendation: 'Recomenda-se fortemente terapia de reposição de nicotina em doses adequadas ou uso de vareniclina/bupropiona, associados a programa de cessação estruturado.'
      };
    } else {
      return {
        level: 'Muito Elevada',
        color: 'bg-red-500',
        textColor: 'text-red-700',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        icon: AlertTriangle,
        description: 'O paciente apresenta dependência muito elevada à nicotina. Necessita de tratamento intensivo e acompanhamento especializado para cessação do tabagismo.',
        recommendation: 'Encaminhamento para programa especializado de cessação do tabagismo. Considerar combinação de terapias farmacológicas (ex: adesivo + goma) e acompanhamento frequente.'
      };
    }
  };

  const result = getDependencyLevel(score);
  const IconComponent = result.icon;

  return (
    <div className="space-y-6">
      {/* Resultado Principal */}
      <Card className={`${result.bgColor} ${result.borderColor} border-2`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-3 ${result.color} rounded-full`}>
                <Cigarette className="h-8 w-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">Resultado do Teste de Fagerström</CardTitle>
                <CardDescription className="text-base">
                  {patientData.name && `Paciente: ${patientData.name}`}
                  {patientData.age && ` | ${patientData.age} anos`}
                  {patientData.gender && ` | ${patientData.gender}`}
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Score */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Pontuação Total</p>
              <div className={`w-24 h-24 ${result.color} rounded-full flex items-center justify-center`}>
                <span className="text-4xl font-bold text-white">{score}</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">de 10 pontos</p>
            </div>
            <div className="text-center sm:text-left">
              <p className="text-sm text-gray-600 mb-2">Nível de Dependência</p>
              <Badge className={`${result.color} text-white text-xl px-6 py-2`}>
                {result.level}
              </Badge>
            </div>
          </div>

          {/* Escala Visual */}
          <div className="space-y-2">
            <p className="text-sm text-gray-600 text-center">Escala de Dependência</p>
            <div className="relative h-8 rounded-full overflow-hidden bg-gray-200">
              <div className="absolute inset-0 flex">
                <div className="flex-1 bg-green-500" title="Muito Baixa (0-2)" />
                <div className="flex-1 bg-lime-500" title="Baixa (3-4)" />
                <div className="flex-1 bg-yellow-500" title="Média (5)" />
                <div className="flex-1 bg-orange-500" title="Elevada (6-7)" />
                <div className="flex-1 bg-red-500" title="Muito Elevada (8-10)" />
              </div>
              <div 
                className="absolute top-0 bottom-0 w-1 bg-black"
                style={{ left: `${(score / 10) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>0</span>
              <span>2</span>
              <span>4</span>
              <span>5</span>
              <span>7</span>
              <span>10</span>
            </div>
            <div className="flex justify-between text-xs text-gray-600 font-medium">
              <span>Muito Baixa</span>
              <span>Baixa</span>
              <span>Média</span>
              <span>Elevada</span>
              <span>Muito Elevada</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interpretação */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IconComponent className={`h-5 w-5 ${result.textColor}`} />
            Interpretação Clínica
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">{result.description}</p>
          
          <div className={`p-4 rounded-lg ${result.bgColor} ${result.borderColor} border`}>
            <p className="font-semibold text-gray-800 mb-2">Recomendação:</p>
            <p className="text-gray-700">{result.recommendation}</p>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Classificação */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Classificação do Nível de Dependência</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4">Pontuação</th>
                  <th className="text-left py-2 px-4">Nível de Dependência</th>
                </tr>
              </thead>
              <tbody>
                <tr className={`${score <= 2 ? 'bg-green-100 font-semibold' : ''}`}>
                  <td className="py-2 px-4">0 - 2</td>
                  <td className="py-2 px-4">
                    <Badge className="bg-green-500">Muito Baixa</Badge>
                  </td>
                </tr>
                <tr className={`${score >= 3 && score <= 4 ? 'bg-lime-100 font-semibold' : ''}`}>
                  <td className="py-2 px-4">3 - 4</td>
                  <td className="py-2 px-4">
                    <Badge className="bg-lime-500">Baixa</Badge>
                  </td>
                </tr>
                <tr className={`${score === 5 ? 'bg-yellow-100 font-semibold' : ''}`}>
                  <td className="py-2 px-4">5</td>
                  <td className="py-2 px-4">
                    <Badge className="bg-yellow-500">Média</Badge>
                  </td>
                </tr>
                <tr className={`${score >= 6 && score <= 7 ? 'bg-orange-100 font-semibold' : ''}`}>
                  <td className="py-2 px-4">6 - 7</td>
                  <td className="py-2 px-4">
                    <Badge className="bg-orange-500">Elevada</Badge>
                  </td>
                </tr>
                <tr className={`${score >= 8 ? 'bg-red-100 font-semibold' : ''}`}>
                  <td className="py-2 px-4">8 - 10</td>
                  <td className="py-2 px-4">
                    <Badge className="bg-red-500">Muito Elevada</Badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Ações */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          variant="outline"
          onClick={onReset}
          className="flex items-center gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Refazer Teste
        </Button>
        <Button
          onClick={onComplete}
          className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 flex items-center gap-2"
        >
          <Home className="h-4 w-4" />
          Voltar ao Início
        </Button>
      </div>
    </div>
  );
};

export default FagerstromResult;
