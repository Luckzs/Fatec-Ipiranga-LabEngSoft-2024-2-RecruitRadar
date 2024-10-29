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
import { Experience } from "./Experience";
  
  @Entity("candidate_experiences")
  class CandidateExperience{
    @PrimaryColumn()
    readonly candidate_experience_id!: string;
  
    @Column()
    company_name!: string;
  
    @Column()
    start_date!: Date;
    
    @Column()
    end_date!: Date;

    @Column()
    period!: string;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

    @Column()
    candidate_id!: string;

    @Column()
    experience_id!: string;

    @ManyToOne(() => Candidate, (candidate) => candidate.candidateExperiences, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({ name: "candidate_id" })
    Candidate!: Candidate;

    @ManyToOne(() => Experience)
    @JoinColumn({ name: "experience_id" })
    Experience  !: Experience;

    constructor() {
      if (!this.candidate_experience_id) {
        this.candidate_experience_id = uuid();
      }
    }
  }
  
  export { CandidateExperience };