
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';

interface COPDQuestionnaireCardProps {
  questionnaire: {
    id: string;
    title: string;
    description: string;
    questions: number;
    time: string;
    icon: LucideIcon;
    color: string;
  };
  onSelect: (id: string) => void;
}

const COPDQuestionnaireCard: React.FC<COPDQuestionnaireCardProps> = ({
  questionnaire,
  onSelect
}) => {
  const IconComponent = questionnaire.icon;

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className={`p-3 rounded-full ${questionnaire.color} text-white group-hover:scale-110 transition-transform duration-300`}>
            <IconComponent className="h-6 w-6" />
          </div>
          <Badge variant="outline" className="text-xs">
            {questionnaire.questions} questões
          </Badge>
        </div>
        <CardTitle className="text-lg group-hover:text-orange-600 transition-colors">
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
          onClick={() => onSelect(questionnaire.id)}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
        >
          Iniciar Questionário
        </Button>
      </CardContent>
    </Card>
  );
};

export default COPDQuestionnaireCard;
