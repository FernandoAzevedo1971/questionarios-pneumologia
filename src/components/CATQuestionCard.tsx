import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CATQuestionCardProps {
  question: {
    id: number;
    text: string;
    opposite: string;
    leftLabel: string;
    rightLabel: string;
  };
  answer: number;
  onAnswerChange: (value: number) => void;
}

const CATQuestionCard: React.FC<CATQuestionCardProps> = ({
  question,
  answer,
  onAnswerChange
}) => {
  return (
    <Card className="bg-card shadow-lg border-border hover:shadow-xl transition-all duration-300 animate-fade-in">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
            {question.id}
          </div>
          {question.text}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-6">
          <div className="text-center">
            <h4 className="font-semibold text-card-foreground mb-4">Selecione sua situação atual na régua:</h4>
          </div>
          
          <div className="p-6 bg-muted/50 rounded-xl">
            {/* Legendas das extremidades */}
            <div className="flex justify-between items-start mb-6 px-2">
              <div className="text-left max-w-[45%]">
                <div className="font-bold text-green-600 text-sm mb-1">0 - Melhor situação</div>
                <p className="text-xs text-muted-foreground leading-tight">{question.leftLabel}</p>
              </div>
              <div className="text-right max-w-[45%]">
                <div className="font-bold text-destructive text-sm mb-1">5 - Pior situação</div>
                <p className="text-xs text-muted-foreground leading-tight">{question.rightLabel}</p>
              </div>
            </div>

            {/* Régua visual customizada */}
            <div className="relative">
              {/* Linha base da régua */}
              <div className="relative h-3 bg-secondary rounded-full mb-8">
                {/* Linha de progresso */}
                <div 
                  className="absolute h-full bg-gradient-to-r from-accent to-destructive rounded-full transition-all duration-300"
                  style={{ width: `${(answer / 5) * 100}%` }}
                />
                
                {/* Marcadores na régua */}
                {[0, 1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    onClick={() => onAnswerChange(value)}
                    className={`
                      absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-3 transition-all duration-200 flex items-center justify-center text-sm font-bold
                      ${answer === value 
                        ? 'bg-primary border-primary text-primary-foreground shadow-lg scale-125 z-10' 
                        : 'bg-background border-border hover:border-primary/50 hover:scale-110 shadow-md'
                      }
                    `}
                    style={{ left: `${(value / 5) * 100}%` }}
                  >
                    {value}
                  </button>
                ))}
              </div>
              
              {/* Números abaixo da régua */}
              <div className="flex justify-between px-4 text-xs text-muted-foreground">
                {[0, 1, 2, 3, 4, 5].map((value) => (
                  <span key={value} className={answer === value ? 'text-primary font-semibold' : ''}>
                    {value}
                  </span>
                ))}
              </div>
            </div>

            {/* Indicador da resposta selecionada */}
            {answer !== -1 && (
              <div className="mt-4 text-center p-3 bg-primary/10 rounded-lg border border-primary/20">
                <span className="text-primary font-semibold">
                  Resposta selecionada: {answer}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CATQuestionCard;
