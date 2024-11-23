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
  Unique,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./User";
import { Candidate } from "./Candidate";
import { CandidateSkill } from "./CandidateSkill";
import { VacancySkill } from "./VacancySkill";

@Entity("skills")
@Unique(["text"])  // Definindo a constraint de unicidade
class Skill {
  @PrimaryColumn()
  readonly skill_id!: string;

  @Column({ nullable: true })
  text!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @OneToMany(() => VacancySkill, (vacancySkill) => vacancySkill.Skill)
  vacancySkill!: VacancySkill[];

  constructor() {
    if (!this.skill_id) {
      this.skill_id = uuid();
    }
  }
}

export { Skill };

