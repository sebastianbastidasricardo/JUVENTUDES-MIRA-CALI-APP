const fs = require('fs');
const file = 'src/modules/characterization/CharacterizationForm.tsx';
let content = fs.readFileSync(file, 'utf8');

const oldGrid = `<div className="grid grid-cols-2 gap-2 px-1 w-full">
                   {category.options.map(opt => {
                     const isSelected = watch('talents')?.includes(opt);
                     return (
                       <SelectableCard 
                         key={opt} 
                         label={opt} 
                         active={isSelected} 
                         onClick={() => {
                           const current = watch('talents') || [];
                           setValue('talents', 
                             isSelected 
                               ? current.filter(i => i !== opt) 
                               : [...current, opt]
                           );
                         }}
                       />
                     );
                   })}
                 </div>`;

const newUI = `<div className="flex overflow-x-auto w-full gap-4 px-2 pb-4 snap-x no-scrollbar">
                   {category.options.map(opt => {
                     const isSelected = watch('talents')?.includes(opt);
                     return (
                       <div 
                         key={opt}
                         className="flex flex-col items-center gap-3 snap-start min-w-[76px] cursor-pointer group"
                         onClick={() => {
                           const current = watch('talents') || [];
                           setValue('talents', 
                             isSelected 
                               ? current.filter(i => i !== opt) 
                               : [...current, opt]
                           );
                         }}
                       >
                         <div className={\`w-[70px] h-[70px] rounded-full flex items-center justify-center transition-all duration-300 relative \${
                           isSelected 
                             ? 'bg-primary text-white shadow-[0_0_20px_rgba(var(--primary),0.5)] scale-110 border-2 border-primary' 
                             : 'bg-foreground/5 text-foreground/50 border-2 border-transparent hover:bg-foreground/10 hover:text-foreground/80 hover:scale-105'
                         }\`}>
                           {isSelected && (
                             <div className="absolute inset-0 bg-primary/20 blur-md rounded-full -z-10" />
                           )}
                           {getTalentIcon(opt)}
                           {isSelected && (
                             <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-0.5 shadow-sm">
                               <CheckCircle2 className="w-5 h-5 text-primary fill-primary/10" />
                             </div>
                           )}
                         </div>
                         <span className={\`text-[10px] leading-[1.2] text-center font-bold px-1 transition-colors \${
                           isSelected ? 'text-primary' : 'text-foreground/60 group-hover:text-foreground/90'
                         }\`}>
                           {opt}
                         </span>
                       </div>
                     );
                   })}
                 </div>`;

content = content.replace(oldGrid, newUI);
// Also increase space-y between categories from space-y-3 to space-y-5
content = content.replace('<div className="space-y-6 animate-fade-in relative z-10 w-full max-h-[50vh] overflow-y-auto no-scrollbar pb-10">', '<div className="space-y-6 animate-fade-in relative z-10 w-full max-h-[60vh] overflow-y-auto no-scrollbar pb-10">');
content = content.replace('<div key={category.category} className="space-y-3 flex flex-col items-start w-full">', '<div key={category.category} className="space-y-5 flex flex-col items-start w-full">');

fs.writeFileSync(file, content);
