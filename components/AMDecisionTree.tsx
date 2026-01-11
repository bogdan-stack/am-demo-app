'use client'

import React, { useState } from 'react';
import { ChevronRight, CheckCircle, Info, Book } from 'lucide-react';
import LogoBar from './LogoBar';

const AMDecisionTree = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const furnizori = [
    {
      nume: 'B2N',
      tip: 'Distribuitor + servicii la cerere',
      tehnologii: ['FDM', 'SLA', 'SLS'],
      ofertareOnline: true,
      link: 'https://b2n.ro/',
      descriere: 'Imprimante FDM/SLA/SLS; servicii "on demand"',
      potrivit: ['fdm', 'sla', 'sls']
    },
    {
      nume: 'Admasys',
      tip: 'Distribuitor + centru de aplicații',
      tehnologii: ['FDM', 'SLA', 'SLS', 'DMLS'],
      ofertareOnline: true,
      link: 'https://admasys.ro/servicii-centrul-de-aplicatii-de-imprimare-3d/imprimare-3d-si-scanare-3d-personalizata/',
      descriere: 'Imprimare 3D și scanare 3D personalizată; portofoliu echipamente/materiale',
      potrivit: ['fdm', 'sla', 'sls', 'dmls'],
      serviciiExtra: ['scanare 3D']
    },
    {
      nume: 'Capib (3DPrint)',
      tip: 'Service bureau',
      tehnologii: ['SLS', 'SLA', 'FDM'],
      ofertareOnline: true,
      link: 'https://3dprint.capib.ro/en/3d-printing-services/',
      descriere: 'Servicii printare 3D; ofertare rapidă',
      potrivit: ['fdm', 'sla', 'sls'],
      avantaje: ['ofertare_rapida']
    },
    {
      nume: 'service3d.ro',
      tip: 'Service (mentenanță)',
      tehnologii: [],
      ofertareOnline: true,
      link: 'https://service3d.ro/',
      descriere: 'Reparații/calibrare imprimante 3D',
      potrivit: ['mentenanta'],
      serviciiExtra: ['reparații', 'calibrare']
    },
    {
      nume: 'FormWerk România',
      tip: 'Distribuitor/retailer + servicii',
      tehnologii: ['FDM', 'SLA', 'SLS'],
      ofertareOnline: true,
      link: 'https://formwerk.ro/',
      descriere: 'Printare 3D la comandă / servicii conexe',
      potrivit: ['fdm', 'sla', 'sls']
    }
  ];

  const questions = [
    {
      id: 'scop',
      label: 'Scop piesă',
      options: [
        { value: 'prototip_vizual', label: 'Prototip vizual' },
        { value: 'prototip_functional', label: 'Prototip funcțional' },
        { value: 'productie_serie_mica', label: 'Producție serie mică (1-100 buc)' },
        { value: 'productie_serie_mare', label: 'Producție serie mare (100+ buc)' },
        { value: 'scule_fabricatie', label: 'Scule/Dispozitive de fabricație' }
      ]
    },
    {
      id: 'cantitate',
      label: 'Cantitate necesară',
      options: [
        { value: '1-10', label: '1-10 piese' },
        { value: '11-50', label: '11-50 piese' },
        { value: '51-100', label: '51-100 piese' },
        { value: '101-500', label: '101-500 piese' },
        { value: '500+', label: 'Peste 500 piese' }
      ]
    },
    {
      id: 'termen',
      label: 'Termen de livrare',
      options: [
        { value: '1-3_zile', label: '1-3 zile' },
        { value: '1-2_saptamani', label: '1-2 săptămâni' },
        { value: '2-4_saptamani', label: '2-4 săptămâni' },
        { value: '1-3_luni', label: '1-3 luni' },
        { value: '3+_luni', label: 'Peste 3 luni' }
      ]
    },
    {
      id: 'complexitate',
      label: 'Complexitate geometrică',
      type: 'scale',
      min: 1,
      max: 5,
      labels: ['Simplă (geometrii de bază)', 'Medie (canale, cavități)', 'Complexă (geometrii organice, lattice)']
    },
    {
      id: 'cavitati',
      label: 'Cavități interne / Canale',
      type: 'scale',
      min: 1,
      max: 5,
      labels: ['Fără cavități', 'Cavități simple', 'Cavități complexe/inaccesibile']
    },
    {
      id: 'tolerante',
      label: 'Criticitate toleranțe dimensionale',
      type: 'scale',
      min: 1,
      max: 5,
      labels: ['±0.5mm acceptabil', '±0.2mm necesar', '±0.05mm sau mai bine']
    },
    {
      id: 'estetica',
      label: 'Cerințe estetice / Finisaj',
      type: 'scale',
      min: 1,
      max: 5,
      labels: ['Finisaj brut acceptabil', 'Finisaj mediu', 'Finisaj foarte fin, transparent']
    },
    {
      id: 'solicitare_mecanica',
      label: 'Solicitare mecanică',
      type: 'scale',
      min: 1,
      max: 5,
      labels: ['Minimă (vizualizare)', 'Medie (testare funcțională)', 'Ridicată (utilizare finală)']
    },
    {
      id: 'cerinte_termice',
      label: 'Cerințe termice/chimice',
      type: 'scale',
      min: 1,
      max: 5,
      labels: ['Fără expunere', 'Temperaturi medii (<80°C)', 'Temperature ridicate (>100°C) sau chimicale']
    },
    {
      id: 'material',
      label: 'Tip material necesar',
      options: [
        { value: 'plastic_standard', label: 'Plastic standard (PLA, ABS)' },
        { value: 'plastic_engineering', label: 'Plastic engineering (Nylon, PC, PEEK)' },
        { value: 'rasina_standard', label: 'Rășină standard' },
        { value: 'rasina_engineering', label: 'Rășină engineering (rezistență termică/mecanică)' },
        { value: 'metal', label: 'Metal (aluminiu, oțel, titan)' },
        { value: 'flexibil', label: 'Material flexibil (TPU, elastomeri)' }
      ]
    },
    {
      id: 'echipamente_interne',
      label: 'Echipamente AM disponibile intern',
      options: [
        { value: 'fdm', label: 'FDM (Fused Deposition Modeling)' },
        { value: 'sla', label: 'SLA/DLP (Stereolithography)' },
        { value: 'sls', label: 'SLS (Selective Laser Sintering)' },
        { value: 'dmls', label: 'DMLS/SLM (Metal 3D Printing)' },
        { value: 'multiple', label: 'Multiple tehnologii' },
        { value: 'niciuna', label: 'Nicio tehnologie AM disponibilă' }
      ]
    },
    {
      id: 'capabilitate_qc',
      label: 'Capabilitate control calitate intern',
      type: 'scale',
      min: 1,
      max: 5,
      labels: ['Fără echipamente măsurare', 'Șublere/Micrometre de bază', 'CMM sau scaner 3D disponibil']
    },
    {
      id: 'post_procesare',
      label: 'Post-procesare acceptată',
      options: [
        { value: 'minima', label: 'Minimă (îndepărtare suporturi)' },
        { value: 'medie', label: 'Medie (șlefuire, vopsire)' },
        { value: 'extinsa', label: 'Extinsă (prelucrare CNC, tratamente termice)' }
      ]
    },
    {
      id: 'frecventa',
      label: 'Frecvență utilizare tehnologie AM',
      options: [
        { value: 'ocazional', label: 'Ocazional (câteva proiecte/an)' },
        { value: 'regulat', label: 'Regulat (lunar)' },
        { value: 'frecvent', label: 'Frecvent (săptămânal sau zilnic)' }
      ]
    },
    {
      id: 'buget',
      label: 'Buget estimat per piesă',
      options: [
        { value: 'sub_100', label: 'Sub 100 RON' },
        { value: '100-500', label: '100-500 RON' },
        { value: '500-2000', label: '500-2000 RON' },
        { value: '2000+', label: 'Peste 2000 RON' }
      ]
    }
  ];

  const calculateRecommendation = (data: any) => {
    const scores = {
      fdm: 0,
      sla: 0,
      sls: 0,
      dmls: 0,
      intern: 0,
      externalizare: 0,
      traditional: 0,
      mixt: 0
    };

    const details: any = {
      fdm: [],
      sla: [],
      sls: [],
      dmls: [],
      intern: [],
      externalizare: [],
      traditional: [],
      mixt: []
    };

    // Extract numeric values
    const cantitate = parseInt(data.cantitate?.split('-')[0]) || 1;
    const complexitate = parseInt(data.complexitate) || 3;
    const cavitati = parseInt(data.cavitati) || 3;
    const tolerante = parseInt(data.tolerante) || 3;
    const estetica = parseInt(data.estetica) || 3;
    const solicitare = parseInt(data.solicitare_mecanica) || 3;
    const cerinte_termice = parseInt(data.cerinte_termice) || 3;
    const qc = parseInt(data.capabilitate_qc) || 3;

    // TECHNOLOGY SCORING - More refined logic

    // FDM Scoring
    if (data.material === 'plastic_standard' || data.material === 'plastic_engineering' || data.material === 'flexibil') {
      scores.fdm += 3;
      details.fdm.push('Material compatibil cu FDM');
      
      if (complexitate <= 3 && cavitati <= 3) {
        scores.fdm += 2;
        details.fdm.push('Geometrie potrivită pentru FDM');
      }
      if (tolerante <= 3 && estetica <= 3) {
        scores.fdm += 2;
        details.fdm.push('Cerințe de precizie și finisaj accesibile FDM');
      }
      if (data.buget === 'sub_100' || data.buget === '100-500') {
        scores.fdm += 2;
        details.fdm.push('Buget favorabil pentru FDM');
      }
      if (cantitate >= 11) {
        scores.fdm += 1;
        details.fdm.push('Cantitate medie potrivită pentru FDM');
      }
    } else if (data.material === 'rasina_standard' || data.material === 'rasina_engineering') {
      scores.fdm = -10;
      details.fdm = ['FDM nu procesează rășini - folosește SLA'];
    } else if (data.material === 'metal') {
      scores.fdm = -10;
      details.fdm = ['FDM nu procesează metale - folosește DMLS'];
    }

    // SLA Scoring
    if (data.material === 'rasina_standard' || data.material === 'rasina_engineering') {
      scores.sla += 3;
      details.sla.push('Material compatibil cu SLA');
      
      if (estetica >= 4 || tolerante >= 4) {
        scores.sla += 3;
        details.sla.push('Cerințe ridicate de finisaj și precizie - ideal pentru SLA');
      }
      if (complexitate >= 4 || cavitati >= 3) {
        scores.sla += 2;
        details.sla.push('Geometrie complexă beneficiază de precizia SLA');
      }
      if (cantitate <= 50) {
        scores.sla += 2;
        details.sla.push('Cantitate mică-medie potrivită pentru SLA');
      }
      if (data.scop === 'prototip_vizual' || data.scop === 'prototip_functional') {
        scores.sla += 1;
        details.sla.push('Prototipare rapidă - punct forte SLA');
      }
    } else if (data.material === 'plastic_standard' || data.material === 'plastic_engineering') {
      scores.sla = -10;
      details.sla = ['SLA procesează rășini, nu filamente plastice - folosește FDM'];
    } else if (data.material === 'metal') {
      scores.sla = -10;
      details.sla = ['SLA nu procesează metale - folosește DMLS'];
    } else if (data.material === 'flexibil') {
      scores.sla = -10;
      details.sla = ['SLA nu procesează materiale flexibile - folosește FDM cu TPU'];
    }

    // SLS Scoring
    if (data.material === 'plastic_engineering') {
      scores.sls += 3;
      details.sls.push('Materiale engineering ideale pentru SLS');
      
      if (complexitate >= 4 && cavitati >= 4) {
        scores.sls += 3;
        details.sls.push('Geometrii foarte complexe fără suporturi - avantaj major SLS');
      }
      if (solicitare >= 4) {
        scores.sls += 3;
        details.sls.push('Proprietăți mecanice excelente pentru SLS');
      }
      if (cantitate >= 11 && cantitate <= 500) {
        scores.sls += 2;
        details.sls.push('Cantitate medie - optim pentru SLS');
      }
      if (data.post_procesare === 'minima') {
        scores.sls += 2;
        details.sls.push('SLS necesită post-procesare minimă');
      }
    } else if (data.material === 'plastic_standard') {
      scores.sls += 1;
      details.sls.push('SLS poate procesa plastice standard, dar mai puțin eficient decât FDM');
    } else if (data.material === 'rasina_standard' || data.material === 'rasina_engineering') {
      scores.sls = -10;
      details.sls = ['SLS procesează pulberi plastice, nu rășini - folosește SLA'];
    } else if (data.material === 'metal') {
      scores.sls = -10;
      details.sls = ['SLS procesează plastice, nu metale - folosește DMLS'];
    } else if (data.material === 'flexibil') {
      scores.sls = -5;
      details.sls = ['SLS poate procesa TPU dar FDM este mai accesibil pentru flexibile'];
    }

    // DMLS Scoring
    if (data.material === 'metal') {
      scores.dmls += 5;
      details.dmls.push('Material metalic - doar DMLS este viabil');
      
      if (solicitare >= 4 || cerinte_termice >= 4) {
        scores.dmls += 3;
        details.dmls.push('Cerințe mecanice/termice ridicate - DMLS oferă performanță superioară');
      }
      if (tolerante >= 4) {
        scores.dmls += 2;
        details.dmls.push('Precizie dimensională ridicată posibilă cu DMLS');
      }
      if (complexitate >= 4) {
        scores.dmls += 2;
        details.dmls.push('Geometrii complexe optimizate pentru metal');
      }
    } else {
      // DMLS is not viable for non-metal materials
      scores.dmls = 0;
      details.dmls = ['DMLS este disponibil doar pentru materiale metalice'];
    }

    // Ensure DMLS is not recommended for non-metal materials
    if (data.material !== 'metal') {
      scores.dmls = -10; // Strong negative score to prevent DMLS recommendation
    }

    // APPROACH SCORING - More comprehensive

    // Internal AM scoring
    if (data.echipamente_interne !== 'niciuna') {
      scores.intern += 4;
      details.intern.push('Echipamente disponibile intern');
      
      if (data.frecventa === 'frecvent') {
        scores.intern += 3;
        details.intern.push('Utilizare frecventă justifică investiția internă');
      } else if (data.frecventa === 'regulat') {
        scores.intern += 2;
        details.intern.push('Utilizare regulată - eficient intern');
      } else if (data.frecventa === 'ocazional') {
        scores.intern -= 1;
        details.intern.push('Utilizare ocazională - cost pe piesă mai mare intern');
      }
    } else {
      scores.intern -= 5;
      details.intern.push('Lipsă echipamente - investiție inițială necesară');
    }

    if (data.termen === '1-3_zile') {
      scores.intern += 3;
      details.intern.push('Termen urgent favorabil pentru producție internă');
    }

    if (cantitate <= 50 && data.frecventa === 'frecvent') {
      scores.intern += 2;
      details.intern.push('Volume mici frecvente - eficient intern');
    }

    if (qc >= 3) {
      scores.intern += 2;
      details.intern.push('Capabilitate QC internă adecvată');
    } else {
      scores.intern -= 1;
      details.intern.push('QC limitat intern');
    }

    // Externalization scoring
    if (data.echipamente_interne === 'niciuna') {
      scores.externalizare += 4;
      details.externalizare.push('Fără echipamente - externalizarea elimină investiția inițială');
    }

    if (data.frecventa === 'ocazional') {
      scores.externalizare += 3;
      details.externalizare.push('Utilizare ocazională - mai eficient externalizat');
    }

    if (tolerante >= 4 || estetica >= 4) {
      scores.externalizare += 2;
      details.externalizare.push('Cerințe înalte - furnizorii au expertiză specializată');
    }

    if (data.post_procesare === 'extinsa') {
      scores.externalizare += 2;
      details.externalizare.push('Post-procesare extinsă mai bine gestionată extern');
    }

    if (cantitate >= 51) {
      scores.externalizare += 2;
      details.externalizare.push('Volume medii - furnizorii pot oferi prețuri competitive');
    }

    if (qc < 3) {
      scores.externalizare += 2;
      details.externalizare.push('QC limitat intern - furnizorii au certificări');
    }

    // Traditional manufacturing scoring
    if (cantitate >= 101) {
      scores.traditional += 3;
      details.traditional.push('Volume mari - fabricația tradițională devine competitivă');
      
      if (cantitate >= 500) {
        scores.traditional += 3;
        details.traditional.push('Volume foarte mari - cost unitar semnificativ mai mic');
      }
    }

    if (complexitate <= 2 && cavitati <= 2) {
      scores.traditional += 2;
      details.traditional.push('Geometrie simplă - ușor de fabricat tradițional');
    }

    if (data.termen === '1-3_luni' || data.termen === '3+_luni') {
      scores.traditional += 2;
      details.traditional.push('Termen generos permite amortizarea sculelor');
    }

    if (solicitare >= 4 && data.material !== 'metal') {
      scores.traditional += 1;
      details.traditional.push('Solicitări ridicate - materialele tradiționale pot fi superioare');
    }

    // Mixed approach scoring
    if (cantitate >= 51 && cantitate <= 500) {
      scores.mixt += 3;
      details.mixt.push('Volume medii - combinație prototipare AM + serie tradițional');
    }

    if (data.echipamente_interne !== 'niciuna' && data.frecventa === 'regulat') {
      scores.mixt += 2;
      details.mixt.push('Prototipare internă + externalizare pentru producție');
    }

    if (complexitate >= 4 && cantitate >= 51) {
      scores.mixt += 2;
      details.mixt.push('Piese complexe în AM + componente simple tradițional');
    }

    // Adjust for special cases
    if (data.scop === 'productie_serie_mare') {
      scores.traditional += 2;
      scores.intern -= 2;
      details.traditional.push('Serie mare favorabil fabricației tradiționale');
    }

    if (data.scop === 'scule_fabricatie') {
      scores.sls += 2;
      scores.dmls += 2;
      details.sls.push('Scule de fabricație - SLS/DMLS oferă durabilitate');
    }

    // Find best options - filter out negative scores
    const techScores = [
      { tech: 'FDM', score: scores.fdm, details: details.fdm },
      { tech: 'SLA', score: scores.sla, details: details.sla },
      { tech: 'SLS', score: scores.sls, details: details.sls },
      { tech: 'DMLS', score: scores.dmls, details: details.dmls }
    ].filter(t => t.score > 0).sort((a, b) => b.score - a.score);

    const approachScores = [
      { approach: 'AM Intern', score: scores.intern, details: details.intern },
      { approach: 'AM Externalizare', score: scores.externalizare, details: details.externalizare },
      { approach: 'Fabricație Tradițională', score: scores.traditional, details: details.traditional },
      { approach: 'Abordare Mixtă', score: scores.mixt, details: details.mixt }
    ].filter(a => a.score > 0).sort((a, b) => b.score - a.score);

    return {
      technology: techScores.length > 0 ? techScores[0].tech : 'Nicio tehnologie compatibilă',
      alternativeTech: techScores.length > 1 ? techScores[1].tech : null,
      approach: approachScores.length > 0 ? approachScores[0].approach : 'Nicio abordare recomandată',
      alternativeApproach: approachScores.length > 1 ? approachScores[1].approach : null,
      techScores: techScores,
      approachScores: approachScores,
      allScores: { tech: scores, details },
      furnizoriRecomandati: getFurnizoriRecomandati(techScores, approachScores, data)
    };
  };

  const getFurnizoriRecomandati = (techScores: any[], approachScores: any[], data: any) => {
    const recomandati: any[] = [];
    const needExternalizare = approachScores[0]?.approach === 'AM Externalizare' || 
                              data.echipamente_interne === 'niciuna';
    const needMentenanta = data.echipamente_interne !== 'niciuna' && 
                           data.echipamente_interne !== 'multiple';
    
    if (needExternalizare && techScores.length > 0) {
      const techPrincipal = techScores[0].tech.toLowerCase();
      
      // Găsește furnizori care oferă tehnologia principală
      furnizori.forEach(furnizor => {
        if (furnizor.potrivit.includes(techPrincipal) || 
            (furnizor.tehnologii.length > 0 && furnizor.tehnologii.some((t: string) => t.toLowerCase().includes(techPrincipal)))) {
          recomandati.push({
            ...furnizor,
            motiv: `Oferă servicii ${techScores[0].tech}`,
            prioritate: 'ridicată'
          });
        }
      });
    }
    
    // Adaugă service pentru mentenanță dacă are echipamente interne
    if (needMentenanta) {
      const serviceFurnizor = furnizori.find(f => f.potrivit.includes('mentenanta'));
      if (serviceFurnizor && !recomandati.find(r => r.nume === serviceFurnizor.nume)) {
        recomandati.push({
          ...serviceFurnizor,
          motiv: 'Mentenanță și suport tehnic pentru echipamentele interne',
          prioritate: 'medie'
        });
      }
    }
    
    // Dacă vrea să investească intern, recomandă distribuitori
    if (approachScores[0]?.approach === 'AM Intern' && data.echipamente_interne === 'niciuna') {
      const distribuitori = furnizori.filter(f => 
        f.tip.includes('Distribuitor') && 
        techScores.length > 0 && 
        (f.potrivit.includes(techScores[0].tech.toLowerCase()) || 
         f.tehnologii.some((t: string) => t.toLowerCase().includes(techScores[0].tech.toLowerCase())))
      );
      
      distribuitori.forEach(dist => {
        if (!recomandati.find(r => r.nume === dist.nume)) {
          recomandati.push({
            ...dist,
            motiv: `Distribuitor echipamente ${techScores[0].tech} pentru investiție internă`,
            prioritate: 'medie'
          });
        }
      });
    }
    
    return recomandati.slice(0, 3); // Maxim 3 furnizori recomandați
  };

  const shouldSkipQuestion = (questionId: string, currentAnswers: any) => {
    // Sari peste întrebarea de frecvență dacă nu are echipamente
    if (questionId === 'frecventa' && currentAnswers.echipamente_interne === 'niciuna') {
      return true;
    }
    return false;
  };

  const getNextStep = (currentStepIndex: number, currentAnswers: any) => {
    let nextStep = currentStepIndex + 1;
    
    // Găsește următoarea întrebare care nu trebuie sărita
    while (nextStep < questions.length && shouldSkipQuestion(questions[nextStep].id, currentAnswers)) {
      nextStep++;
    }
    
    return nextStep;
  };

  const handleAnswer = (questionId: string, value: any) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
    
    const nextStep = getNextStep(currentStep, newAnswers);
    
    if (nextStep < questions.length) {
      setCurrentStep(nextStep);
    } else {
      const recommendation = calculateRecommendation(newAnswers);
      setResult(recommendation);
    }
  };

  const resetApp = () => {
    setCurrentStep(0);
    setAnswers({});
    setResult(null);
  };

  const goBack = () => {
    if (currentStep > 0) {
      let prevStep = currentStep - 1;
      
      // Găsește întrebarea anterioară care nu trebuie sărita
      while (prevStep >= 0 && shouldSkipQuestion(questions[prevStep].id, answers)) {
        prevStep--;
      }
      
      if (prevStep >= 0) {
        setCurrentStep(prevStep);
      }
    }
  };

  const currentQuestion = questions[currentStep];

  if (result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-5xl mx-auto">
          <LogoBar />
          <div className="bg-white rounded-xl shadow-lg p-8 mt-6">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="text-green-500" size={32} />
              <h2 className="text-3xl font-bold text-gray-800">Recomandare Personalizată</h2>
            </div>

            <div className="space-y-6">
              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
                <h3 className="text-2xl font-bold text-blue-900 mb-3">
                  🔧 Tehnologie Recomandată: {result.technology}
                </h3>
                <div className="text-blue-800 space-y-1">
                  {result.techScores[0].details.map((detail: string, idx: number) => (
                    <p key={idx} className="flex items-start gap-2">
                      <span className="text-blue-500 font-bold">•</span>
                      <span>{detail}</span>
                    </p>
                  ))}
                </div>
                {result.alternativeTech && (
                  <p className="text-blue-700 mt-3 font-medium">
                    Alternativă: {result.alternativeTech}
                  </p>
                )}
              </div>

              <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-r-lg">
                <h3 className="text-2xl font-bold text-green-900 mb-3">
                  🏭 Abordare Recomandată: {result.approach}
                </h3>
                <div className="text-green-800 space-y-1">
                  {result.approachScores[0].details.map((detail: string, idx: number) => (
                    <p key={idx} className="flex items-start gap-2">
                      <span className="text-green-500 font-bold">•</span>
                      <span>{detail}</span>
                    </p>
                  ))}
                </div>
                {result.alternativeApproach && (
                  <p className="text-green-700 mt-3 font-medium">
                    Alternativă: {result.alternativeApproach}
                  </p>
                )}
              </div>

              {result.furnizoriRecomandati && result.furnizoriRecomandati.length > 0 && (
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-purple-900 mb-4 flex items-center gap-2">
                    🏢 Furnizori Recomandați
                  </h3>
                  <div className="space-y-4">
                    {result.furnizoriRecomandati.map((furnizor: any, idx: number) => (
                      <div key={idx} className="bg-white p-4 rounded-lg border border-purple-200 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-bold text-lg text-gray-900">{furnizor.nume}</h4>
                            <p className="text-sm text-gray-600">{furnizor.tip}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            furnizor.prioritate === 'ridicată' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {furnizor.prioritate === 'ridicată' ? 'Prioritate înaltă' : 'Recomandat'}
                          </span>
                        </div>
                        
                        <p className="text-gray-700 text-sm mb-2">
                          <strong>Motiv:</strong> {furnizor.motiv}
                        </p>
                        
                        {furnizor.tehnologii && furnizor.tehnologii.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-2">
                            {furnizor.tehnologii.map((tech: string, i: number) => (
                              <span key={i} className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        <p className="text-gray-600 text-sm mb-3">{furnizor.descriere}</p>
                        
                        <a 
                          href={furnizor.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium text-sm"
                        >
                          Vizitează site-ul →
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white border-2 border-gray-200 p-5 rounded-lg">
                  <h5 className="font-bold text-gray-800 mb-4 text-lg">Scoruri Tehnologii</h5>
                  {result.techScores.map((item: any, idx: number) => (
                    <div key={idx} className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-gray-700">{item.tech}</span>
                        <span className="text-sm font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded">
                          {item.score} pct
                        </span>
                      </div>
                      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${idx === 0 ? 'bg-blue-600' : 'bg-blue-300'}`}
                          style={{ width: `${(item.score / Math.max(...result.techScores.map((t: any) => t.score))) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-white border-2 border-gray-200 p-5 rounded-lg">
                  <h5 className="font-bold text-gray-800 mb-4 text-lg">Scoruri Abordări</h5>
                  {result.approachScores.map((item: any, idx: number) => (
                    <div key={idx} className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-gray-700 text-sm">{item.approach}</span>
                        <span className="text-sm font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded">
                          {item.score} pct
                        </span>
                      </div>
                      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${idx === 0 ? 'bg-green-600' : 'bg-green-300'}`}
                          style={{ width: `${(item.score / Math.max(...result.approachScores.map((a: any) => a.score))) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={resetApp}
                className="w-full bg-indigo-600 text-white py-4 rounded-lg hover:bg-indigo-700 transition-colors font-semibold text-lg"
              >
                📋 Nouă Evaluare
              </button>
            </div>
          </div>
        </div>
        <LogoBar />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <LogoBar />
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              🏭 Decizie Fabricație Aditivă pentru IMM
            </h1>
            <p className="text-gray-600">
              Răspundeți la întrebări pentru a primi recomandări personalizate despre tehnologia și abordarea optimă
            </p>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                Progres: Întrebarea {currentStep + 1} din {questions.length}
              </span>
              <span className="text-sm font-bold text-indigo-600">
                {Math.round(((currentStep + 1) / questions.length) * 100)}%
              </span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-600 transition-all duration-300"
                style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {currentQuestion.label}
            </h2>

            {currentQuestion.type === 'scale' ? (
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2 px-1">
                  <span className="text-left max-w-[30%]">{currentQuestion.labels[0]}</span>
                  <span className="text-center max-w-[30%]">{currentQuestion.labels[1]}</span>
                  <span className="text-right max-w-[30%]">{currentQuestion.labels[2]}</span>
                </div>
                <div className="flex gap-3 justify-between">
                  {[1, 2, 3, 4, 5].map(value => (
                    <button
                      key={value}
                      onClick={() => handleAnswer(currentQuestion.id, value)}
                      className={`flex-1 py-6 rounded-lg border-2 font-bold text-lg transition-all ${
                        answers[currentQuestion.id] === value
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg scale-105'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-400 hover:scale-102'
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {currentQuestion.options.map(option => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(currentQuestion.id, option.value)}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all flex items-center justify-between ${
                      answers[currentQuestion.id] === option.value
                        ? 'bg-indigo-50 border-indigo-600 text-indigo-900 shadow-md'
                        : 'bg-white border-gray-300 hover:border-indigo-400 text-gray-700 hover:shadow'
                    }`}
                  >
                    <span className="font-medium">{option.label}</span>
                    <ChevronRight className={`${
                      answers[currentQuestion.id] === option.value ? 'text-indigo-600' : 'text-gray-400'
                    }`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {currentStep > 0 && (
            <button
              onClick={goBack}
              className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
            >
              ← Înapoi la întrebarea anterioară
            </button>
          )}
        </div>

        {/* Logic Explanation Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <Book className="text-indigo-600" size={28} />
            <h2 className="text-2xl font-bold text-gray-800">Logica Sistemului de Decizie</h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">🔧 Evaluare Tehnologii AM</h3>
              <div className="space-y-4 text-gray-700">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">FDM (Fused Deposition Modeling)</h4>
                  <p className="text-sm">Se notează pozitiv pentru: materiale plastice standard/engineering, geometrii simple-medii, toleranțe moderate (±0.2-0.5mm), buget redus, cantități mici-medii.</p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">SLA (Stereolithography)</h4>
                  <p className="text-sm">Se notează pozitiv pentru: rășini, cerințe estetice ridicate, precizie înaltă (±0.05-0.1mm), geometrii complexe, prototipare vizuală, cantități mici.</p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">SLS (Selective Laser Sintering)</h4>
                  <p className="text-sm">Se notează pozitiv pentru: plastice engineering, geometrii foarte complexe cu cavități, fără suporturi, proprietăți mecanice excelente, cantități medii (10-500 buc), post-procesare minimă.</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">DMLS (Direct Metal Laser Sintering)</h4>
                  <p className="text-sm">Se notează pozitiv pentru: materiale metalice, solicitări mecanice/termice extreme, toleranțe strânse, geometrii optimizate topologic, aplicații finale critice.</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">🏭 Criterii Abordare</h3>
              <div className="space-y-4 text-gray-700">
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-indigo-900 mb-2">AM Intern</h4>
                  <p className="text-sm mb-2"><strong>Favorizat când:</strong></p>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• Echipamente disponibile și frecvență de utilizare ridicată</li>
                    <li>• Termene urgente (1-3 zile)</li>
                    <li>• Cantități mici (1-50 buc) cu repetabilitate</li>
                    <li>• Capabilitate QC internă adecvată</li>
                    <li>• Confidențialitate proiect</li>
                  </ul>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-900 mb-2">AM Externalizare</h4>
                  <p className="text-sm mb-2"><strong>Favorizat când:</strong></p>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• Fără echipamente interne sau utilizare ocazională</li>
                    <li>• Cerințe tehnice înalte (toleranțe, finisaj)</li>
                    <li>• Post-procesare extinsă necesară</li>
                    <li>• Cantități medii (50-100 buc)</li>
                    <li>• Acces la tehnologii specializate (DMLS, SLS)</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 mb-2">Fabricație Tradițională</h4>
                  <p className="text-sm mb-2"><strong>Favorizat când:</strong></p>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• Cantități mari (100+ buc)</li>
                    <li>• Geometrii simple (fără complexitate AM)</li>
                    <li>• Termene lungi care permit amortizare scule</li>
                    <li>• Materiale cu proprietăți superioare</li>
                    <li>• Cost unitar trebuie minimizat</li>
                  </ul>
                </div>
                
                <div className="bg-teal-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-teal-900 mb-2">Abordare Mixtă</h4>
                  <p className="text-sm mb-2"><strong>Favorizat când:</strong></p>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• Prototipare AM + producție serie tradițional</li>
                    <li>• Cantități medii (50-500 buc)</li>
                    <li>• Piese complexe AM + componente simple tradițional</li>
                    <li>• Echipamente interne + outsourcing specializat</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-5 rounded-lg border-2 border-indigo-200">
              <h3 className="text-lg font-bold text-indigo-900 mb-3">💡 Factori Cheie în Decizie</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                <div>
                  <p className="font-semibold text-indigo-800 mb-2">Cantitate & Frecvență:</p>
                  <p>1-10 buc ocazional → AM externalizare</p>
                  <p>1-50 buc frecvent → AM intern</p>
                  <p>50-100 buc → AM extern sau mixt</p>
                  <p>100+ buc → Tradițional sau mixt</p>
                </div>
                <div>
                  <p className="font-semibold text-indigo-800 mb-2">Complexitate vs Material:</p>
                  <p>Complex + plastic → SLS/SLA</p>
                  <p>Complex + metal → DMLS</p>
                  <p>Simplu + plastic → FDM</p>
                  <p>Simplu + cantitate mare → Tradițional</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <LogoBar />
      </div>
    </div>
  );
};

export default AMDecisionTree;

