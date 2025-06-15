
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Activity, Wind, Stethoscope, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
            <div className="p-3 bg-blue-100 rounded-full">
              <Stethoscope className="h-10 w-10 text-blue-600" />
            </div>
            PneumoCheck
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
            Questionários e Escalas de Avaliação Pneumológica validados em português
          </p>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            Versão 2.0 - Sistema Completo de Avaliação
          </Badge>
        </div>

        {/* Category Selection */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Selecione a Categoria de Avaliação
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Asthma Category */}
            <Card className="group hover:shadow-2xl transition-all duration-300 cursor-pointer bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:scale-105">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <Activity className="h-10 w-10 text-blue-600" />
                </div>
                <CardTitle className="text-2xl text-blue-800 group-hover:text-blue-600 transition-colors">
                  Asma Brônquica
                </CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  Questionários especializados para avaliação e controle da asma
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-800">Questionários Disponíveis:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• ACT - Teste de Controle da Asma</li>
                    <li>• ACQ - Questionário de Controle da Asma</li>
                    <li>• AQLQ-S - Qualidade de Vida na Asma</li>
                  </ul>
                </div>
                <div className="pt-4">
                  <Button 
                    onClick={() => navigate('/asthma')}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-base py-3"
                  >
                    Acessar Questionários de Asma
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* COPD Category */}
            <Card className="group hover:shadow-2xl transition-all duration-300 cursor-pointer bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:scale-105">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-orange-100 rounded-full w-20 h-20 flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                  <Wind className="h-10 w-10 text-orange-600" />
                </div>
                <CardTitle className="text-2xl text-orange-800 group-hover:text-orange-600 transition-colors">
                  DPOC
                </CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  Escalas e questionários para avaliação da Doença Pulmonar Obstrutiva Crônica
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-800">Questionários Disponíveis:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• CAT - Teste de Avaliação da DPOC</li>
                    <li>• MRC - Escala de Dispneia</li>
                    <li>• BORG - Escala de Percepção de Esforço</li>
                  </ul>
                </div>
                <div className="pt-4">
                  <Button 
                    onClick={() => navigate('/copd')}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all duration-300 text-base py-3"
                  >
                    Acessar Questionários de DPOC
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Bronchiectasis Category */}
            <Card className="group hover:shadow-2xl transition-all duration-300 cursor-pointer bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:scale-105">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-emerald-100 rounded-full w-20 h-20 flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                  <Stethoscope className="h-10 w-10 text-emerald-600" />
                </div>
                <CardTitle className="text-2xl text-emerald-800 group-hover:text-emerald-600 transition-colors">
                  Bronquiectasias
                </CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  Escalas específicas para avaliação de pacientes com bronquiectasias
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-800">Escalas Disponíveis:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• BHQ - Quality of Life Questionnaire</li>
                  </ul>
                </div>
                <div className="pt-4">
                  <Button 
                    onClick={() => navigate('/bronchiectasis')}
                    className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 text-base py-3"
                  >
                    Acessar Escalas de Bronquiectasias
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-200">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Sistema Completo de Avaliação Pneumológica
                </h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Todos os questionários foram validados em português e seguem as diretrizes 
                  internacionais para avaliação de doenças respiratórias. Os resultados incluem 
                  interpretação clínica e recomendações baseadas em evidências científicas.
                </p>
                <div className="flex justify-center gap-4 pt-4">
                  <Badge variant="outline" className="text-blue-600 border-blue-600">
                    Validado em Português
                  </Badge>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    Baseado em Evidências
                  </Badge>
                  <Badge variant="outline" className="text-purple-600 border-purple-600">
                    Interpretação Clínica
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
