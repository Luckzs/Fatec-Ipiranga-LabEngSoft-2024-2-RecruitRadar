import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Vacancy } from "./Vacancy";
import { Experience } from "./Experience";

@Entity("vacancy_experiences")
class VacancyExperience {

    @PrimaryColumn()
    readonly vacancy_experience_id!: string;

    @Column({ nullable: true })
    period!: string;

    @Column()
    vacancy_id!: string;

    @Column()
    experience_id!: string;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

    @ManyToOne(() => Vacancy,{onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({ name: "vacancy_id" })
    Vacancy!: Vacancy;

    @ManyToOne(() => Experience)
    @JoinColumn({ name: "experience_id" })
    Experience!: Experience;

    constructor() {
        if (!this.vacancy_experience_id) {
            this.vacancy_experience_id = uuid();
        }
    }
}

export { VacancyExperience };