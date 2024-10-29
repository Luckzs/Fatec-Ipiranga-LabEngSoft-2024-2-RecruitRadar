import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Candidate } from "./Candidate";
import { Vacancy } from "./Vacancy";

  @Entity("matches")
  class Match{
    @PrimaryColumn()
    readonly match_id!: string;
  
    @Column()
    candidate_id!: string;

    @Column()
    vacancy_id!: string;

    @Column()
    score!: number;

    @Column()
    applied!: boolean;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

    @ManyToOne(() => Candidate)
    @JoinColumn({ name: "candidate_id" })
    Candidate!: Candidate;
  
    @ManyToOne(() => Vacancy)
    @JoinColumn({ name: "vacancy_id" })
    Vacancy!: Vacancy;

    constructor() {
      if (!this.match_id) {
        this.match_id = uuid();
      }
    }
  }

  export { Match };