
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wind, AlertCircle } from 'lucide-react';
import CATQuestionCard from './CATQuestionCard';

interface CATQuestionnaireFormProps {
  questions: Array<{
    id: number;
    text: string;
    opposite: string;
    leftLabel: string;
    rightLabel: string;
  }>;
  answers: number[];
  onAnswerChange: (questionIndex: number, value: number) => void;
  onSubmit: () => void;
  canSubmit: boolean;
}

const CATQuestionnaireForm: React.FC<CATQuestionnaireFormProps> = ({
  questions,
  answers,
  onAnswerChange,
  onSubmit,
  canSubmit
}) => {
  return (
    <div className="space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wind className="h-6 w-6 text-orange-600" />
            CAT - Teste de Avaliação da DPOC
          </CardTitle>
          <p className="text-gray-600">
            Este questionário avalia como a DPOC afeta sua vida. Para cada item, 
            marque na escala de 0 a 5 o ponto que melhor descreve sua situação atual.
          </p>
        </CardHeader>
      </Card>

      {questions.map((question, index) => (
        <CATQuestionCard
          key={question.id}
          question={question}
          answer={answers[index]}
          onAnswerChange={(value) => onAnswerChange(index, value)}
        />
      ))}

      <Card className="bg-blue-50 border-blue-200 border-2">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <strong>Importante:</strong> Responda todas as questões baseando-se em como você se sente atualmente. 
              Este questionário foi validado para pessoas com DPOC diagnosticada.
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button
          onClick={onSubmit}
          disabled={!canSubmit}
          className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {canSubmit ? 'Calcular Resultado' : `Responda todas as questões (${answers.filter(a => a !== -1).length}/8)`}
        </Button>
      </div>
    </div>
  );
};

export default CATQuestionnaireForm;
