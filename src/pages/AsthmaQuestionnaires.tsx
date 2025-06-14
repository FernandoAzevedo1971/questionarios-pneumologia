
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, BookOpen, BarChart3, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ACTQuestionnaire from '@/components/ACTQuestionnaire';
import ACQQuestionnaire from '@/components/ACQQuestionnaire';
import AQLQQuestionnaire from '@/components/AQLQQuestionnaire';
import References from '@/components/References';
import AsthmaQuestionnaireDashboard from '@/components/AsthmaQuestionnaireDashboard';

const AsthmaQuestionnaires = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
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
              <div className="p-2 bg-blue-100 rounded-full">
                <Activity className="h-8 w-8 text-blue-600" />
              </div>
              Questionários de Asma Brônquica
            </h1>
            <p className="text-xl text-gray-600">
              Avaliação completa do controle e qualidade de vida na asma
            </p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="act">ACT</TabsTrigger>
            <TabsTrigger value="acq">ACQ</TabsTrigger>
            <TabsTrigger value="aqlq">AQLQ-S</TabsTrigger>
            <TabsTrigger value="references" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Referências
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <AsthmaQuestionnaireDashboard
              patientData={patientData}
              onPatientDataChange={setPatientData}
              onQuestionnaireSelect={handleQuestionnaireSelect}
            />
          </TabsContent>

          <TabsContent value="act">
            <ACTQuestionnaire patientData={patientData} />
          </TabsContent>

          <TabsContent value="acq">
            <ACQQuestionnaire patientData={patientData} />
          </TabsContent>

          <TabsContent value="aqlq">
            <AQLQQuestionnaire patientData={patientData} />
          </TabsContent>

          <TabsContent value="references">
            <References />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AsthmaQuestionnaires;
