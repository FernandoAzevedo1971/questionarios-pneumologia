import React from 'react';

interface CCQQuestionCardProps {
  question: {
    id: number;
    text: string;
    type: 'frequency' | 'limitation';
    scale: Array<{ value: number; label: string }>;
  };
  answer: number;
  onAnswerChange: (value: number) => void;
}

const CCQQuestionCard: React.FC<CCQQuestionCardProps> = ({
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
      {/* Question */}
      <div className="mb-4">
        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
          {question.id}. {question.text}
        </h4>
      </div>

      {/* Horizontal layout with scale labels and buttons */}
      <div className="flex items-center gap-4">
        {/* Left side - Best situation (0) */}
        <div className="flex-1 text-left">
          <div className="font-bold text-green-600 dark:text-green-400 text-xs mb-1">
            {question.scale[0].label}
          </div>
        </div>

        {/* Center - Score buttons */}
        <div className="flex gap-2">
          {question.scale.map((option) => (
            <button
              key={option.value}
              onClick={() => onAnswerChange(option.value)}
              className={`
                w-10 h-10 rounded-full border-2 transition-all duration-200 flex items-center justify-center text-sm font-bold hover:scale-110
                ${answer === option.value 
                  ? 'bg-primary border-primary text-primary-foreground shadow-lg scale-110' 
                  : 'bg-background border-muted-foreground/30 hover:border-primary/50 text-muted-foreground hover:text-primary'
                }
              `}
              title={option.label}
            >
              {option.value}
            </button>
          ))}
        </div>

        {/* Right side - Worst situation (6) */}
        <div className="flex-1 text-right">
          <div className="font-bold text-destructive text-xs mb-1">
            {question.scale[6].label}
          </div>
        </div>
      </div>

      {/* Selected answer indicator */}
      {answer !== -1 && (
        <div className="mt-4 text-center">
          <span className="text-primary font-semibold text-sm">
            Resposta selecionada: {answer} - {question.scale.find(s => s.value === answer)?.label}
          </span>
        </div>
      )}
    </div>
  );
};

export default CCQQuestionCard;