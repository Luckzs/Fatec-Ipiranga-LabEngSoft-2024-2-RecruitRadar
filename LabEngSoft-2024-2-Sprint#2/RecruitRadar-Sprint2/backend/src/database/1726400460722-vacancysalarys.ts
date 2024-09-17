import { MigrationInterface, QueryRunner } from "typeorm";

export class Vacancysalarys1726400460722 implements MigrationInterface {
    name = 'Vacancysalarys1726400460722'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vacancies" RENAME COLUMN "salary_min" TO "salary_max"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vacancies" RENAME COLUMN "salary_max" TO "salary_min"`);
    }

}
