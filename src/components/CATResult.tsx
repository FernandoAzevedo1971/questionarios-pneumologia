
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wind, CheckCircle2 } from 'lucide-react';

interface CATResultProps {
  score: number;
  interpretation: {
    level: string;
    description: string;
    color: string;
    bgColor: string;
    borderColor: string;
  };
  onReset: () => void;
}

const CATResult: React.FC<CATResultProps> = ({
  score,
  interpretation,
  onReset
}) => {
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
        <Button onClick={onReset} variant="outline" className="flex-1">
          Fazer Novo Teste
        </Button>
        <Button onClick={() => window.print()} className="flex-1">
          Imprimir Resultado
        </Button>
      </div>
    </div>
  );
};

export default CATResult;
