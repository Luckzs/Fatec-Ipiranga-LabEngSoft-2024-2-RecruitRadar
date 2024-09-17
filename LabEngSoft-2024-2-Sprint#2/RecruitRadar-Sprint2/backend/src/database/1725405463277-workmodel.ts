import { MigrationInterface, QueryRunner } from "typeorm";

export class Workmodel1725405463277 implements MigrationInterface {
    name = 'Workmodel1725405463277'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vacancies" ADD "work_model" character varying `);
        await queryRunner.query(`ALTER TABLE "candidate_objectives" ADD "work_model" character varying `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "candidate_objectives" DROP COLUMN "work_model"`);
        await queryRunner.query(`ALTER TABLE "vacancies" DROP COLUMN "work_model"`);
    }

}
