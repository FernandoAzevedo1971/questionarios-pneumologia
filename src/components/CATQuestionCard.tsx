
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
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-gray-800">
          {question.id}. {question.text}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <strong>0:</strong> {question.leftLabel}
          </div>
          <div className="p-3 bg-red-50 rounded-lg border border-red-200">
            <strong>5:</strong> {question.rightLabel}
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>0</span>
            <span>5</span>
          </div>
          <div className="flex justify-between items-center">
            {[0, 1, 2, 3, 4, 5].map((value) => (
              <label key={value} className="flex flex-col items-center cursor-pointer">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={value}
                  checked={answer === value}
                  onChange={() => onAnswerChange(value)}
                  className="mb-1 w-4 h-4 text-orange-600 focus:ring-orange-500"
                />
                <span className="text-sm font-medium">{value}</span>
              </label>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CATQuestionCard;
