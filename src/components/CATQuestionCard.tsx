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
  // Alternating colors for cards
  const isEven = question.id % 2 === 0;
  const cardBgColor = isEven ? "bg-blue-50 dark:bg-blue-950/20" : "bg-green-50 dark:bg-green-950/20";
  const cardBorderColor = isEven ? "border-blue-200 dark:border-blue-800" : "border-green-200 dark:border-green-800";

  return (
    <div className={`${cardBgColor} ${cardBorderColor} border-2 rounded-xl p-6 transition-all duration-300 hover:shadow-lg animate-fade-in`}>
      {/* Horizontal layout with descriptions on sides and buttons in center */}
      <div className="flex items-center gap-4">
        {/* Left side - Best situation (0) */}
        <div className="flex-1 text-left">
          <div className="font-bold text-green-600 dark:text-green-400 text-sm mb-1">
            {question.leftLabel}
          </div>
        </div>

        {/* Center - Score buttons */}
        <div className="flex gap-2">
          {[0, 1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              onClick={() => onAnswerChange(value)}
              className={`
                w-10 h-10 rounded-full border-2 transition-all duration-200 flex items-center justify-center text-sm font-bold hover:scale-110
                ${answer === value 
                  ? 'bg-primary border-primary text-primary-foreground shadow-lg scale-110' 
                  : 'bg-background border-muted-foreground/30 hover:border-primary/50 text-muted-foreground hover:text-primary'
                }
              `}
            >
              {value}
            </button>
          ))}
        </div>

        {/* Right side - Worst situation (5) */}
        <div className="flex-1 text-right">
          <div className="font-bold text-destructive text-sm mb-1">
            {question.rightLabel}
          </div>
        </div>
      </div>

      {/* Selected answer indicator */}
      {answer !== -1 && (
        <div className="mt-4 text-center">
          <span className="text-primary font-semibold text-sm">
            Resposta selecionada: {answer}
          </span>
        </div>
      )}
    </div>
  );
};

export default CATQuestionCard;
