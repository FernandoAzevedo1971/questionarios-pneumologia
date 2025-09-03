
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
    <div className="space-y-8 animate-fade-in">
      <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 shadow-xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 bg-primary rounded-full flex items-center justify-center">
            <Wind className="h-10 w-10 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold text-primary">
            Resultado do CAT - Teste de Avaliação da DPOC
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-6">
            <div className="relative">
              <div className="text-8xl font-bold text-primary animate-scale-in">
                {score}
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                <div className="text-lg text-muted-foreground font-medium">
                  pontos (0-40)
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className={`${interpretation.bgColor} ${interpretation.borderColor} border-2 shadow-lg`}>
        <CardHeader>
          <CardTitle className={`flex items-center gap-3 text-xl ${interpretation.color}`}>
            <div className="w-10 h-10 rounded-full bg-card flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            Interpretação do Resultado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-center">
              <Badge className={`${interpretation.color} bg-card text-lg px-4 py-2 font-semibold`}>
                {interpretation.level}
              </Badge>
            </div>
            <p className={`${interpretation.color} font-medium text-center text-lg leading-relaxed`}>
              {interpretation.description}
            </p>
            <div className={`text-sm ${interpretation.color} bg-card/50 p-4 rounded-xl border border-card/20`}>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
                <div>
                  <strong>Nota importante:</strong>
                  <p className="mt-1">
                    O CAT é um questionário validado para avaliar o impacto da DPOC na vida diária. 
                    Discuta este resultado com seu médico para um plano de tratamento adequado.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          onClick={onReset} 
          variant="outline" 
          size="lg"
          className="flex-1 text-base font-semibold py-4 border-2 hover:scale-105 transition-all duration-200"
        >
          <Wind className="h-5 w-5 mr-2" />
          Fazer Novo Teste
        </Button>
        <Button 
          onClick={() => window.print()} 
          size="lg"
          className="flex-1 text-base font-semibold py-4 questionnaire-button-primary hover:scale-105 transition-all duration-200 shadow-lg"
        >
          <CheckCircle2 className="h-5 w-5 mr-2" />
          Imprimir Resultado
        </Button>
      </div>
    </div>
  );
};

export default CATResult;
