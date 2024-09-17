import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCascateDelete1725931430177 implements MigrationInterface {
    name = 'AddCascateDelete1725931430177'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "candidate_experiences" DROP CONSTRAINT "FK_6476a2c9f72bbec10c5c9286a7b"`);
        await queryRunner.query(`ALTER TABLE "candidate_objectives" DROP CONSTRAINT "FK_404eef37dbcff4098b27f94c3a9"`);
        await queryRunner.query(`ALTER TABLE "candidate_languages" DROP CONSTRAINT "FK_dbcdd48e60c72f143c42694d7a0"`);
        await queryRunner.query(`ALTER TABLE "candidate_skills" DROP CONSTRAINT "FK_bb3474452a29e2537ebd0ea22f8"`);
        await queryRunner.query(`ALTER TABLE "candidate_studies" DROP CONSTRAINT "FK_9e1dd98a33e513c991d4186eb8b"`);
        await queryRunner.query(`ALTER TABLE "candidate_experiences" ADD CONSTRAINT "FK_6476a2c9f72bbec10c5c9286a7b" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("candidate_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "candidate_objectives" ADD CONSTRAINT "FK_404eef37dbcff4098b27f94c3a9" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("candidate_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "candidate_languages" ADD CONSTRAINT "FK_dbcdd48e60c72f143c42694d7a0" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("candidate_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "candidate_skills" ADD CONSTRAINT "FK_bb3474452a29e2537ebd0ea22f8" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("candidate_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "candidate_studies" ADD CONSTRAINT "FK_9e1dd98a33e513c991d4186eb8b" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("candidate_id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "candidate_studies" DROP CONSTRAINT "FK_9e1dd98a33e513c991d4186eb8b"`);
        await queryRunner.query(`ALTER TABLE "candidate_skills" DROP CONSTRAINT "FK_bb3474452a29e2537ebd0ea22f8"`);
        await queryRunner.query(`ALTER TABLE "candidate_languages" DROP CONSTRAINT "FK_dbcdd48e60c72f143c42694d7a0"`);
        await queryRunner.query(`ALTER TABLE "candidate_objectives" DROP CONSTRAINT "FK_404eef37dbcff4098b27f94c3a9"`);
        await queryRunner.query(`ALTER TABLE "candidate_experiences" DROP CONSTRAINT "FK_6476a2c9f72bbec10c5c9286a7b"`);
        await queryRunner.query(`ALTER TABLE "candidate_studies" ADD CONSTRAINT "FK_9e1dd98a33e513c991d4186eb8b" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("candidate_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "candidate_skills" ADD CONSTRAINT "FK_bb3474452a29e2537ebd0ea22f8" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("candidate_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "candidate_languages" ADD CONSTRAINT "FK_dbcdd48e60c72f143c42694d7a0" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("candidate_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "candidate_objectives" ADD CONSTRAINT "FK_404eef37dbcff4098b27f94c3a9" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("candidate_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "candidate_experiences" ADD CONSTRAINT "FK_6476a2c9f72bbec10c5c9286a7b" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("candidate_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
