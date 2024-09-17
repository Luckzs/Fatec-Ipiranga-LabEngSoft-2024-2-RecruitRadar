import {
  Entity,
  PrimaryColumn,
  Column,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./User";
import { CandidateExperience } from "./CandidateExperience";
import { CandidateObjective } from "./CandidateObjective";
import { CandidateLanguage } from "./CandidateLanguage";
import { CandidateSkill } from "./CandidateSkill";
import { CandidateStudy } from "./CandidateStudy";

@Entity("candidates")
class Candidate {
  @PrimaryColumn()
  readonly candidate_id!: string;

  @Column()
  CPF!: string;

  @Column()
  full_name!: string;

  @Column()
  sex!: string;

  @Column()
  pcd!: boolean;

  @Column()
  birth_date!: Date;

  @Column()
  address!: string;

  //TODO: QUESTIONAR SE É NECESSÁRIO COLOCAR COMPLEMENTO NO ENDEREÇO
  //@Column()
  //complement!: string;

  @Column()
  city!: string;

  @Column()
  state!: string;

  @Column()
  postal_code!: string;

  @Column()
  distance_radius!: number;

  @UpdateDateColumn()
  updated_at!: Date;

  @Column()
  user_id!: string;

  @OneToOne(() => User,{onDelete: 'CASCADE', onUpdate: 'CASCADE'})
  @JoinColumn({ name: "user_id" })
  User!: User;

  @OneToMany(() => CandidateExperience, (candidateExperience) => candidateExperience.Candidate, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
  candidateExperiences!: CandidateExperience[];

  @OneToMany(() => CandidateObjective, (candidateObjective) => candidateObjective.Candidate, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
  candidateObjectives!: CandidateObjective[];

  @OneToMany(() => CandidateLanguage, (candidateLanguage) => candidateLanguage.Candidate, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
  candidateLanguages!: CandidateLanguage[];

  @OneToMany(() => CandidateSkill, (candidateSkill) => candidateSkill.Candidate, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
  candidateSkills!: CandidateSkill[];

  @OneToMany(() => CandidateStudy, (candidateStudy) => candidateStudy.Candidate, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
  candidateStudies!: CandidateStudy[];

  constructor() {
    if (!this.candidate_id) {
      this.candidate_id = uuid();
    }
  }
}

export { Candidate };