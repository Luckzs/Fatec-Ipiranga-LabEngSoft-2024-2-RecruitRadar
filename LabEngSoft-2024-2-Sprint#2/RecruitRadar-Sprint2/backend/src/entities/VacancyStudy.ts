import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Vacancy } from "./Vacancy";
import { Study } from "./Study";

@Entity("vacancy_studies")
class VacancyStudy {

    @PrimaryColumn()
    readonly vacancy_study_id!: string;

    @Column({ nullable: true })
    situation!: string;

    @Column({ nullable: true })
    start_date!: Date;

    @Column({ nullable: true })
    completion_date!: Date;

    @Column()
    vacancy_id!: string;

    @Column()
    study_id!: string;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

    @ManyToOne(() => Vacancy,{onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({ name: "vacancy_id" })
    Vacancy!: Vacancy;

    @ManyToOne(() => Study)
    @JoinColumn({ name: "study_id" })
    Study!: Study;

    constructor() {
        if (!this.vacancy_study_id) {
            this.vacancy_study_id = uuid();
        }
    }
}

export { VacancyStudy };