import { differenceInYears, parse } from 'date-fns';

export const calculateAge = (birthDate: string): number | string => {
  if (!birthDate) return 'N/A';
  const birth = new Date(birthDate);
  if (isNaN(birth.getTime())) return 'N/A';
  const now = new Date();
  return differenceInYears(now, birth);
};

export const isValidColombianPhone = (phone: string): boolean => {
  const colombianPhoneRegex = /^3\d{9}$/;
  return colombianPhoneRegex.test(phone.replace(/\s/g, ''));
};

export const isValidDocumentNumber = (doc: string): boolean => {
  return doc.length >= 6 && doc.length <= 12 && /^\d+$/.test(doc);
};

export const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
