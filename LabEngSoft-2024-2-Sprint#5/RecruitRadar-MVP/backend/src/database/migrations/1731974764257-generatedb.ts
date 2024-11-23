import { MigrationInterface, QueryRunner } from "typeorm";

export class Generatedb1731974764257 implements MigrationInterface {
    name = 'Generatedb1731974764257'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "matches" DROP CONSTRAINT "FK_18979acf85b4cbf59e2e92ff3d0"`);
        await queryRunner.query(`ALTER TABLE "matches" DROP CONSTRAINT "FK_b6aa04074071f574e80f6057638"`);
        await queryRunner.query(`ALTER TABLE "candidate_objectives" ALTER COLUMN "job" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "candidate_objectives" ALTER COLUMN "salary_expectation" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "candidate_objectives" ALTER COLUMN "professional_area" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "candidates" ALTER COLUMN "updated_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "matches" ADD CONSTRAINT "FK_18979acf85b4cbf59e2e92ff3d0" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("candidate_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "matches" ADD CONSTRAINT "FK_b6aa04074071f574e80f6057638" FOREIGN KEY ("vacancy_id") REFERENCES "vacancies"("vacancy_id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "matches" DROP CONSTRAINT "FK_b6aa04074071f574e80f6057638"`);
        await queryRunner.query(`ALTER TABLE "matches" DROP CONSTRAINT "FK_18979acf85b4cbf59e2e92ff3d0"`);
        await queryRunner.query(`ALTER TABLE "candidates" ALTER COLUMN "updated_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "candidate_objectives" ALTER COLUMN "professional_area" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "candidate_objectives" ALTER COLUMN "salary_expectation" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "candidate_objectives" ALTER COLUMN "job" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "matches" ADD CONSTRAINT "FK_b6aa04074071f574e80f6057638" FOREIGN KEY ("vacancy_id") REFERENCES "vacancies"("vacancy_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "matches" ADD CONSTRAINT "FK_18979acf85b4cbf59e2e92ff3d0" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("candidate_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
