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
    <div className="space-y-8 animate-fade-in">
      <Card className="bg-gradient-to-br from-primary/5 to-accent/10 border-primary/20 shadow-xl backdrop-blur-sm animate-scale-in">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <Wind className="h-8 w-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold text-primary">
            CAT - Teste de Avaliação da DPOC
          </CardTitle>
          <p className="text-card-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Este questionário avalia como a DPOC afeta sua vida. Para cada questão, 
            selecione o número que melhor descreve sua situação atual.
          </p>
        </CardHeader>
      </Card>
      
      <div className="space-y-6">
        {questions.map((question, index) => (
          <CATQuestionCard
            key={question.id}
            question={question}
            answer={answers[index]}
            onAnswerChange={(value) => onAnswerChange(index, value)}
          />
        ))}
      </div>
      
      <Card className="bg-accent/20 border-accent">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-accent-foreground" />
            </div>
            <div className="text-card-foreground">
              <div className="font-semibold mb-2">Instruções importantes:</div>
              <p className="text-sm leading-relaxed">
                Responda todas as questões baseando-se em como você se sente <strong>atualmente</strong>. 
                Este questionário foi validado para pessoas com DPOC diagnosticada.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-center pt-4">
        <Button
          onClick={onSubmit}
          disabled={!canSubmit}
          size="lg"
          className={`
            px-12 py-4 text-lg font-semibold shadow-lg transition-all duration-300 min-w-[280px]
            ${canSubmit 
              ? 'questionnaire-button-primary hover:scale-105 hover:shadow-xl' 
              : 'cursor-not-allowed opacity-60'
            }
          `}
        >
          {canSubmit ? (
            <span className="flex items-center gap-2">
              <Wind className="h-5 w-5" />
              Calcular Resultado
            </span>
          ) : (
            `Responda todas as questões (${answers.filter(a => a !== -1).length}/8)`
          )}
        </Button>
      </div>
    </div>
  );
};

export default CATQuestionnaireForm;
