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
import { Language } from "./Language";

@Entity("candidate_languages")
class CandidateLanguage {
  @PrimaryColumn()
  readonly candidate_language_id!: string;

  @Column()
  level!: string;

  @Column()
  candidate_id!: string;

  @Column()
  language_id!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @ManyToOne(() => Candidate, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
  @JoinColumn({ name: "candidate_id" })
  Candidate  !: Candidate;

  @ManyToOne(() => Language)
  @JoinColumn({ name: "language_id" })
  Language  !: Language;

  constructor() {
    if (!this.candidate_language_id) {
      this.candidate_language_id = uuid();
    }
  }
}

export { CandidateLanguage };