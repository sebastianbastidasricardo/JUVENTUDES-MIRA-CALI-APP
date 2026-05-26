import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Search, ExternalLink, Calendar, MapPin, RefreshCw, HandCoins } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Offer {
  id: string;
  title: string;
  description: string | null;
  link: string;
  source: string;
  category: string;
  pub_date: string | null;
  created_at: string;
}

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterSource, setFilterSource] = useState('all');

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    setLoading(true);
    try {
      if (!supabase) return;
      const { data, error } = await supabase
        .from('offers')
        .select('*')
        .order('pub_date', { ascending: false, nullsFirst: false })
        .order('created_at', { ascending: false });

      if (error) {
        // If the table does not exist yet (user hasn't run the script), we will get an error.
        console.error('Error fetching offers (might mean table is missing):', error);
      } else {
        setOffers(data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredOffers = offers.filter(o => {
    const matchesSearch = o.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (o.description && o.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          o.source.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || o.category === filterCategory;
    const matchesSource = filterSource === 'all' || o.source === filterSource;
    return matchesSearch && matchesCategory && matchesSource;
  });

  const uniqueSources = Array.from(new Set(offers.map(o => o.source)));
  const uniqueCategories = Array.from(new Set(offers.map(o => o.category)));

  const getIconForCategory = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('empleo') || cat.includes('trabajo')) return <Briefcase className="w-4 h-4" />;
    if (cat.includes('estudio') || cat.includes('educación') || cat.includes('beca')) return <GraduationCap className="w-4 h-4" />;
    if (cat.includes('subsidio') || cat.includes('apoyo')) return <HandCoins className="w-4 h-4" />;
    return <Briefcase className="w-4 h-4" />;
  };

  return (
    <div className="p-4 md:p-8 space-y-6 max-h-[100vh] overflow-y-auto no-scrollbar">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black italic tracking-tighter uppercase">Oportunidades Públicas</h1>
          <p className="text-muted-foreground text-sm font-medium">Buscador automatizado de vacantes y convocatorias (SENA, Alcaldía, etc.)</p>
        </div>
        <button 
          onClick={fetchOffers}
          className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-xl transition-colors font-bold text-sm uppercase"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Actualizar</span>
        </button>
      </div>

      {offers.length === 0 && !loading && (
        <div className="p-8 border border-dashed border-foreground/20 rounded-3xl text-center space-y-4 glass-panel">
          <Briefcase className="w-12 h-12 mx-auto opacity-30" />
          <div>
            <h3 className="text-lg font-black uppercase italic">Sin ofertas disponibles</h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              Aún no hay oportunidades sincronizadas. Por favor, asegúrate de haber ejecutado el código SQL en Supabase, y pronto conectaremos el automatizador para llenarlas.
            </p>
          </div>
        </div>
      )}

      {offers.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
              <Input 
                placeholder="Buscar oportunidad o cargo..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-9 glass-panel border-none h-12"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="glass-panel border-none h-12">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent className="glass-panel border-foreground/10">
                <SelectItem value="all">Todas las categorías</SelectItem>
                {uniqueCategories.map(c => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterSource} onValueChange={setFilterSource}>
              <SelectTrigger className="glass-panel border-none h-12">
                <SelectValue placeholder="Fuente (Ej: Alcaldía)" />
              </SelectTrigger>
              <SelectContent className="glass-panel border-foreground/10">
                <SelectItem value="all">Todas las fuentes</SelectItem>
                {uniqueSources.map(s => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredOffers.map(offer => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={offer.id}
                className="glass-panel p-5 rounded-2xl border border-foreground/5 hover:border-primary/30 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[10px] uppercase font-black tracking-widest">
                        {getIconForCategory(offer.category)}
                        {offer.category}
                      </span>
                      <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-foreground/5 text-foreground/70 text-[10px] uppercase font-black tracking-widest">
                        {offer.source}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold leading-tight mb-2 group-hover:text-primary transition-colors">{offer.title}</h3>
                  
                  {offer.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {offer.description.replace(/(<([^>]+)>)/gi, "")}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
                  <div className="flex items-center text-xs font-medium text-muted-foreground gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {offer.pub_date ? new Date(offer.pub_date).toLocaleDateString() : new Date(offer.created_at).toLocaleDateString()}
                  </div>
                  
                  <a 
                    href={offer.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-black uppercase text-primary hover:underline"
                  >
                    Ver Oportunidad
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}

            {filteredOffers.length === 0 && (
              <div className="col-span-full py-10 text-center text-muted-foreground italic font-medium">
                No se encontraron ofertas con estos filtros.
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
