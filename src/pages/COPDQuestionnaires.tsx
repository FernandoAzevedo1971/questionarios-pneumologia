
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Wind, BookOpen, BarChart3, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CATQuestionnaire from '@/components/CATQuestionnaire';
import MRCQuestionnaire from '@/components/MRCQuestionnaire';
import BORGQuestionnaire from '@/components/BORGQuestionnaire';
import References from '@/components/References';
import COPDQuestionnaireDashboard from '@/components/COPDQuestionnaireDashboard';

const COPDQuestionnaires = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [patientData, setPatientData] = useState({
    name: '',
    age: '',
    gender: ''
  });

  const handleQuestionnaireSelect = (questionnaireId: string) => {
    setActiveTab(questionnaireId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
          <div className="flex-1 text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
              <div className="p-2 bg-orange-100 rounded-full">
                <Wind className="h-8 w-8 text-orange-600" />
              </div>
              Questionários de DPOC
            </h1>
            <p className="text-xl text-gray-600">
              Avaliação completa da Doença Pulmonar Obstrutiva Crônica
            </p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="cat">CAT</TabsTrigger>
            <TabsTrigger value="mrc">MRC</TabsTrigger>
            <TabsTrigger value="borg">BORG</TabsTrigger>
            <TabsTrigger value="references" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Referências
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <COPDQuestionnaireDashboard
              patientData={patientData}
              onPatientDataChange={setPatientData}
              onQuestionnaireSelect={handleQuestionnaireSelect}
            />
          </TabsContent>

          <TabsContent value="cat">
            <CATQuestionnaire patientData={patientData} />
          </TabsContent>

          <TabsContent value="mrc">
            <MRCQuestionnaire patientData={patientData} />
          </TabsContent>

          <TabsContent value="borg">
            <BORGQuestionnaire patientData={patientData} />
          </TabsContent>

          <TabsContent value="references">
            <References />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default COPDQuestionnaires;
