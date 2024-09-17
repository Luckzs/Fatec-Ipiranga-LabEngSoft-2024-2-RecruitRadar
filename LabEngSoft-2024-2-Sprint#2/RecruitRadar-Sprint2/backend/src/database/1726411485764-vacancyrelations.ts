import { MigrationInterface, QueryRunner } from "typeorm";

export class Vacancyrelations1726411485764 implements MigrationInterface {
    name = 'Vacancyrelations1726411485764'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "studies" DROP COLUMN "course_name"`);
        await queryRunner.query(`ALTER TABLE "studies" DROP COLUMN "level"`);
        await queryRunner.query(`ALTER TABLE "studies" ADD "education" character varying`);
        await queryRunner.query(`ALTER TABLE "candidate_studies" ADD "course_name" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "candidate_studies" DROP COLUMN "course_name"`);
        await queryRunner.query(`ALTER TABLE "studies" DROP COLUMN "education"`);
        await queryRunner.query(`ALTER TABLE "studies" ADD "level" character varying`);
        await queryRunner.query(`ALTER TABLE "studies" ADD "course_name" character varying`);
    }

}
