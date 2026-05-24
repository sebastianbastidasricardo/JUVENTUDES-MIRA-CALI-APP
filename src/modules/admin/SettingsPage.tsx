import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Settings, Shield, Bell, Palette, Database, ExternalLink, UserCog, Key } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export default function SettingsPage() {
  const [adminProfile, setAdminProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('admin_users')
          .select('*')
          .eq('id', user.id)
          .single();
        setAdminProfile(data);
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Profile Bar */}
      <div className="glass rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 border-none shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <UserCog className="w-32 h-32" />
        </div>
        
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-primary flex items-center justify-center text-4xl font-black text-white shadow-xl rotate-3">
          {adminProfile?.email?.[0].toUpperCase() || '?'}
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-black tracking-tighter uppercase">{adminProfile?.email || 'Admin User'}</h2>
          <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2">
             <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">
               {adminProfile?.role || 'Admin'}
             </span>
             <span className="px-3 py-1 rounded-full bg-foreground/5 text-foreground/50 text-[10px] font-black uppercase tracking-widest border border-foreground/10">
               ID: {adminProfile?.id?.split('-')[0] || '...'}
             </span>
          </div>
        </div>
        
        <div className="flex gap-3">
           <Button variant="outline" className="rounded-xl font-bold glass-dark h-12" onClick={() => toast.info('Función de perfil pronto disponible')}>
             <Settings className="mr-2 h-4 w-4" /> Perfil
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
        {/* API & Connection */}
        <Card className="glass border-none shadow-xl p-6">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-xl font-black tracking-tight flex items-center gap-2">
               <Database className="w-5 h-5 text-primary" /> INFRAESTRUCTURA
            </CardTitle>
            <CardDescription className="uppercase text-[10px] font-bold opacity-40">Estado de conexión y límites (Est.)</CardDescription>
          </CardHeader>
          <CardContent className="px-0 space-y-6 pt-6">
             <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-foreground/5 rounded-2xl border border-foreground/5">
                   <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                      <span className="text-sm font-bold">Supabase Cloud</span>
                   </div>
                   <span className="text-[10px] font-black uppercase opacity-40">Plan Free</span>
                </div>
                
                <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                   <div className="flex justify-between mb-2">
                      <span className="text-[10px] font-black uppercase tracking-widest opacity-50">Carga de Base de Datos</span>
                      <span className="text-[10px] font-black">Mínima (Eco-mode)</span>
                   </div>
                   <div className="h-1.5 w-full bg-foreground/5 rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[5%]" />
                   </div>
                   <p className="text-[8px] mt-2 opacity-30 italic">* Valores estimados basados en el volumen de registros</p>
                </div>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
