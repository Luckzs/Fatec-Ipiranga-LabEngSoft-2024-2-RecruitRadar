import {
    Entity,
    PrimaryColumn,
    Column,
    UpdateDateColumn,
    JoinColumn,
    OneToOne,
    ManyToOne,
    ManyToMany,
    OneToMany,
    CreateDateColumn,
  } from "typeorm";
  import { v4 as uuid } from "uuid";
  import { User } from "./User";
import { Candidate } from "./Candidate";
import { CandidateExperience } from "./CandidateExperience";
import { VacancyExperience } from "./VacancyExperience";
  
  @Entity("experiences")
  class Experience{
    @PrimaryColumn()
    readonly experience_id!: string;
  
    @Column({ nullable: true })
    title!: string;
    //TODO: AVALIAR SE VALE A PENA COLOCAR O TIPO DE EXPERIENCIA SE FOI ESTAGIO, TRAINEE, JUNIOR, PLENO, SENIOR, MASTER
    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

    @OneToMany(() => VacancyExperience, (vacancyExperience) => vacancyExperience.Experience)
    vacancyExperience!: VacancyExperience[];
  
    constructor() {
      if (!this.experience_id) {
        this.experience_id = uuid();
      }
    }
  }
  
  export { Experience };