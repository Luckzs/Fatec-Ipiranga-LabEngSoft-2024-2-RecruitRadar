import { MigrationInterface, QueryRunner } from "typeorm";

export class Vacancysalary1726413670484 implements MigrationInterface {
    name = 'Vacancysalary1726413670484'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vacancies" DROP COLUMN "salary"`);
        await queryRunner.query(`ALTER TABLE "vacancies" ADD "salary" character varying`);
        await queryRunner.query(`ALTER TABLE "vacancies" DROP COLUMN "salary_max"`);
        await queryRunner.query(`ALTER TABLE "vacancies" ADD "salary_max" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vacancies" DROP COLUMN "salary_max"`);
        await queryRunner.query(`ALTER TABLE "vacancies" ADD "salary_max" integer`);
        await queryRunner.query(`ALTER TABLE "vacancies" DROP COLUMN "salary"`);
        await queryRunner.query(`ALTER TABLE "vacancies" ADD "salary" integer`);
    }

}
