import { Column, CreateDateColumn, Entity, OneToMany, Point, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { VacancyExperience } from "./VacancyExperience";
import { VacancyLanguage } from "./VacancyLanguage";
import { VacancySkill } from "./VacancySkill";
import { VacancyStudy } from "./VacancyStudy";
import { Match } from "./Match";

@Entity("vacancies")
class Vacancy {
    @PrimaryColumn()
    readonly vacancy_id!: string;

    @Column()
    company_name!: string;

    @Column({ nullable: true }) 
    logo!: string;

    @Column()
    title!: string;

    @Column({ nullable: true })
    description!: string;

    @Column({ nullable: true })
    salary!: string;

    @Column({ nullable: true })
    salary_max!: string;

    @Column({ nullable: true })
    address!: string;

    @Column({ nullable: true })
    complement!: string;

    @Column({ nullable: true })
    city!: string;

    @Column({ nullable: true })
    state!: string; 

    @Column({ nullable: true })
    postal_code!: string;

    @Column({ nullable: true })
    latitude!: string;

    @Column({ nullable: true })
    longitude!: string;

    @Column({ nullable: true,
        type: 'geography',
        spatialFeatureType: 'Point',
        srid: 4326
    })
    position!: Point;

    @Column({ nullable: true })
    professional_area!: string;
    
    @Column({ nullable: true })
    sex!: string;

    @Column({ nullable: true })
    pcd!: boolean;

    @Column({ nullable: true })
    work_model!: string;

    @Column({ nullable: true })
    webid!: string;

    @Column({ nullable: true })
    url!: string;

    @Column({ nullable: true })
    contract_type!: string;

    @Column({ nullable: true })
    contract_period!: string;
    
    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

    @OneToMany(() => VacancyExperience, (vacancyExperience) => vacancyExperience.Vacancy, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    vacancyExperience!: VacancyExperience[];

    @OneToMany(() => VacancyLanguage, (vacancyLanguage) => vacancyLanguage.Vacancy, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    vacancyLanguage!: VacancyLanguage[];

    @OneToMany(() => VacancySkill, (vacancySkill) => vacancySkill.Vacancy, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    vacancySkill!: VacancySkill[];

    @OneToMany(() => VacancyStudy, (vacancyStudy) => vacancyStudy.Vacancy, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    vacancyStudy!: VacancyStudy[];

    @OneToMany(() => Match, (match) => match.Vacancy)
    Match!: Match[];

    constructor() {
        if (!this.vacancy_id) {
            this.vacancy_id = uuid();
        }
    }
}

export { Vacancy };
