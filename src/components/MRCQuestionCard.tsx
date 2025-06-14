
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface MRCQuestionCardProps {
  grade: number;
  description: string;
  selectedGrade: number;
  onGradeSelect: (grade: number) => void;
}

const MRCQuestionCard: React.FC<MRCQuestionCardProps> = ({
  grade,
  description,
  selectedGrade,
  onGradeSelect
}) => {
  const isSelected = selectedGrade === grade;

  return (
    <label
      className={`flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
        isSelected
          ? 'border-red-500 bg-red-50'
          : 'border-gray-200 bg-white hover:border-red-300 hover:bg-red-25'
      }`}
    >
      <input
        type="radio"
        name="mrc-grade"
        value={grade}
        checked={isSelected}
        onChange={() => onGradeSelect(grade)}
        className="mt-1 w-4 h-4 text-red-600 focus:ring-red-500"
      />
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant={isSelected ? "default" : "outline"}>
            Grau {grade}
          </Badge>
        </div>
        <p className="text-gray-700 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </label>
  );
};

export default MRCQuestionCard;
