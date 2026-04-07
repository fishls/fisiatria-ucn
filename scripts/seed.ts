/**
 * Seed script — populates Firestore with initial abstracts and seminars.
 *
 * Usage:
 *   npx tsx scripts/seed.ts
 *
 * Requires FIREBASE_ADMIN_* variables in .env.local (or environment).
 */
import { config } from "dotenv";
config({ path: ".env.local" });

import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId:   process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey:  process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

const db = getFirestore();

// ─── Mock Abstracts ───────────────────────────────────────────────────────────

const ABSTRACTS = [
  {
    id: "1",
    title: "Neuroplasticidad y Remapeo Cortical en Síndromes de Dolor Crónico: Un Análisis Longitudinal",
    authors: ["Dra. Elena Vance", "Dr. Julian Thorne", "Sarah L. Chen"],
    publishedAt: "2024-10-14",
    publishedAtLabel: "14 de Octubre, 2024",
    publishedAtShort: "OCT 2024",
    doi: "10.1037/neu0000742",
    journal: "AJPM&R",
    excerpt: "Este estudio investiga los mecanismos de remapeo cortical en pacientes con síndrome de dolor regional complejo durante un período longitudinal de 24 meses.",
    body: [
      "El dolor crónico se ha entendido durante mucho tiempo como algo más que un síntoma persistente; es una reorganización activa y desadaptativa del sistema nervioso central. Este estudio investiga los mecanismos de remapeo cortical en pacientes con síndrome de dolor regional complejo (SDRC) durante un período longitudinal de 24 meses, utilizando resonancia magnética funcional de alta resolución y magnetoencefalografía.",
      "Nuestros hallazgos demuestran una correlación significativa entre la intensidad del dolor percibido y el grado de contracción de la corteza somatosensorial. Específicamente, la representación de la extremidad afectada dentro de la región S1 mostró un cambio lateral progresivo y un desenfoque de los límites de los dígitos.",
      "Identificamos un nuevo biomarcador en la ínsula posterior que predice la respuesta al tratamiento con una precisión del 84%.",
    ],
    keywords: ["Neuroplasticidad", "Remapeo Cortical", "IRM Funcional", "Dolor Crónico", "Magnetoencefalografía"],
    tags: ["Neurología", "Dolor"],
    imageAlt: "Renderizado 3D de vías neuronales",
    peerReviewed: true,
    openAccess: true,
    featured: true,
  },
  {
    id: "2",
    title: "Rehabilitación Multidisciplinar tras Traumatismo Craneoencefálico: Cohorte Europea",
    authors: ["Dr. Marco Ferretti", "Dra. Anna Köhler"],
    publishedAt: "2024-07-20",
    publishedAtLabel: "20 de Julio, 2024",
    publishedAtShort: "JUL 2024",
    doi: "10.1007/mm0000321",
    journal: "Minerva Medica",
    excerpt: "Evaluación de las tasas de éxito de la reintegración tras traumatismo craneoencefálico en cohorte multicéntrica europea.",
    body: [
      "El traumatismo craneoencefálico (TCE) moderado a severo representa una de las causas más complejas de discapacidad adquirida en adultos jóvenes. Este estudio multicéntrico europeo reclutó 412 pacientes en 8 centros de rehabilitación para evaluar el impacto de los programas multidisciplinares intensivos.",
      "Los resultados a 12 meses mostraron que los pacientes en el grupo de intervención intensiva lograron una puntuación FIM un 23% superior a los controles.",
    ],
    keywords: ["TCE", "Rehabilitación Multidisciplinar", "FIM", "Reintegración Laboral"],
    tags: ["Neurología", "Traumatología"],
    imageAlt: "Equipo médico multidisciplinar en sesión de rehabilitación",
    peerReviewed: true,
    openAccess: false,
    featured: false,
  },
  {
    id: "3",
    title: "Realidad Virtual y Tratamiento del Dolor Lumbar Crónico: Ensayo Controlado Aleatorizado",
    authors: ["Dr. Carlos Mendoza", "Dra. Patricia Rojas", "Dr. Felipe Salas"],
    publishedAt: "2024-03-08",
    publishedAtLabel: "8 de Marzo, 2024",
    publishedAtShort: "MAR 2024",
    doi: "10.1097/ajpmr.0000000001",
    journal: "AJPM&R",
    excerpt: "Investigación inmersiva para pacientes con dolor lumbar crónico. Ensayo controlado con 180 participantes.",
    body: [
      "La realidad virtual (RV) emerge como herramienta terapéutica prometedora en el manejo del dolor crónico. Este ensayo controlado aleatorizado evaluó la eficacia de un protocolo de exposición de RV de 8 semanas en 180 pacientes con dolor lumbar crónico no específico.",
      "Los participantes del grupo RV reportaron una reducción media del dolor (EVA) de 3.2 puntos versus 1.4 en el grupo de fisioterapia convencional (p<0.001).",
    ],
    keywords: ["Realidad Virtual", "Dolor Lumbar", "ECA", "Fisioterapia"],
    tags: ["Dolor", "Innovación"],
    imageAlt: "Paciente con gafas de realidad virtual en sesión de terapia",
    peerReviewed: true,
    openAccess: true,
    featured: false,
  },
  {
    id: "4",
    title: "Elastografía por Ultrasonido en Puntos Gatillo Miofasciales: Protocolo Diagnóstico",
    authors: ["Dra. Lucia Bianchi", "Dr. Andreas Weber"],
    publishedAt: "2023-11-15",
    publishedAtLabel: "15 de Noviembre, 2023",
    publishedAtShort: "NOV 2023",
    doi: "10.1007/mm0000890",
    journal: "Minerva Medica",
    excerpt: "Protocolos de diagnóstico avanzado mediante elastografía. Análisis comparativo en 95 pacientes.",
    body: [
      "La elastografía por ultrasonido (EUS) permite cuantificar la rigidez tisular de los puntos gatillo miofasciales (PGM) con una resolución superior a las técnicas palpatorias convencionales. Este protocolo diagnóstico fue validado en 95 pacientes con fibromialgia y síndrome de dolor miofascial.",
      "Los coeficientes de correlación intraclase (ICC) para la reproducibilidad interobservador alcanzaron 0.89, confirmando la fiabilidad del método.",
    ],
    keywords: ["Elastografía", "Puntos Gatillo", "Ultrasonido", "Fibromialgia", "Miofascial"],
    tags: ["Diagnóstico", "Fisiatría"],
    imageAlt: "Ultrasonido diagnóstico en tejido muscular",
    peerReviewed: true,
    openAccess: false,
    featured: false,
  },
  {
    id: "5",
    title: "Rehabilitación Pediátrica: Intervención Temprana en Parálisis Cerebral Espástica",
    authors: ["Dra. Sofia Reyes", "Dr. Rodrigo Peña"],
    publishedAt: "2024-02-01",
    publishedAtLabel: "1 de Febrero, 2024",
    publishedAtShort: "FEB 2024",
    doi: "10.1097/ajpmr.0000000002",
    journal: "AJPM&R",
    excerpt: "Intervención temprana e intensiva en niños con parálisis cerebral espástica bilateral. Seguimiento a 24 meses.",
    body: [
      "La parálisis cerebral espástica bilateral afecta al 40% de los niños con parálisis cerebral. Este estudio longitudinal evaluó un programa de intervención temprana en 64 niños de 18 meses a 4 años.",
      "A los 24 meses, el 71% de los niños en el grupo de intervención intensiva mostraron mejoras clínicamente significativas en el GMFM-88.",
    ],
    keywords: ["Parálisis Cerebral", "Pediatría", "Vojta", "GMFM", "Intervención Temprana"],
    tags: ["Pediatría", "Neurología"],
    imageAlt: "Sesión de fisioterapia pediátrica",
    peerReviewed: true,
    openAccess: true,
    featured: false,
  },
  {
    id: "6",
    title: "Rehabilitación Cardíaca en Octogenarios con Insuficiencia Cardíaca: Cohorte Prospectivo",
    authors: ["Dr. Giovanni Esposito", "Dra. Marta Álvarez"],
    publishedAt: "2024-01-10",
    publishedAtLabel: "10 de Enero, 2024",
    publishedAtShort: "ENE 2024",
    doi: "10.1007/mm0000567",
    journal: "Minerva Medica",
    excerpt: "Seguridad y eficacia de programas de rehabilitación cardíaca supervisada en pacientes mayores de 80 años.",
    body: [
      "La rehabilitación cardíaca en octogenarios ha sido históricamente subestimada. Este cohorte prospectivo de 12 meses incluyó 87 pacientes mayores de 80 años con fracción de eyección reducida (≤40%).",
      "La capacidad funcional (VO2 pico) mejoró un 18% sin eventos adversos mayores. La calidad de vida mejoró en el 74% de los participantes.",
    ],
    keywords: ["Rehabilitación Cardíaca", "Geriatría", "Insuficiencia Cardíaca", "Ejercicio Aeróbico"],
    tags: ["Geriatría", "Cardiología"],
    imageAlt: "Paciente adulto mayor en programa de rehabilitación cardíaca",
    peerReviewed: true,
    openAccess: false,
    featured: false,
  },
];

// ─── Mock Seminars ────────────────────────────────────────────────────────────

const SEMINARS = [
  {
    id: "s1",
    title: "Efectividad de la Rehabilitación Robótica en ACV Subagudo: Meta-análisis 2023",
    date: "2024-10-25",
    dateLabel: "25 Oct, 2024",
    time: "11:30 AM",
    speakerName: "Dr. Ricardo Salinas",
    sourceTags: ["AJPM&R"],
    featured: true,
    imageAlt: "Seminario sobre rehabilitación robótica",
    streamingUrl: "#",
    month: "OCT",
    day: 25,
    weekday: "Miércoles",
  },
  {
    id: "s2",
    title: "Avances en el Manejo Farmacológico de la Espasticidad Severa",
    date: "2024-11-01",
    dateLabel: "01 Nov, 2024",
    time: "11:30 AM",
    speakerName: "Dra. Claudia Herrera",
    sourceTags: ["Minerva Medica"],
    featured: false,
    imageAlt: "Seminario sobre espasticidad",
    month: "NOV",
    day: 1,
    weekday: "Miércoles",
  },
  {
    id: "s3",
    title: "Neurorehabilitación Cognitiva en Daño Cerebral Adquirido: Protocolo UCN",
    date: "2024-11-08",
    dateLabel: "08 Nov, 2024",
    time: "11:30 AM",
    speakerName: "Dr. Alejandro Valdivia",
    sourceTags: ["AJPM&R", "Minerva Medica"],
    featured: false,
    imageAlt: "Seminario de neurorehabilitación cognitiva",
    month: "NOV",
    day: 8,
    weekday: "Miércoles",
  },
  {
    id: "s4",
    title: "Ultrasonido Diagnóstico en Fisiatría: Aplicaciones Musculoesqueléticas",
    date: "2024-11-22",
    dateLabel: "22 Nov, 2024",
    time: "11:30 AM",
    speakerName: "Dra. Patricia Rojas",
    sourceTags: ["Minerva Medica"],
    featured: false,
    imageAlt: "Seminario de ultrasonido diagnóstico",
    month: "NOV",
    day: 22,
    weekday: "Miércoles",
  },
];

// ─── Seed ─────────────────────────────────────────────────────────────────────

async function seed() {
  console.log("🌱 Iniciando seed de Firestore...\n");

  // Abstracts
  const abstractBatch = db.batch();
  for (const abstract of ABSTRACTS) {
    const { id, ...data } = abstract;
    abstractBatch.set(db.collection("abstracts").doc(id), data);
  }
  await abstractBatch.commit();
  console.log(`✅ ${ABSTRACTS.length} abstracts creados`);

  // Seminars
  const seminarBatch = db.batch();
  for (const seminar of SEMINARS) {
    const { id, ...data } = seminar;
    seminarBatch.set(db.collection("seminars").doc(id), data);
  }
  await seminarBatch.commit();
  console.log(`✅ ${SEMINARS.length} seminarios creados`);

  console.log("\n🎉 Seed completado exitosamente.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Error en seed:", err);
  process.exit(1);
});
