import {
  Entity,
  PrimaryColumn,
  Column,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  ManyToOne,
  ManyToMany,
  CreateDateColumn,
  OneToMany,
  Unique,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./User";
import { Candidate } from "./Candidate";
import { CandidateLanguage } from "./CandidateLanguage";
import { VacancyLanguage } from "./VacancyLanguage";

@Entity("languages")
@Unique(["course_name"])  // Definindo a constraint de unicidade
class Language {
  @PrimaryColumn()
  readonly language_id!: string;

  @Column({ nullable: true })
  course_name!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @OneToMany(() => VacancyLanguage, (vacancyLanguage) => vacancyLanguage.Language)
  vacancyLanguage!: VacancyLanguage[];

  constructor() {
    if (!this.language_id) {
      this.language_id = uuid();
    }
  }
}
export { Language };