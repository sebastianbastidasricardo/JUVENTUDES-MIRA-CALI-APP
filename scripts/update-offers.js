import { createClient } from '@supabase/supabase-js';
import Parser from 'rss-parser';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Cargar variables de entorno desde el archivo .env (útil para pruebas locales)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY; // Nota: Para inserciones puede requerirse el Service Role Key si hay políticas RLS (idealmente usa VITE_SUPABASE_SERVICE_ROLE_KEY o configura RLS para permitir al script)

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Faltan las variables de entorno de Supabase (SUPABASE_URL o SUPABASE_ANON_KEY).");
  console.error("Asegúrate de que agregaste correctamente los 'Repository Secrets' en GitHub y que no están vacíos.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false }
});

const parser = new Parser();

// Aquí definimos las fuentes RSS públicas (gratuitas).
// Usaremos algunos RSS populares de empleo en Colombia/Cali como ejemplo.
// Elempleo, Computrabajo y otras suelen ofrecer RSS.
const SOURCES = [
  {
    name: 'SENA (Servicio Nacional de Aprendizaje)', 
    // Usamos el RSS oficial del gobierno o uno simulado válido para el ejemplo:
    url: 'https://www.computrabajo.com.co/rss/ofertas-de-trabajo-en-valle-del-cauca.rss', 
    category: 'Empleo'
  },
  {
    name: 'Convocatorias Públicas Cali',
    // Feed de OpcionEmpleo u otra fuente
    url: 'https://co.talent.com/rss/jobs.xml?l=cali',
    category: 'Oficial'
  }
];

async function updateOffers() {
  console.log('Iniciando la búsqueda de ofertas...');
  let totalAdded = 0;

  for (const source of SOURCES) {
    try {
      console.log(`Buscando en: ${source.name} (${source.url})`);
      
      const feed = await parser.parseURL(source.url);
      console.log(`Se encontraron ${feed.items.length} ofertas en ${source.name}. Procesando...`);

      for (const item of feed.items) {
        // Filtrar un poco: tratar de enfocarnos en jóvenes / sin mucha experiencia 
        // o si es de cali (el feed de computrabajo valle incluye cali).
        const title = item.title || 'Sin Título';
        const description = item.contentSnippet || item.content || '';
        const link = item.link || '';
        const pubDate = item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString();

        // Evitar duplicados por link (en Supabase el 'link' debería ser UNIQUE idealmente, o lo buscamos)
        const { data: existing } = await supabase
          .from('offers')
          .select('id')
          .eq('link', link)
          .single();

        if (!existing) {
          const { error } = await supabase.from('offers').insert([
            {
              title,
              description,
              link,
              source: source.name,
              category: source.category,
              pub_date: pubDate
            }
          ]);

          if (error) {
            console.error(`Error guardando oferta "${title}":`, error.message);
          } else {
            console.log(`+ Nueva oferta: ${title}`);
            totalAdded++;
          }
        }
      }
    } catch (error) {
       console.error(`Error procesando la fuente ${source.name}:`, error.message);
    }
  }

  console.log(`¡Proceso completado! Se agregaron ${totalAdded} nuevas ofertas publicas.`);
}

updateOffers();
