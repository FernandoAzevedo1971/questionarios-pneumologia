import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gauge, AlertCircle } from 'lucide-react';
import MRCQuestionCard from './MRCQuestionCard';

interface MRCQuestionnaireFormProps {
  mrcGrades: Array<{
    grade: number;
    description: string;
  }>;
  selectedGrade: number;
  onGradeSelect: (grade: number) => void;
  onSubmit: () => void;
}

const MRCQuestionnaireForm: React.FC<MRCQuestionnaireFormProps> = ({
  mrcGrades,
  selectedGrade,
  onGradeSelect,
  onSubmit
}) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="bg-white/80 border-0 shadow-xl backdrop-blur-sm animate-scale-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-bold text-red-700">
            <Gauge className="h-6 w-6 text-red-600" />
            Escala de Dispneia MRC (Medical Research Council)
          </CardTitle>
          <p className="text-neutral-600">
            Selecione a opção que melhor descreve o seu grau de falta de ar (dispneia) 
            durante as atividades físicas do dia a dia.
          </p>
        </CardHeader>
      </Card>
      <Card className="bg-white/90 border-0 shadow-lg backdrop-blur-sm animate-scale-in">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-red-700">
            Qual das seguintes frases melhor descreve sua falta de ar?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mrcGrades.map((item) => (
            <MRCQuestionCard
              key={item.grade}
              grade={item.grade}
              description={item.description}
              selectedGrade={selectedGrade}
              onGradeSelect={onGradeSelect}
            />
          ))}
        </CardContent>
      </Card>
      <Card className="bg-blue-50 border-blue-200 border-2">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <strong>Informações importantes:</strong>
              <ul className="mt-2 space-y-1 list-disc list-inside">
                <li>A escala MRC é utilizada para avaliar a limitação funcional causada pela dispneia</li>
                <li>É uma ferramenta importante para o acompanhamento de pacientes com DPOC</li>
                <li>Graus 2-4 indicam limitação funcional significativa</li>
                <li>Discuta o resultado com seu médico para planejamento terapêutico adequado</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-center">
        <Button
          onClick={onSubmit}
          disabled={selectedGrade === -1}
          className="px-8 py-3 questionnaire-button-primary text-base font-semibold shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          {selectedGrade !== -1 ? 'Ver Resultado' : 'Selecione uma opção'}
        </Button>
      </div>
    </div>
  );
};

export default MRCQuestionnaireForm;
