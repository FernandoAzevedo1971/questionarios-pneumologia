
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, FileText, ArrowRight, LucideIcon } from 'lucide-react';

interface Questionnaire {
  id: string;
  title: string;
  description: string;
  questions: number;
  time: string;
  icon: LucideIcon;
  color: string;
}

interface SmokingQuestionnaireCardProps {
  questionnaire: Questionnaire;
  onSelect: (id: string) => void;
}

const SmokingQuestionnaireCard: React.FC<SmokingQuestionnaireCardProps> = ({
  questionnaire,
  onSelect
}) => {
  const IconComponent = questionnaire.icon;

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:scale-105">
      <CardHeader className="text-center pb-2">
        <div className={`mx-auto mb-3 p-3 ${questionnaire.color} rounded-full w-14 h-14 flex items-center justify-center group-hover:scale-110 transition-transform`}>
          <IconComponent className="h-7 w-7 text-white" />
        </div>
        <CardTitle className="text-lg text-gray-800 group-hover:text-amber-600 transition-colors">
          {questionnaire.title}
        </CardTitle>
        <CardDescription className="text-sm text-gray-600">
          {questionnaire.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <FileText className="h-3 w-3" />
            {questionnaire.questions} questões
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {questionnaire.time}
          </Badge>
        </div>
        <Button 
          onClick={() => onSelect(questionnaire.id)}
          className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 transition-all duration-300"
        >
          Iniciar
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default SmokingQuestionnaireCard;
