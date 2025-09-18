import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Stethoscope, Clock, FileText } from 'lucide-react';
import CCQQuestionCard from './CCQQuestionCard';

interface CCQQuestionnaireFormProps {
  questions: Array<{
    id: number;
    text: string;
    type: 'frequency' | 'limitation';
    scale: Array<{ value: number; label: string }>;
  }>;
  answers: { [key: number]: number };
  onAnswerChange: (questionId: number, value: number) => void;
  onSubmit: () => void;
  canSubmit: boolean;
}

const CCQQuestionnaireForm: React.FC<CCQQuestionnaireFormProps> = ({
  questions,
  answers,
  onAnswerChange,
  onSubmit,
  canSubmit
}) => {
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Card */}
      <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-red-50">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-3 text-3xl font-bold text-orange-800">
            <div className="p-2 bg-orange-100 rounded-full">
              <Stethoscope className="h-8 w-8 text-orange-600" />
            </div>
            Questionário Clínico sobre DPOC (CCQ)
          </CardTitle>
          <div className="flex justify-center gap-6 mt-4 text-sm text-orange-700">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>10 questões</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>3-5 minutos</span>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Instructions */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardContent className="pt-6">
          <h3 className="font-semibold text-blue-800 mb-2">Instruções:</h3>
          <p className="text-blue-700 text-sm">
            Por favor, selecione o número da resposta que melhor descreve como você se sentiu <strong>durante a última semana</strong>. 
            Responda apenas uma opção por pergunta.
          </p>
        </CardContent>
      </Card>

      {/* Section 1: Symptoms (Questions 1-6) */}
      <Card className="border-purple-200 bg-purple-50/30">
        <CardHeader>
          <CardTitle className="text-xl text-purple-800">
            Sintomas na Última Semana
          </CardTitle>
          <p className="text-sm text-purple-600">
            Em média, durante a última semana, com que frequência você:
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {questions.slice(0, 6).map((question) => (
            <CCQQuestionCard
              key={question.id}
              question={question}
              answer={answers[question.id] ?? -1}
              onAnswerChange={(value) => onAnswerChange(question.id, value)}
            />
          ))}
        </CardContent>
      </Card>

      {/* Section 2: Activity Limitations (Questions 7-10) */}
      <Card className="border-green-200 bg-green-50/30">
        <CardHeader>
          <CardTitle className="text-xl text-green-800">
            Limitações nas Atividades
          </CardTitle>
          <p className="text-sm text-green-600">
            Em média, durante a última semana, o quanto você se sentiu limitado/a por causa de seus problemas de respiração:
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {questions.slice(6, 10).map((question) => (
            <CCQQuestionCard
              key={question.id}
              question={question}
              answer={answers[question.id] ?? -1}
              onAnswerChange={(value) => onAnswerChange(question.id, value)}
            />
          ))}
        </CardContent>
      </Card>

      {/* Progress and Submit */}
      <Card className="border-gray-200 bg-gray-50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Progresso: {answeredCount}/10 questões respondidas
            </div>
            <Button
              onClick={onSubmit}
              disabled={!canSubmit}
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-2"
            >
              {canSubmit ? 'Calcular Resultado CCQ' : `Responda mais ${10 - answeredCount} questão${10 - answeredCount !== 1 ? 'ões' : ''}`}
            </Button>
          </div>
          
          {canSubmit && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-700 text-center">
                ✅ Todas as questões foram respondidas. Clique no botão para ver seu resultado!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CCQQuestionnaireForm;