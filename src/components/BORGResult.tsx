
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart3, CheckCircle2 } from 'lucide-react';

interface BORGResultProps {
  selectedScore: number;
  context: string;
  interpretation: {
    level: string;
    description: string;
    color: string;
    bgColor: string;
    borderColor: string;
    severity: string;
  };
  onReset: () => void;
}

const BORGResult: React.FC<BORGResultProps> = ({
  selectedScore,
  context,
  interpretation,
  onReset
}) => {
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
        <Button onClick={onReset} variant="outline" className="flex-1">
          Nova Avaliação
        </Button>
        <Button onClick={() => window.print()} className="flex-1">
          Imprimir Resultado
        </Button>
      </div>
    </div>
  );
};

export default BORGResult;
