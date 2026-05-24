export interface UserProfile {
  id: string;
  first_name: string;
  last_name: string;
  document_type: string;
  document_number: string;
  birth_date: string;
  age: number;
  gender: string;
  civil_status: string;
  professional_interests: string[];
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  neighborhood: string;
  commune: string;
  zone: 'urbana' | 'rural';
  education_level: string;
  institution: string;
  is_studying: boolean;
  career: string;
  semester: string;
  study_shift: string;
  is_working: boolean;
  employment_type: string;
  entrepreneurship: string;
  approx_income: string;
  economic_sector: string;
  knows_mira_youth: boolean;
  has_participated: boolean;
  interests: string[];
  problems: string;
  sector_needs: string;
  interest_programs: string[];
  open_comments: string;
  created_at: string;
}

export interface DynamicQuestion {
  id: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'checkbox' | 'radio' | 'date' | 'textarea' | 'multi-select';
  options?: string[];
  required: boolean;
  section: string;
  order: number;
}

export type AdminRole = 'Super Admin' | 'Admin Editor' | 'Admin Viewer';

export interface AdminUser {
  id: string;
  email: string;
  role: AdminRole;
  created_at: string;
}
