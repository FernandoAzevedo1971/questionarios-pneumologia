
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, ExternalLink, Activity, Wind } from 'lucide-react';

const References = () => {
  const asthmaReferences = [
    {
      title: "Asthma Control Test (ACT)",
      authors: "Nathan RA, Sorkness CA, Kosinski M, et al.",
      journal: "J Allergy Clin Immunol",
      year: "2004",
      volume: "113(1)",
      pages: "59-65",
      doi: "10.1016/j.jaci.2003.09.008",
      description: "Desenvolvimento e validação do Teste de Controle da Asma"
    },
    {
      title: "Validation of the Brazilian-Portuguese version of the Asthma Control Test",
      authors: "Roxo JPF, Ponte EV, Ramos DCB, et al.",
      journal: "J Bras Pneumol",
      year: "2010",
      volume: "36(2)",
      pages: "159-166",
      doi: "10.1590/S1806-37132010000200002",
      description: "Validação da versão brasileira do ACT"
    },
    {
      title: "Asthma Control Questionnaire (ACQ)",
      authors: "Juniper EF, O'Byrne PM, Guyatt GH, et al.",
      journal: "Eur Respir J",
      year: "1999",
      volume: "14(4)",
      pages: "902-907",
      doi: "10.1034/j.1399-3003.1999.14d29.x",
      description: "Desenvolvimento do Questionário de Controle da Asma"
    },
    {
      title: "Validation of the Brazilian Portuguese version of the Asthma Quality of Life Questionnaire",
      authors: "Juniper EF, Buist AS, Cox FM, et al.",
      journal: "J Bras Pneumol",
      year: "2006",
      volume: "32(2)",
      pages: "114-122",
      doi: "10.1590/S1806-37132006000200005",
      description: "Validação brasileira do AQLQ"
    }
  ];

  const copdReferences = [
    {
      title: "Development and first validation of the COPD Assessment Test",
      authors: "Jones PW, Harding G, Berry P, et al.",
      journal: "Eur Respir J",
      year: "2009",
      volume: "34(3)",
      pages: "648-654",
      doi: "10.1183/09031936.00102509",
      description: "Desenvolvimento e primeira validação do CAT"
    },
    {
      title: "Validation of the Brazilian Portuguese version of the COPD Assessment Test",
      authors: "Silva GPF, Morano MTAP, Viana CMS, et al.",
      journal: "J Bras Pneumol",
      year: "2013",
      volume: "39(4)",
      pages: "402-408",
      doi: "10.1590/S1806-37132013000400002",
      description: "Validação da versão brasileira do CAT"
    },
    {
      title: "Standardisation of spirometry",
      authors: "Miller MR, Hankinson J, Brusasco V, et al.",
      journal: "Eur Respir J",
      year: "2005",
      volume: "26(2)",
      pages: "319-338",
      doi: "10.1183/09031936.05.00034805",
      description: "Padronização da espirometria - inclui escala MRC"
    },
    {
      title: "Dyspnoea measures in primary care",
      authors: "Bestall JC, Paul EA, Garrod R, et al.",
      journal: "Thorax",
      year: "1999",
      volume: "54(7)",
      pages: "581-586",
      doi: "10.1136/thx.54.7.581",
      description: "Medidas de dispneia na atenção primária - validação MRC"
    },
    {
      title: "Psychophysical bases of perceived exertion",
      authors: "Borg GA",
      journal: "Med Sci Sports Exerc",
      year: "1982",
      volume: "14(5)",
      pages: "377-381",
      doi: "10.1249/00005768-198205000-00012",
      description: "Bases psicofísicas da escala de esforço percebido"
    },
    {
      title: "Clinical application of Borg's ratings",
      authors: "Borg G, Ljunggren G, Ceci R",
      journal: "Scand J Work Environ Health",
      year: "1985",
      volume: "11 Suppl 4",
      pages: "45-50",
      description: "Aplicação clínica das escalas de BORG"
    }
  ];

  const additionalCOPDTools = [
    {
      title: "St. George's Respiratory Questionnaire (SGRQ)",
      description: "Questionário específico para avaliar qualidade de vida relacionada à saúde em doenças respiratórias",
      indication: "Avaliação de qualidade de vida em DPOC"
    },
    {
      title: "COPD Control Questionnaire (CCQ)",
      description: "Questionário para avaliar controle clínico da DPOC",
      indication: "Monitoramento do controle dos sintomas"
    },
    {
      title: "Clinical COPD Questionnaire (CCQ)",
      description: "Instrumento breve para avaliar status funcional em DPOC",
      indication: "Avaliação funcional rápida"
    },
    {
      title: "BODE Index",
      description: "Índice multidimensional (IMC, Obstrução, Dispneia, Exercício)",
      indication: "Avaliação prognóstica em DPOC"
    },
    {
      title: "Teste de Caminhada de 6 Minutos (TC6M)",
      description: "Teste de capacidade funcional submáxima",
      indication: "Avaliação da capacidade de exercício"
    },
    {
      title: "Escala de Fadiga de Chalder",
      description: "Avaliação de fadiga em pacientes com doenças crônicas",
      indication: "Avaliação complementar de fadiga"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-blue-600" />
            Referências Bibliográficas
          </CardTitle>
          <p className="text-gray-600">
            Referências científicas dos questionários e escalas validados implementados no sistema
          </p>
        </CardHeader>
      </Card>

      {/* Asthma References */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Activity className="h-5 w-5 text-blue-600" />
            Questionários de Asma Brônquica
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {asthmaReferences.map((ref, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4 space-y-2">
              <h3 className="text-lg font-semibold text-gray-800">{ref.title}</h3>
              <p className="text-sm text-gray-600">{ref.description}</p>
              <div className="space-y-1 text-sm">
                <p><strong>Autores:</strong> {ref.authors}</p>
                <p><strong>Periódico:</strong> {ref.journal}</p>
                <p><strong>Ano:</strong> {ref.year} | <strong>Volume:</strong> {ref.volume} | <strong>Páginas:</strong> {ref.pages}</p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">DOI: {ref.doi}</Badge>
                  <a 
                    href={`https://doi.org/${ref.doi}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Acessar
                  </a>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* COPD References */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Wind className="h-5 w-5 text-orange-600" />
            Questionários e Escalas de DPOC
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {copdReferences.map((ref, index) => (
            <div key={index} className="border-l-4 border-orange-500 pl-4 space-y-2">
              <h3 className="text-lg font-semibold text-gray-800">{ref.title}</h3>
              <p className="text-sm text-gray-600">{ref.description}</p>
              <div className="space-y-1 text-sm">
                <p><strong>Autores:</strong> {ref.authors}</p>
                <p><strong>Periódico:</strong> {ref.journal}</p>
                <p><strong>Ano:</strong> {ref.year} | <strong>Volume:</strong> {ref.volume} | <strong>Páginas:</strong> {ref.pages}</p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">DOI: {ref.doi}</Badge>
                  <a 
                    href={`https://doi.org/${ref.doi}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Acessar
                  </a>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Additional COPD Tools */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <BookOpen className="h-5 w-5 text-green-600" />
            Outros Instrumentos de Avaliação em DPOC
          </CardTitle>
          <p className="text-gray-600">
            Sugestões de outros questionários e escalas relevantes para avaliação completa em DPOC
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {additionalCOPDTools.map((tool, index) => (
            <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{tool.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{tool.description}</p>
              <Badge className="bg-green-100 text-green-800">
                {tool.indication}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-yellow-50 border-yellow-200 border-2">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <BookOpen className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <strong>Nota importante:</strong> Todos os questionários implementados neste sistema foram 
              validados para a população brasileira e devem ser utilizados como ferramentas complementares 
              à avaliação clínica. Os resultados devem sempre ser interpretados por profissionais de saúde 
              qualificados, considerando o contexto clínico individual de cada paciente.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default References;
