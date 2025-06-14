
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { History, Calendar, User, Trash2, Download, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const PatientHistory = () => {
  const [results, setResults] = useState<any[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<string>('all');

  useEffect(() => {
    const savedResults = JSON.parse(localStorage.getItem('asmacheck_results') || '[]');
    setResults(savedResults.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  }, []);

  const uniquePatients = [...new Set(results.map(r => r.patientData.name).filter(Boolean))];

  const filteredResults = selectedPatient === 'all' 
    ? results 
    : results.filter(r => r.patientData.name === selectedPatient);

  const getQuestionnaireColor = (questionnaire: string) => {
    switch (questionnaire) {
      case 'ACT': return 'bg-blue-100 text-blue-800';
      case 'ACQ': return 'bg-green-100 text-green-800';
      case 'AQLQ-S': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getControlColor = (questionnaire: string, score: number) => {
    if (questionnaire === 'ACT') {
      if (score >= 20) return 'text-green-600';
      if (score >= 16) return 'text-yellow-600';
      return 'text-red-600';
    }
    if (questionnaire === 'ACQ') {
      if (score <= 0.75) return 'text-green-600';
      if (score <= 1.50) return 'text-yellow-600';
      return 'text-red-600';
    }
    if (questionnaire === 'AQLQ-S') {
      if (score >= 6.0) return 'text-green-600';
      if (score >= 5.0) return 'text-blue-600';
      if (score >= 4.0) return 'text-yellow-600';
      return 'text-red-600';
    }
    return 'text-gray-600';
  };

  const deleteResult = (index: number) => {
    const newResults = results.filter((_, i) => i !== index);
    setResults(newResults);
    localStorage.setItem('asmacheck_results', JSON.stringify(newResults));
  };

  const exportResults = () => {
    const csvContent = [
      ['Data', 'Paciente', 'Idade', 'Sexo', 'Questionário', 'Pontuação', 'Interpretação'],
      ...filteredResults.map(result => [
        format(new Date(result.date), 'dd/MM/yyyy HH:mm', { locale: ptBR }),
        result.patientData.name || 'Não informado',
        result.patientData.age || 'Não informado',
        result.patientData.gender === 'M' ? 'Masculino' : result.patientData.gender === 'F' ? 'Feminino' : 'Não informado',
        result.questionnaire,
        result.questionnaire === 'ACQ' ? result.score.toFixed(2) : 
        result.questionnaire === 'AQLQ-S' ? result.score.toFixed(1) : 
        result.score.toString(),
        result.interpretation.level
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `asmacheck_historico_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    link.click();
  };

  const clearHistory = () => {
    if (confirm('Tem certeza que deseja limpar todo o histórico? Esta ação não pode ser desfeita.')) {
      setResults([]);
      localStorage.removeItem('asmacheck_results');
    }
  };

  if (results.length === 0) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5 text-gray-600" />
            Histórico de Avaliações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Nenhuma avaliação realizada ainda.</p>
            <p className="text-sm">Complete um questionário para ver o histórico aqui.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5 text-gray-600" />
            Histórico de Avaliações
          </CardTitle>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={exportResults}
              className="flex items-center gap-1"
            >
              <Download className="h-4 w-4" />
              Exportar
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={clearHistory}
              className="flex items-center gap-1 text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
              Limpar
            </Button>
          </div>
        </div>
        
        {uniquePatients.length > 0 && (
          <div className="flex items-center gap-2 mt-4">
            <User className="h-4 w-4 text-gray-500" />
            <select
              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedPatient}
              onChange={(e) => setSelectedPatient(e.target.value)}
            >
              <option value="all">Todos os pacientes</option>
              {uniquePatients.map(patient => (
                <option key={patient} value={patient}>{patient}</option>
              ))}
            </select>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {filteredResults.map((result, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Badge className={getQuestionnaireColor(result.questionnaire)}>
                    {result.questionnaire}
                  </Badge>
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {format(new Date(result.date), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                  </span>
                </div>
                
                <div className="flex items-center gap-4">
                  <div>
                    <span className="font-medium text-gray-800">
                      {result.patientData.name || 'Paciente não identificado'}
                    </span>
                    {result.patientData.age && (
                      <span className="text-sm text-gray-500 ml-2">
                        ({result.patientData.age} anos)
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-gray-400" />
                    <span className={`font-bold ${getControlColor(result.questionnaire, result.score)}`}>
                      {result.questionnaire === 'ACQ' ? result.score.toFixed(2) : 
                       result.questionnaire === 'AQLQ-S' ? result.score.toFixed(1) : 
                       result.score}
                    </span>
                  </div>
                  
                  <span className={`text-sm ${getControlColor(result.questionnaire, result.score)}`}>
                    {result.interpretation.level}
                  </span>
                </div>
              </div>
              
              <Button
                size="sm"
                variant="ghost"
                onClick={() => deleteResult(index)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-sm text-gray-500 text-center">
          {filteredResults.length} avaliação{filteredResults.length !== 1 ? 'ões' : ''} encontrada{filteredResults.length !== 1 ? 's' : ''}
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientHistory;
