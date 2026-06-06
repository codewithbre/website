export interface EducationEntry {
  degree: string;
  institution: string;
  date: string;
}

export interface Certification {
  name: string;
  period: string;
}

export const education: EducationEntry[] = [
  {
    degree: 'B.S. Computer Science',
    institution: 'Georgia State University',
    date: 'Dec 2019',
  },
  {
    degree: 'Professional Certificate, Geographic Information Systems',
    institution: 'Georgia State University',
    date: 'Dec 2019',
  },
];

export const certifications: Certification[] = [
  {
    name: 'AWS Certified AI Practitioner',
    period: 'Dec 2024 – Dec 2027',
  },
];
