
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, BookOpen, BarChart3, User, Stethoscope, Wind, Gauge } from 'lucide-react';
import ACTQuestionnaire from '@/components/ACTQuestionnaire';
import ACQQuestionnaire from '@/components/ACQQuestionnaire';
import AQLQQuestionnaire from '@/components/AQLQQuestionnaire';
import CATQuestionnaire from '@/components/CATQuestionnaire';
import MRCQuestionnaire from '@/components/MRCQuestionnaire';
import BORGQuestionnaire from '@/components/BORGQuestionnaire';
import References from '@/components/References';
import PatientHistory from '@/components/PatientHistory';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [patientData, setPatientData] = useState({
    name: '',
    age: '',
    gender: ''
  });

  const asthmaQuestionnaires = [
    {
      id: 'act',
      title: 'ACT - Teste de Controle da Asma',
      description: 'Avalia o controle da asma nas últimas 4 semanas',
      questions: 5,
      time: '2-3 min',
      icon: Activity,
      color: 'bg-blue-500'
    },
    {
      id: 'acq',
      title: 'ACQ - Questionário de Controle da Asma',
      description: 'Instrumento validado para avaliar controle da asma',
      questions: 7,
      time: '3-4 min',
      icon: Stethoscope,
      color: 'bg-green-500'
    },
    {
      id: 'aqlq',
      title: 'AQLQ-S - Qualidade de Vida na Asma',
      description: 'Avalia o impacto da asma na qualidade de vida',
      questions: 12,
      time: '5-7 min',
      icon: BarChart3,
      color: 'bg-purple-500'
    }
  ];

  const copdQuestionnaires = [
    {
      id: 'cat',
      title: 'CAT - Teste de Avaliação da DPOC',
      description: 'Avalia o impacto da DPOC na qualidade de vida',
      questions: 8,
      time: '2-3 min',
      icon: Wind,
      color: 'bg-orange-500'
    },
    {
      id: 'mrc',
      title: 'MRC - Escala de Dispneia',
      description: 'Avalia o grau de dispneia relacionado à atividade física',
      questions: 1,
      time: '1 min',
      icon: Gauge,
      color: 'bg-red-500'
    },
    {
      id: 'borg',
      title: 'BORG - Escala de Percepção de Esforço',
      description: 'Avalia a percepção subjetiva de esforço respiratório',
      questions: 1,
      time: '1 min',
      icon: BarChart3,
      color: 'bg-indigo-500'
    }
  ];

  const handleQuestionnaireSelect = (questionnaireId: string) => {
    setActiveTab(questionnaireId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
            <div className="p-2 bg-blue-100 rounded-full">
              <Activity className="h-8 w-8 text-blue-600" />
            </div>
            PneumoCheck
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Questionários e Escalas de Avaliação Pneumológica validados em português
          </p>
          <Badge variant="secondary" className="mt-2">
            Versão 2.0 - Asma e DPOC
          </Badge>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-8 mb-8">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="act">ACT</TabsTrigger>
            <TabsTrigger value="acq">ACQ</TabsTrigger>
            <TabsTrigger value="aqlq">AQLQ-S</TabsTrigger>
            <TabsTrigger value="cat">CAT</TabsTrigger>
            <TabsTrigger value="mrc">MRC</TabsTrigger>
            <TabsTrigger value="borg">BORG</TabsTrigger>
            <TabsTrigger value="references" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Referências
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Patient Info Card */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  Informações do Paciente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nome do Paciente
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={patientData.name}
                      onChange={(e) => setPatientData({...patientData, name: e.target.value})}
                      placeholder="Digite o nome"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Idade
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={patientData.age}
                      onChange={(e) => setPatientData({...patientData, age: e.target.value})}
                      placeholder="Idade"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sexo
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={patientData.gender}
                      onChange={(e) => setPatientData({...patientData, gender: e.target.value})}
                    >
                      <option value="">Selecione</option>
                      <option value="M">Masculino</option>
                      <option value="F">Feminino</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Asthma Questionnaires */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Activity className="h-6 w-6 text-blue-600" />
                Questionários de Asma Brônquica
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {asthmaQuestionnaires.map((questionnaire) => {
                  const IconComponent = questionnaire.icon;
                  return (
                    <Card key={questionnaire.id} className="group hover:shadow-xl transition-all duration-300 cursor-pointer bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className={`p-3 rounded-full ${questionnaire.color} text-white group-hover:scale-110 transition-transform duration-300`}>
                            <IconComponent className="h-6 w-6" />
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {questionnaire.questions} questões
                          </Badge>
                        </div>
                        <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                          {questionnaire.title}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {questionnaire.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm text-gray-500">
                            Tempo estimado: {questionnaire.time}
                          </span>
                        </div>
                        <Button 
                          onClick={() => handleQuestionnaireSelect(questionnaire.id)}
                          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
                        >
                          Iniciar Questionário
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* COPD Questionnaires */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Wind className="h-6 w-6 text-orange-600" />
                Questionários de DPOC
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {copdQuestionnaires.map((questionnaire) => {
                  const IconComponent = questionnaire.icon;
                  return (
                    <Card key={questionnaire.id} className="group hover:shadow-xl transition-all duration-300 cursor-pointer bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className={`p-3 rounded-full ${questionnaire.color} text-white group-hover:scale-110 transition-transform duration-300`}>
                            <IconComponent className="h-6 w-6" />
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {questionnaire.questions} questões
                          </Badge>
                        </div>
                        <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                          {questionnaire.title}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {questionnaire.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm text-gray-500">
                            Tempo estimado: {questionnaire.time}
                          </span>
                        </div>
                        <Button 
                          onClick={() => handleQuestionnaireSelect(questionnaire.id)}
                          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
                        >
                          Iniciar Questionário
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            <PatientHistory />
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

export default Index;
