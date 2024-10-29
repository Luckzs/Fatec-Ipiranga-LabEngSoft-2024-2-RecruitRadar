import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Vacancy } from "./Vacancy";
import { Skill } from "./Skill";

@Entity("vacancy_skills")
class VacancySkill {

    @PrimaryColumn()
    readonly vacancy_skill_id!: string;

    @Column()
    vacancy_id!: string;

    @Column()
    skill_id!: string;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

    @ManyToOne(() => Vacancy,{onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({ name: "vacancy_id" })
    Vacancy!: Vacancy;

    @ManyToOne(() => Skill)
    @JoinColumn({ name: "skill_id" })
    Skill!: Skill;
    

    constructor() {
        if (!this.vacancy_skill_id) {
            this.vacancy_skill_id = uuid();
        }
    }

}

export { VacancySkill };