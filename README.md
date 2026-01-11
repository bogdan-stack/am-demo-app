# Decizie Fabricație Aditivă pentru IMM

Aplicație Next.js pentru sistemul de decizie privind tehnologia și abordarea optimă de fabricație aditivă pentru IMM-uri (Întreprinderi Mici și Mijlocii).

## Caracteristici

- 🎯 Sistem de decizie interactiv bazat pe întrebări
- 🔧 Recomandări personalizate pentru tehnologii AM (FDM, SLA, SLS, DMLS)
- 🏭 Evaluare abordări (AM Intern, Externalizare, Tradițional, Mixt)
- 🏢 Listă de furnizori recomandați din România
- 📊 Vizualizare scoruri și detalii pentru fiecare opțiune
- 📚 Secțiune informativă despre logica sistemului

## Tehnologii

- **Next.js 14** - Framework React cu App Router
- **TypeScript** - Tipuri statice pentru siguranță cod
- **Tailwind CSS** - Stilizare modernă și responsive
- **Lucide React** - Iconuri moderne

## Instalare

1. Instalează dependențele:
```bash
npm install
```

2. Rulează serverul de dezvoltare:
```bash
npm run dev
```

3. Deschide [http://localhost:3000](http://localhost:3000) în browser.

## Scripturi Disponibile

- `npm run dev` - Pornește serverul de dezvoltare
- `npm run build` - Construiește aplicația pentru producție
- `npm start` - Pornește serverul de producție
- `npm run lint` - Rulează ESLint pentru verificare cod

## Structură Proiect

```
proiect-AM/
├── app/
│   ├── layout.tsx      # Layout principal
│   ├── page.tsx        # Pagina principală
│   └── globals.css     # Stiluri globale Tailwind
├── components/
│   └── AMDecisionTree.tsx  # Componenta principală
├── package.json
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

## Funcționalități

### Sistem de Întrebări
- 15 întrebări despre cerințele proiectului
- Progres vizual cu bară de progres
- Navigare înapoi/înainte
- Sărirea automată a întrebărilor irelevante

### Algoritm de Decizie
- Scorare pentru fiecare tehnologie AM
- Evaluare abordări de producție
- Filtrare furnizori bazată pe recomandări
- Detalii explicative pentru fiecare decizie

### Rezultate
- Tehnologie recomandată cu alternativă
- Abordare recomandată cu alternativă
- Listă furnizori relevanți din România
- Grafice vizuale pentru scoruri
- Buton pentru evaluare nouă

## Dezvoltare

Aplicația folosește:
- **App Router** din Next.js 14 pentru routing
- **Client Components** pentru interactivitate
- **TypeScript** pentru siguranță tipuri
- **Tailwind CSS** pentru design responsive

## Deployment pe Vercel

Aplicația este optimizată pentru deployment pe Vercel. Există două metode principale:

### Metoda 1: Deploy prin Vercel Dashboard (Recomandat)

1. **Pregătește repository-ul:**
   - Încarcă codul pe GitHub, GitLab sau Bitbucket
   - Asigură-te că toate fișierele sunt commit-uite

2. **Deploy pe Vercel:**
   - Mergi pe [vercel.com](https://vercel.com)
   - Conectează-te cu contul tău GitHub/GitLab/Bitbucket
   - Click pe "Add New Project"
   - Selectează repository-ul cu proiectul
   - Vercel va detecta automat Next.js și va configura build settings
   - Click "Deploy"

3. **Configurare automată:**
   - Vercel detectează automat Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

### Metoda 2: Deploy prin Vercel CLI

1. **Instalează Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```
   
   La prima rulare, vei fi întrebat:
   - Link la proiect existent sau creare nouă
   - Director de deploy (apasă Enter pentru default)
   - Override settings (apasă Enter pentru default)

3. **Deploy pentru producție:**
   ```bash
   vercel --prod
   ```

### Variabile de Mediu

Dacă aplicația necesită variabile de mediu:
1. Mergi în Vercel Dashboard → Project Settings → Environment Variables
2. Adaugă variabilele necesare
3. Redeploy aplicația

### Verificare Deployment

După deploy, vei primi:
- URL de producție: `https://your-project.vercel.app`
- URL de preview pentru fiecare commit
- Logs de build și runtime

### Optimizări Vercel

Aplicația beneficiază automat de:
- ✅ Edge Network pentru performanță globală
- ✅ Automatic HTTPS
- ✅ Serverless Functions
- ✅ Image Optimization
- ✅ Automatic deployments pentru fiecare push

## Licență

Acest proiect este dezvoltat pentru uz educațional și profesional.

