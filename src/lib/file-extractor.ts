/**
 * Service d'extraction de texte depuis différents formats de fichiers
 * Supporte PDF, DOCX, TXT
 */

/**
 * Extrait le texte d'un fichier
 */
export async function extractTextFromFile(file: File): Promise<string> {
  const fileType = file.type;
  const fileName = file.name.toLowerCase();

  // Fichier texte
  if (fileType === 'text/plain' || fileName.endsWith('.txt')) {
    return await extractTextFromTxt(file);
  }

  // Fichier Word (.docx)
  if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || fileName.endsWith('.docx')) {
    return await extractTextFromDocx(file);
  }

  // Fichier PDF
  if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
    return await extractTextFromPdf(file);
  }

  throw new Error('Format de fichier non supporté. Utilisez PDF, DOCX ou TXT.');
}

/**
 * Extrait le texte d'un fichier TXT
 */
async function extractTextFromTxt(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      resolve(text);
    };
    reader.onerror = () => reject(new Error('Erreur lors de la lecture du fichier'));
    reader.readAsText(file);
  });
}

/**
 * Extrait le texte d'un fichier DOCX
 * Note: En production, utiliser une librairie comme mammoth.js
 */
async function extractTextFromDocx(file: File): Promise<string> {
  // Simulation pour la démo
  // En production, installer: npm install mammoth
  // import mammoth from 'mammoth';
  // const arrayBuffer = await file.arrayBuffer();
  // const result = await mammoth.extractRawText({ arrayBuffer });
  // return result.value;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Texte extrait du fichier ${file.name}.\n\nCeci est un exemple de texte extrait d'un document Word. En production, utilisez la librairie mammoth.js pour extraire le vrai contenu.\n\nLe texte peut contenir des fautes d'orthographe comme "developement" au lieu de "développement", ou des erreurs de grammaire comme "Les résultats montre" au lieu de "Les résultats montrent".\n\nL'analyse IA détectera automatiquement ces erreurs et proposera des corrections.`);
    }, 500);
  });
}

/**
 * Extrait le texte d'un fichier PDF
 * Note: En production, utiliser une librairie comme pdf-parse ou pdfjs-dist
 */
async function extractTextFromPdf(file: File): Promise<string> {
  // Simulation pour la démo
  // En production, installer: npm install pdf-parse ou pdfjs-dist
  // import pdfParse from 'pdf-parse';
  // const arrayBuffer = await file.arrayBuffer();
  // const data = await pdfParse(Buffer.from(arrayBuffer));
  // return data.text;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Texte extrait du fichier PDF ${file.name}.\n\nCeci est un exemple de texte extrait d'un document PDF. En production, utilisez la librairie pdf-parse ou pdfjs-dist pour extraire le vrai contenu.\n\nIntroduction\n\nCe mémoire présente une analyse approfondie du sujet. Les recherches montrent que cette problématique est importante.\n\nLes méthodologies employé dans cette étude permettent d'obtenir des résultats significatifs. Cependant, certaines limites existe et doivent être pris en compte.\n\nChapitre 1 : Contexte\n\nLe contexte actuel montre que les technologies moderne transforme notre société de manière profonde.`);
    }, 800);
  });
}

/**
 * Valide si le fichier est supporté
 */
export function isFileSupported(file: File): boolean {
  const supportedTypes = [
    'text/plain',
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  
  const supportedExtensions = ['.txt', '.pdf', '.docx'];
  const fileName = file.name.toLowerCase();
  
  return supportedTypes.includes(file.type) || 
         supportedExtensions.some(ext => fileName.endsWith(ext));
}

/**
 * Obtient le format du fichier
 */
export function getFileFormat(file: File): 'pdf' | 'docx' | 'txt' | 'unknown' {
  const fileName = file.name.toLowerCase();
  if (fileName.endsWith('.pdf')) return 'pdf';
  if (fileName.endsWith('.docx')) return 'docx';
  if (fileName.endsWith('.txt')) return 'txt';
  return 'unknown';
}
