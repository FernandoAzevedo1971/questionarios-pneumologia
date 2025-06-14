
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, ExternalLink, Download, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

const References = () => {
  const references = [
    {
      id: 1,
      category: "ACT - Asthma Control Test",
      title: "Validation of the Asthma Control Test in a general population sample",
      authors: "Schatz M, Sorkness CA, Li JT, et al.",
      journal: "American Journal of Respiratory and Critical Care Medicine",
      year: "2006",
      volume: "173(9)",
      pages: "1091-1097",
      doi: "10.1164/rccm.200512-1922OC",
      description: "Estudo original de validação do teste ACT em população geral, demonstrando sua eficácia na avaliação do controle da asma."
    },
    {
      id: 2,
      category: "ACT - Versão Brasileira",
      title: "Validação do Teste de Controle da Asma em português do Brasil",
      authors: "Roxo JPF, Ponte EV, Ramos DCB, et al.",
      journal: "Jornal Brasileiro de Pneumologia",
      year: "2010",
      volume: "36(2)",
      pages: "159-166",
      doi: "10.1590/S1806-37132010000200002",
      description: "Validação da versão brasileira do ACT, confirmando sua aplicabilidade na população brasileira."
    },
    {
      id: 3,
      category: "ACQ - Asthma Control Questionnaire",
      title: "Development and validation of a questionnaire to measure asthma control",
      authors: "Juniper EF, O'Byrne PM, Guyatt GH, et al.",
      journal: "European Respiratory Journal",
      year: "1999",
      volume: "14(4)",
      pages: "902-907",
      doi: "10.1034/j.1399-3003.1999.14d29.x",
      description: "Desenvolvimento original do ACQ, estabelecendo os fundamentos para avaliação objetiva do controle da asma."
    },
    {
      id: 4,
      category: "ACQ - Versão Brasileira",
      title: "Validação do Questionário de Controle da Asma para uso no Brasil",
      authors: "Leite M, Ponte EV, Petroni J, et al.",
      journal: "Jornal Brasileiro de Pneumologia",
      year: "2008",
      volume: "34(10)",
      pages: "756-763",
      doi: "10.1590/S1806-37132008001000002",
      description: "Adaptação transcultural e validação do ACQ para a população brasileira."
    },
    {
      id: 5,
      category: "AQLQ - Asthma Quality of Life Questionnaire",
      title: "Measuring quality of life in asthma",
      authors: "Juniper EF, Guyatt GH, Epstein RS, et al.",
      journal: "American Review of Respiratory Disease",
      year: "1992",
      volume: "146(4)",
      pages: "888-894",
      doi: "10.1164/ajrccm/146.4.888",
      description: "Estudo seminal sobre o desenvolvimento do AQLQ para avaliação da qualidade de vida em pacientes com asma."
    },
    {
      id: 6,
      category: "AQLQ-S - Versão Simplificada",
      title: "Development and validation of the standardised asthma quality of life questionnaire",
      authors: "Juniper EF, Buist AS, Cox FM, et al.",
      journal: "European Respiratory Journal",
      year: "1999",
      volume: "14(1)",
      pages: "32-38",
      doi: "10.1034/j.1399-3003.1999.14a08.x",
      description: "Desenvolvimento da versão padronizada do AQLQ, facilitando sua aplicação clínica."
    },
    {
      id: 7,
      category: "AQLQ - Versão Brasileira",
      title: "Validação do Questionário de Qualidade de Vida na Asma (AQLQ) para uso no Brasil",
      authors: "Camelier AA, Rosa FW, Salim M, et al.",
      journal: "Jornal de Pneumologia",
      year: "2007",
      volume: "33(2)",
      pages: "61-68",
      doi: "10.1590/S0102-35862007000200003",
      description: "Processo de validação cultural e linguística do AQLQ para a população brasileira."
    },
    {
      id: 8,
      category: "Diretrizes GINA",
      title: "Global Strategy for Asthma Management and Prevention",
      authors: "Global Initiative for Asthma (GINA)",
      journal: "GINA Report",
      year: "2023",
      volume: "Current",
      pages: "1-273",
      doi: "Available at: www.ginasthma.org",
      description: "Diretrizes internacionais mais atuais para manejo e prevenção da asma, incluindo recomendações sobre questionários de controle."
    },
    {
      id: 9,
      category: "Diretrizes Brasileiras",
      title: "Diretrizes da Sociedade Brasileira de Pneumologia e Tisiologia para o Manejo da Asma",
      authors: "Sociedade Brasileira de Pneumologia e Tisiologia",
      journal: "Jornal Brasileiro de Pneumologia",
      year: "2020",
      volume: "46(1)",
      pages: "e20190307",
      doi: "10.36416/1806-3756/e20190307",
      description: "Diretrizes nacionais brasileiras para manejo da asma, incluindo recomendações específicas para uso de questionários validados."
    },
    {
      id: 10,
      category: "Consenso Internacional",
      title: "An international consensus on asthma control",
      authors: "Reddel HK, Taylor DR, Bateman ED, et al.",
      journal: "European Respiratory Journal",
      year: "2009",
      volume: "33(3)",
      pages: "509-518",
      doi: "10.1183/09031936.00873008",
      description: "Consenso internacional sobre definição e avaliação do controle da asma, fundamental para interpretação dos questionários."
    }
  ];

  const getCategoryColor = (category: string) => {
    if (category.includes('ACT')) return 'bg-blue-100 text-blue-800';
    if (category.includes('ACQ')) return 'bg-green-100 text-green-800';
    if (category.includes('AQLQ')) return 'bg-purple-100 text-purple-800';
    if (category.includes('GINA')) return 'bg-orange-100 text-orange-800';
    if (category.includes('Brasileira')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  const handleCopyReference = (reference: any) => {
    const citation = `${reference.authors} ${reference.title}. ${reference.journal}. ${reference.year};${reference.volume}:${reference.pages}. DOI: ${reference.doi}`;
    navigator.clipboard.writeText(citation);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="bg-white shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <BookOpen className="h-6 w-6 text-blue-600" />
            Referências Bibliográficas
          </CardTitle>
          <p className="text-gray-600 mt-2">
            Literatura científica que fundamenta os questionários de asma validados em português
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {references.map((ref) => (
              <Card key={ref.id} className="border-l-4 border-l-blue-500 bg-gray-50">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <Badge className={getCategoryColor(ref.category)}>
                      {ref.category}
                    </Badge>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCopyReference(ref)}
                        className="h-8 w-8 p-0"
                      >
                        <FileText className="h-4 w-4" />
                      </Button>
                      {ref.doi.includes('http') && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(ref.doi, '_blank')}
                          className="h-8 w-8 p-0"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 leading-tight">
                    {ref.title}
                  </h3>
                </CardHeader>
                <CardContent className="pt-0 space-y-3">
                  <div className="text-sm text-gray-600">
                    <p><strong>Autores:</strong> {ref.authors}</p>
                    <p><strong>Periódico:</strong> {ref.journal}</p>
                    <p><strong>Ano:</strong> {ref.year} | <strong>Volume:</strong> {ref.volume} | <strong>Páginas:</strong> {ref.pages}</p>
                    <p><strong>DOI:</strong> {ref.doi}</p>
                  </div>
                  <p className="text-gray-700 text-sm bg-white p-3 rounded border-l-2 border-l-gray-300">
                    {ref.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center gap-2">
              <Download className="h-5 w-5" />
              Como Citar Este Aplicativo
            </h3>
            <div className="bg-white p-4 rounded border text-sm font-mono">
              AsmaCheck - Questionários de Asma Brônquica. Aplicativo web para avaliação de controle e qualidade de vida em asma. Versão 1.0. 2024. Disponível em: [URL do aplicativo]
            </div>
          </div>

          <div className="mt-6 bg-yellow-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-yellow-800 mb-3">
              Importante - Uso Clínico
            </h3>
            <ul className="text-sm text-yellow-700 space-y-2">
              <li>• Os questionários são ferramentas auxiliares na avaliação clínica da asma</li>
              <li>• Não substituem a avaliação médica completa e o julgamento clínico</li>
              <li>• Devem ser interpretados no contexto clínico de cada paciente</li>
              <li>• Recomenda-se aplicação periódica para monitoramento longitudinal</li>
              <li>• Todos os questionários foram validados para população adulta brasileira</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default References;
