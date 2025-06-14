
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Gauge, CheckCircle2 } from 'lucide-react';

interface MRCResultProps {
  selectedGrade: number;
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

const MRCResult: React.FC<MRCResultProps> = ({
  selectedGrade,
  interpretation,
  onReset
}) => {
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
        <Button onClick={onReset} variant="outline" className="flex-1">
          Fazer Nova Avaliação
        </Button>
        <Button onClick={() => window.print()} className="flex-1">
          Imprimir Resultado
        </Button>
      </div>
    </div>
  );
};

export default MRCResult;
