
import React from 'react';
import { Button } from '@/components/ui/button';

interface Option {
  value: number;
  text: string;
}
interface ACQQuestionStepProps {
  question: {
    id: number;
    text: string;
    options: Option[];
  };
  answer: number;
  onSelect: (value: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  questionIndex: number;
  totalQuestions: number;
  isOptional?: boolean;
}

const ACQQuestionStep: React.FC<ACQQuestionStepProps> = ({
  question,
  answer,
  onSelect,
  onPrevious,
  onNext,
  questionIndex,
  totalQuestions,
  isOptional,
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-neutral-800 mb-4">
        {question.text}
      </h3>
      {isOptional && (
        <p className="text-sm text-neutral-400 mb-4 italic">
          Esta pergunta é opcional. Se você não souber o valor do Pico de Fluxo Expiratório, pode pular para finalizar.
        </p>
      )}
      <div className="space-y-3">
        {question.options.map((option) => (
          <button
            key={option.value}
            onClick={() => onSelect(option.value)}
            className={`w-full p-4 text-left rounded-lg border transition-all duration-200 font-medium shadow-sm focus-visible-style ${
              answer === option.value
                ? 'border-green-500 bg-green-50 text-green-700 ring-2 ring-green-500'
                : 'border-gray-200 hover:border-green-300 hover:bg-neutral-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span>{option.text}</span>
              <span className="text-sm text-neutral-400 font-normal">
                {option.value} {option.value === 1 ? 'ponto' : 'pontos'}
              </span>
            </div>
          </button>
        ))}
      </div>
      <div className="flex justify-between mt-6">
        <Button
          onClick={onPrevious}
          disabled={questionIndex === 0}
          variant="outline"
          className="questionnaire-button-outline"
        >
          Anterior
        </Button>
        <Button onClick={onNext} className="questionnaire-button-primary">
          {questionIndex === totalQuestions - 1 ? 'Finalizar' : 'Próxima'}
        </Button>
      </div>
    </div>
  );
};

export default ACQQuestionStep;
