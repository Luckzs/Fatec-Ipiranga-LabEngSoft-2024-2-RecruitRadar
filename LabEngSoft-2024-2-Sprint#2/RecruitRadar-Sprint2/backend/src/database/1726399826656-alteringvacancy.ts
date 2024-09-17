import { MigrationInterface, QueryRunner } from "typeorm";

export class Alteringvacancy1726399826656 implements MigrationInterface {
    name = 'Alteringvacancy1726399826656'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "experiences" ALTER COLUMN "title" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vacancy_experiences" ALTER COLUMN "period" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "languages" ALTER COLUMN "course_name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vacancy_languages" ALTER COLUMN "level" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "skills" ALTER COLUMN "text" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "studies" ALTER COLUMN "course_name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "studies" ALTER COLUMN "level" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vacancy_studies" ALTER COLUMN "situation" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vacancy_studies" ALTER COLUMN "start_date" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vacancy_studies" ALTER COLUMN "completion_date" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vacancy_studies" ALTER COLUMN "completion_date" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vacancy_studies" ALTER COLUMN "start_date" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vacancy_studies" ALTER COLUMN "situation" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "studies" ALTER COLUMN "level" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "studies" ALTER COLUMN "course_name" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "skills" ALTER COLUMN "text" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vacancy_languages" ALTER COLUMN "level" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "languages" ALTER COLUMN "course_name" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vacancy_experiences" ALTER COLUMN "period" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "experiences" ALTER COLUMN "title" SET NOT NULL`);
    }

}
