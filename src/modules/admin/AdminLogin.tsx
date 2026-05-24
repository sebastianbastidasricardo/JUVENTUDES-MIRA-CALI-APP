import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MiraLogo } from '@/components/Logo';
import { Lock, Mail, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data: { user }, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      // Verify role exists in admin_users (RLS check)
      const { data: adminData } = await supabase
        .from('admin_users')
        .select('role')
        .eq('id', user?.id)
        .single();
      
      if (!adminData) {
        toast.warning('Autenticado, pero no se encontró registro administrativo. Los datos pueden aparecer vacíos.');
      }
      
      toast.success('Bienvenido al sistema administrativo');
      navigate('/admin/dashboard');
    } catch (error: any) {
      toast.error('Error de acceso: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent p-6">
      <Card className="w-full max-w-md shadow-2xl glass border-none">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            <MiraLogo />
          </div>
          <CardTitle className="text-2xl font-bold">Portal Administrativo</CardTitle>
          <CardDescription>
            Ingresa tus credenciales para gestionar los registros.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@juventudesmira.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full font-bold h-11" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Iniciar Sesión'}
            </Button>
          </form>
          <div className="mt-8 text-center">
            <Button variant="link" size="sm" onClick={() => navigate('/')} className="text-muted-foreground">
              Volver al inicio
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
