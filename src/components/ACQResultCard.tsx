import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Stethoscope } from 'lucide-react';

interface ACQResultCardProps {
  score: number;
  interpretation: {
    level: string;
    description: string;
    color: string;
    bgColor: string;
    borderColor: string;
    icon: React.ComponentType<{ className?: string }>
  };
  patientData: {
    name: string;
    age: string;
    gender: string;
  };
  onSave: () => void;
  onReset: () => void;
}

const ACQResultCard: React.FC<ACQResultCardProps> = ({ score, interpretation, patientData, onSave, onReset }) => {
  const IconComponent = interpretation.icon;
  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <Card className="bg-white/80 border-0 shadow-xl backdrop-blur-sm animate-scale-in">
        <CardHeader className="text-center border-b border-green-100">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl font-bold text-green-700">
            <Stethoscope className="h-6 w-6 text-green-600" />
            Resultado do ACQ
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-6xl font-extrabold text-green-600 mb-2 drop-shadow">
              {score.toFixed(2)}
            </div>
            <div className="text-lg text-neutral-600">
              pontos (0-6)
            </div>
          </div>
          <div className={`p-6 rounded-lg border-2 ${interpretation.bgColor} ${interpretation.borderColor} animate-fade-in`}>
            <div className="flex items-center gap-3 mb-3">
              <IconComponent className={`h-6 w-6 ${interpretation.color}`} />
              <h3 className={`text-xl font-semibold ${interpretation.color}`}>
                {interpretation.level}
              </h3>
            </div>
            <p className="text-neutral-700">{interpretation.description}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Interpretação dos Escores ACQ:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• <strong>≤ 0,75:</strong> Asma bem controlada</li>
              <li>• <strong>0,76 - 1,50:</strong> Asma parcialmente controlada</li>
              <li>• <strong>≥ 1,51:</strong> Asma não controlada</li>
            </ul>
          </div>
          {patientData.name && (
            <div className="bg-neutral-50 p-4 rounded-lg animate-fade-in">
              <h4 className="font-semibold text-blue-800 mb-2">Dados do Paciente:</h4>
              <p><strong>Nome:</strong> {patientData.name}</p>
              {patientData.age && <p><strong>Idade:</strong> {patientData.age} anos</p>}
              {patientData.gender && <p><strong>Sexo:</strong> {patientData.gender === 'M' ? 'Masculino' : 'Feminino'}</p>}
              <p><strong>Data:</strong> {new Date().toLocaleDateString('pt-BR')}</p>
            </div>
          )}
          <div className="flex gap-3 w-full">
            <button onClick={onSave} className="flex-1 questionnaire-button-primary text-base py-3 font-semibold shadow-sm">
                Salvar Resultados
            </button>
            <button onClick={onReset} type="button" className="flex-1 questionnaire-button-outline text-base py-3 font-semibold border">
                Novo Teste
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ACQResultCard;
