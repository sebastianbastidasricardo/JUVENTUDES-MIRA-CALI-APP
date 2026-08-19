const lucide = require('lucide-react');
console.log(Object.keys(lucide).filter(k => k.toLowerCase().includes('hand') || k.toLowerCase().includes('mouse') || k.toLowerCase().includes('chevron') || k.toLowerCase().includes('swipe')).join(', '));
