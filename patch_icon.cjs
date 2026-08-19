const fs = require('fs');
const file = 'src/modules/characterization/CharacterizationForm.tsx';
let content = fs.readFileSync(file, 'utf8');

const getTalentIconFn = `
const getTalentIcon = (talent: string) => {
  switch (talent) {
    case 'Canto': return <Mic className="w-6 h-6" />;
    case 'Danza': return <Music className="w-6 h-6" />;
    case 'Recreación juvenil': return <Smile className="w-6 h-6" />;
    case 'Manejo de Sonido': return <Volume2 className="w-6 h-6" />;
    case 'Video y camarografía': return <Video className="w-6 h-6" />;
    case 'Edición audiovisual': return <MonitorPlay className="w-6 h-6" />;
    case 'Charlas y capacitaciones': return <Presentation className="w-6 h-6" />;
    case 'Apoyo logístico y eventos': return <Package className="w-6 h-6" />;
    case 'Recreación deportiva': return <Trophy className="w-6 h-6" />;
    case 'Primeros auxilios': return <HeartPulse className="w-6 h-6" />;
    case 'Seguridad en eventos': return <ShieldCheck className="w-6 h-6" />;
    case 'Trabajo comunitario': return <Users className="w-6 h-6" />;
    default: return <Star className="w-6 h-6" />;
  }
};
`;

content = content.replace("const QUESTION_STEPS =", getTalentIconFn + "\nconst QUESTION_STEPS =");
fs.writeFileSync(file, content);
