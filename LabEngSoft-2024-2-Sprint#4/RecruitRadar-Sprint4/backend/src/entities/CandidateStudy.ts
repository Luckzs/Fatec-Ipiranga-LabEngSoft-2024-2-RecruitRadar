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
import { Study } from "./Study";

@Entity("candidate_studies")
class CandidateStudy {
  @PrimaryColumn()
  readonly candidate_study_id!: string;

  @Column()
  institution_name!: string;

  @Column({ nullable: true })
  course_name!: string;

  @Column()
  situation!: string;

  @Column()
  start_date!: Date;

  @Column()
  completion_date!: Date;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @Column()
  candidate_id!: string;

  @Column()
  study_id!: string;

  @ManyToOne(() => Candidate,{onDelete: 'CASCADE', onUpdate: 'CASCADE'})
  @JoinColumn({ name: "candidate_id" })
  Candidate  !: Candidate;

  @ManyToOne(() => Study)
  @JoinColumn({ name: "study_id" })
  Study  !: Study;

  constructor() {
    if (!this.candidate_study_id) {
      this.candidate_study_id = uuid();
    }
  }
}

export { CandidateStudy };