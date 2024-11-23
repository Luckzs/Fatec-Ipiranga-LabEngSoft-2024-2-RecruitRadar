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

  @Column({ nullable: true })
  CPF!: string;

  @Column({ nullable: true })
  full_name!: string;

  @Column({ nullable: true })
  sex!: string;

  @Column({ nullable: true })
  pcd!: boolean;

  @Column({ nullable: true })
  birth_date!: Date;

  @Column()
  address!: string;

  //TODO: QUESTIONAR SE É NECESSÁRIO COLOCAR COMPLEMENTO NO ENDEREÇO
  //@Column()
  //complement!: string;

  @Column({ nullable: true })
  city!: string;

  @Column({ nullable: true })
  state!: string;

  @Column({ nullable: true })
  postal_code!: string;

  @Column()
  distance_radius!: number;

  @UpdateDateColumn()
  updated_at!: Date;

  @Column({ nullable: true })
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