import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import {v4 as uuid} from "uuid";
import { Vacancy } from "./Vacancy";
import { Language } from "./Language";

@Entity("vacancy_languages")
class VacancyLanguage {
    @PrimaryColumn()
    readonly vacancy_language_id!: string;

    @Column()
    vacancy_id!: string;

    @Column()
    language_id!: string;

    @Column({ nullable: true })
    level!: string;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date

    @ManyToOne(() => Vacancy,{onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({name: "vacancy_id"})
    Vacancy!: Vacancy;

    @ManyToOne(() => Language)
    @JoinColumn({name: "language_id"})
    Language!: Language;

    constructor() {
        if (!this.vacancy_language_id) {
            this.vacancy_language_id = uuid();
        }
    }
}

export { VacancyLanguage };