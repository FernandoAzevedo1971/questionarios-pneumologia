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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-accent/30 rounded-xl border border-accent text-card-foreground">
            <div className="font-bold text-primary mb-2">0 - Melhor situação:</div>
            <p className="text-sm">{question.leftLabel}</p>
          </div>
          <div className="p-4 bg-destructive/10 rounded-xl border border-destructive/20 text-card-foreground">
            <div className="font-bold text-destructive mb-2">5 - Pior situação:</div>
            <p className="text-sm">{question.rightLabel}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="text-center">
            <h4 className="font-semibold text-card-foreground mb-2">Selecione sua situação atual:</h4>
            <div className="flex justify-between text-xs text-muted-foreground px-4">
              <span>Melhor (0)</span>
              <span>Pior (5)</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center gap-2 p-4 bg-muted/50 rounded-xl">
            {[0, 1, 2, 3, 4, 5].map((value) => (
              <label key={value} className="flex flex-col items-center cursor-pointer group">
                <div className={`
                  relative w-14 h-14 rounded-full border-2 transition-all duration-200 flex items-center justify-center
                  ${answer === value 
                    ? 'bg-primary border-primary text-primary-foreground shadow-lg scale-110' 
                    : 'bg-card border-border hover:border-primary/50 hover:bg-accent/50 group-hover:scale-105'
                  }
                `}>
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={value}
                    checked={answer === value}
                    onChange={() => onAnswerChange(value)}
                    className="absolute opacity-0 w-full h-full cursor-pointer"
                  />
                  <span className="text-base font-bold pointer-events-none">{value}</span>
                </div>
                {answer === value && (
                  <div className="mt-2 w-2 h-2 bg-primary rounded-full animate-scale-in"></div>
                )}
              </label>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CATQuestionCard;
