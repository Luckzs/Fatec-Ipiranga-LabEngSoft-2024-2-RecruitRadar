import {
  Entity,
  PrimaryColumn,
  Column,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./User";
import { Candidate } from "./Candidate";
import { CandidateStudy } from "./CandidateStudy";
import { VacancyStudy } from "./VacancyStudy";

@Entity("studies")
class Study {
  @PrimaryColumn()
  readonly study_id!: string;

  @Column({ nullable: true })
  education!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @OneToMany(() => VacancyStudy, (vacancyStudy) => vacancyStudy.Study)
  vacancyStudy!: VacancyStudy[];

  constructor() {
    if (!this.study_id) {
      this.study_id = uuid();
    }
  }
}

export { Study };