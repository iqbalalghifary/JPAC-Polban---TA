import { Award, Certification, Education, Experience, Organization, Project, Skill, Volunteer } from "./";

export class Student {
  nim: Number;
  name: string;
  brifDescription: string;
  email: string;
  photo: string;
  phone: string;
  dateOfBirth: Date;
  gender: string;
  address: string;
  major: string;
  study_program: string;
  year: string;
  status: boolean;
  award: Award;
  certification: Certification;
  education: Education;
  experience: Experience;
  organization: Organization;
  project: Project;
  skill: Skill;
  volunteer: Volunteer;
}