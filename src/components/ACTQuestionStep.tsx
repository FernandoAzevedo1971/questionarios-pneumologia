
import React from 'react';
import { Button } from '@/components/ui/button';

interface Option {
  value: number;
  text: string;
}

interface ACTQuestionStepProps {
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
}

const ACTQuestionStep: React.FC<ACTQuestionStepProps> = ({
  question,
  answer,
  onSelect,
  onPrevious,
  onNext,
  questionIndex,
  totalQuestions
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-neutral-800 mb-4">
        {question.text}
      </h3>
      <div className="space-y-3">
        {question.options.map((option) => (
          <button
            key={option.value}
            onClick={() => onSelect(option.value)}
            className={`w-full p-4 text-left rounded-lg border transition-all duration-200 font-medium shadow-sm focus-visible-style ${
              answer === option.value
                ? 'border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-primary'
                : 'border-gray-200 hover:border-blue-300 hover:bg-neutral-50'
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

export default ACTQuestionStep;
