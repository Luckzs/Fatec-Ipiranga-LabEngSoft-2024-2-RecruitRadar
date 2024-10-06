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
import { Skill } from "./Skill";

@Entity("candidate_skills")
class CandidateSkill {
  @PrimaryColumn()
  readonly candidate_skill_id!: string;

  @Column()
  candidate_id!: string;

  @Column()
  skill_id!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @ManyToOne(() => Candidate,{onDelete: 'CASCADE', onUpdate: 'CASCADE'})
  @JoinColumn({ name: "candidate_id" })
  Candidate!: Candidate;

  @ManyToOne(() => Skill)
  @JoinColumn({ name: "skill_id" })
  Skill!: Skill;

  constructor() {
    if (!this.candidate_skill_id) {
      this.candidate_skill_id = uuid();
    }
  }
}

export { CandidateSkill };