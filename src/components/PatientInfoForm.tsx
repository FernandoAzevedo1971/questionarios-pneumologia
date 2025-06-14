
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';

interface PatientData {
  name: string;
  age: string;
  gender: string;
}

interface PatientInfoFormProps {
  patientData: PatientData;
  onPatientDataChange: (data: PatientData) => void;
}

const PatientInfoForm: React.FC<PatientInfoFormProps> = ({
  patientData,
  onPatientDataChange
}) => {
  const handleChange = (field: keyof PatientData, value: string) => {
    onPatientDataChange({
      ...patientData,
      [field]: value
    });
  };

  return (
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
              onChange={(e) => handleChange('name', e.target.value)}
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
              onChange={(e) => handleChange('age', e.target.value)}
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
              onChange={(e) => handleChange('gender', e.target.value)}
            >
              <option value="">Selecione</option>
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
            </select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientInfoForm;
