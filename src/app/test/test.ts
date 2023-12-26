// doctor.model.ts
export class Doctor {
    address!: string;
    phoneNumber!: string;
    diplomas!: { year: number, faculty: string }[];
    expertises!: string[];
    otherFormations!: string[];
    experiences!: string;
  }
  