import {
  Entity,
  PrimaryColumn,
  Column,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./User";
import { Candidate } from "./Candidate";

@Entity("candidate_objectives")
class CandidateObjective {
  @PrimaryColumn()
  readonly candidate_objective_id!: string;

  @Column()
  job!: string;

  @Column({ nullable: true })
  work_model!: string;

  @Column()
  salary_expectation!: string;

  @Column()
  candidate_id!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @ManyToOne(() => Candidate, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
  @JoinColumn({ name: "candidate_id" })
  Candidate  !: Candidate;

  constructor() {
    if (!this.candidate_objective_id) {
      this.candidate_objective_id = uuid();
    }
  }
}

export { CandidateObjective };