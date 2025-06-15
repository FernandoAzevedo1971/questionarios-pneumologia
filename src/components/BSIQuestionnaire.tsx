
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Estratificação: leve (0–4), moderada (5–8), grave (≥9)
const getSeverity = (score: number) => {
  if (score <= 4) return { label: "Leve", color: "bg-green-200 text-green-800" };
  if (score >= 5 && score <= 8) return { label: "Moderada", color: "bg-yellow-200 text-yellow-800" };
  return { label: "Grave", color: "bg-red-200 text-red-800" };
};

export default function BSIQuestionnaire() {
  const [form, setForm] = useState({
    age: "",
    bmi: "",
    fev1: "",
    priorHosp: "nao",
    exacerbations: "",
    mmrc: "",
    pseudomonas: "nao",
    pathogen: "nao",
    lobes: "nao",
  });
  const [score, setScore] = useState<number | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm(f => ({
      ...f,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    let s = 0;

    // Idade (<50: 0, 50–69:2, 70–79:4, ≥80:6)
    const age = parseInt(form.age, 10);
    if (age >= 80) s += 6;
    else if (age >= 70) s += 4;
    else if (age >= 50) s += 2;

    // IMC (<18.5:2, ≥18.5:0)
    const bmi = parseFloat(form.bmi.replace(",", "."));
    if (!isNaN(bmi) && bmi < 18.5) s += 2;

    // VEF1 (>80:0, 50–80:1, 30–49:2, <30:3)
    const fev1 = parseFloat(form.fev1.replace(",", "."));
    if (!isNaN(fev1)) {
      if (fev1 < 30) s += 3;
      else if (fev1 < 50) s += 2;
      else if (fev1 <= 80) s += 1;
    }

    // Hospitalização prévia por exacerbação em 2 anos (sim:5)
    if (form.priorHosp === "sim") s += 5;

    // ≥3 exacerbações no ano anter. (sim:2)
    const excb = parseInt(form.exacerbations, 10);
    if (!isNaN(excb) && excb >= 3) s += 2;

    // Grau dispneia mMRC (1-3:0, 4:2, 5:3)
    if (form.mmrc === "4") s += 2;
    if (form.mmrc === "5") s += 3;

    // Colonização
    if (form.pseudomonas === "sim") s += 3;
    if (form.pathogen === "sim" && form.pseudomonas !== "sim") s += 1;

    // Acometimento >2 lobos (sim:1)
    if (form.lobes === "sim") s += 1;

    setScore(s);
  }

  const severity = score !== null ? getSeverity(score) : null;

  return (
    <Card className="max-w-xl mx-auto animate-fade-in">
      <CardHeader>
        <CardTitle>
          Bronchiectasis Severity Index (BSI)
        </CardTitle>
        <CardDescription className="mb-2">
          Preencha os campos abaixo para calcular o BSI, conforme Chalmers et al. Am J Respir Crit Care Med. 2014;189(5):576-585.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="font-medium">Idade (anos)</label>
            <input
              type="number"
              required
              name="age"
              className="mt-1 w-full border rounded-md px-3 py-2"
              value={form.age}
              onChange={handleChange}
              min={0}
              max={130}
            />
          </div>
          <div>
            <label className="font-medium">IMC (kg/m²)</label>
            <input
              type="number"
              name="bmi"
              required
              step="0.1"
              className="mt-1 w-full border rounded-md px-3 py-2"
              value={form.bmi}
              onChange={handleChange}
              min={10}
              max={70}
            />
          </div>
          <div>
            <label className="font-medium">VEF₁ (% do previsto)</label>
            <input
              type="number"
              name="fev1"
              required
              min={5}
              max={150}
              className="mt-1 w-full border rounded-md px-3 py-2"
              value={form.fev1}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="font-medium">Hospitalização por exacerbação (últimos 2 anos)</label>
            <select
              name="priorHosp"
              className="mt-1 w-full border rounded-md px-3 py-2"
              value={form.priorHosp}
              onChange={handleChange}
            >
              <option value="nao">Não</option>
              <option value="sim">Sim</option>
            </select>
          </div>
          <div>
            <label className="font-medium">Nº de exacerbações no último ano</label>
            <input
              type="number"
              name="exacerbations"
              className="mt-1 w-full border rounded-md px-3 py-2"
              min={0}
              value={form.exacerbations}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="font-medium">Grau de dispneia mMRC</label>
            <select
              name="mmrc"
              className="mt-1 w-full border rounded-md px-3 py-2"
              value={form.mmrc}
              onChange={handleChange}
              required
            >
              <option value="">Selecione</option>
              <option value="1">1 (Sem dispneia significativa)</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5 (Dispneia ao mínimo esforço)</option>
            </select>
          </div>
          <div>
            <label className="font-medium">Colonização crônica por Pseudomonas aeruginosa</label>
            <select
              name="pseudomonas"
              className="mt-1 w-full border rounded-md px-3 py-2"
              value={form.pseudomonas}
              onChange={handleChange}
              required
            >
              <option value="nao">Não</option>
              <option value="sim">Sim</option>
            </select>
          </div>
          <div>
            <label className="font-medium">Colonização crônica por outros patógenos</label>
            <select
              name="pathogen"
              className="mt-1 w-full border rounded-md px-3 py-2"
              value={form.pathogen}
              onChange={handleChange}
              required
            >
              <option value="nao">Não</option>
              <option value="sim">Sim</option>
            </select>
          </div>
          <div>
            <label className="font-medium">Comprometimento de &gt;2 lóbulos (TCAR)</label>
            <select
              name="lobes"
              className="mt-1 w-full border rounded-md px-3 py-2"
              value={form.lobes}
              onChange={handleChange}
              required
            >
              <option value="nao">Não</option>
              <option value="sim">Sim</option>
            </select>
          </div>
          <Button type="submit" className="w-full mt-4">
            Calcular escore BSI
          </Button>
        </form>
        {score !== null && (
          <div className="mt-6 text-center">
            <h3 className="text-xl font-semibold mb-3">Resultado</h3>
            <div className={`inline-block px-5 py-2 rounded-md font-bold text-lg ${severity?.color}`}>
              Escore: {score} — Gravidade: {severity?.label}
            </div>
            <div className="text-sm text-gray-600 mt-2 max-w-md mx-auto">
              {severity?.label === "Leve" && "Risco baixo (< 3% de mortalidade/ano e < 4% de hospitalização/ano)."}
              {severity?.label === "Moderada" && "Risco intermediário (3-10% mortalidade/ano, 5-15% hospitalização/ano)."}
              {severity?.label === "Grave" && "Risco aumentado (até 10% mortalidade/ano e >16% hospitalização/ano)."}
            </div>
          </div>
        )}
        <div className="mt-8 text-xs text-gray-500">
          Fonte: Chalmers JD et al, Am J Respir Crit Care Med. 2014. Não validado para português.
        </div>
      </CardContent>
    </Card>
  );
}
