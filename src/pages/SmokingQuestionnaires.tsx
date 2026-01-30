
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Cigarette } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FagerstromQuestionnaire from '@/components/FagerstromQuestionnaire';
import SmokingQuestionnaireDashboard from '@/components/SmokingQuestionnaireDashboard';

interface PatientData {
  name: string;
  age: string;
  gender: string;
}

const SmokingQuestionnaires = () => {
  const navigate = useNavigate();
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState<string | null>(null);
  const [patientData, setPatientData] = useState<PatientData>({
    name: '',
    age: '',
    gender: ''
  });

  const handleQuestionnaireComplete = () => {
    setSelectedQuestionnaire(null);
  };

  const renderQuestionnaire = () => {
    switch (selectedQuestionnaire) {
      case 'fagerstrom':
        return (
          <FagerstromQuestionnaire 
            patientData={patientData}
            onComplete={handleQuestionnaireComplete}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            onClick={() => selectedQuestionnaire ? setSelectedQuestionnaire(null) : navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-full">
              <Cigarette className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Tabagismo</h1>
              <p className="text-gray-600">Questionários de Avaliação do Tabagismo</p>
            </div>
          </div>
        </div>

        {/* Content */}
        {selectedQuestionnaire ? (
          renderQuestionnaire()
        ) : (
          <SmokingQuestionnaireDashboard
            patientData={patientData}
            onPatientDataChange={setPatientData}
            onQuestionnaireSelect={setSelectedQuestionnaire}
          />
        )}
      </div>
    </div>
  );
};

export default SmokingQuestionnaires;
