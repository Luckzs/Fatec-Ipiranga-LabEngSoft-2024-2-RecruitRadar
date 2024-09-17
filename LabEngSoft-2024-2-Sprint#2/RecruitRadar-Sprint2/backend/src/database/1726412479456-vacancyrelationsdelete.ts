import { MigrationInterface, QueryRunner } from "typeorm";

export class Vacancyrelationsdelete1726412479456 implements MigrationInterface {
    name = 'Vacancyrelationsdelete1726412479456'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vacancy_experiences" DROP CONSTRAINT "FK_33600e18342ca09784325272f9d"`);
        await queryRunner.query(`ALTER TABLE "vacancy_languages" DROP CONSTRAINT "FK_d77e23e0497b48299c4a9ffe28d"`);
        await queryRunner.query(`ALTER TABLE "vacancy_skills" DROP CONSTRAINT "FK_e9fb9b8bf0940be78459af00351"`);
        await queryRunner.query(`ALTER TABLE "vacancy_studies" DROP CONSTRAINT "FK_c88d6009dfc28b569cdc49db5cc"`);
        await queryRunner.query(`ALTER TABLE "vacancy_experiences" ADD CONSTRAINT "FK_33600e18342ca09784325272f9d" FOREIGN KEY ("vacancy_id") REFERENCES "vacancies"("vacancy_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "vacancy_languages" ADD CONSTRAINT "FK_d77e23e0497b48299c4a9ffe28d" FOREIGN KEY ("vacancy_id") REFERENCES "vacancies"("vacancy_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "vacancy_skills" ADD CONSTRAINT "FK_e9fb9b8bf0940be78459af00351" FOREIGN KEY ("vacancy_id") REFERENCES "vacancies"("vacancy_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "vacancy_studies" ADD CONSTRAINT "FK_c88d6009dfc28b569cdc49db5cc" FOREIGN KEY ("vacancy_id") REFERENCES "vacancies"("vacancy_id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vacancy_studies" DROP CONSTRAINT "FK_c88d6009dfc28b569cdc49db5cc"`);
        await queryRunner.query(`ALTER TABLE "vacancy_skills" DROP CONSTRAINT "FK_e9fb9b8bf0940be78459af00351"`);
        await queryRunner.query(`ALTER TABLE "vacancy_languages" DROP CONSTRAINT "FK_d77e23e0497b48299c4a9ffe28d"`);
        await queryRunner.query(`ALTER TABLE "vacancy_experiences" DROP CONSTRAINT "FK_33600e18342ca09784325272f9d"`);
        await queryRunner.query(`ALTER TABLE "vacancy_studies" ADD CONSTRAINT "FK_c88d6009dfc28b569cdc49db5cc" FOREIGN KEY ("vacancy_id") REFERENCES "vacancies"("vacancy_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vacancy_skills" ADD CONSTRAINT "FK_e9fb9b8bf0940be78459af00351" FOREIGN KEY ("vacancy_id") REFERENCES "vacancies"("vacancy_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vacancy_languages" ADD CONSTRAINT "FK_d77e23e0497b48299c4a9ffe28d" FOREIGN KEY ("vacancy_id") REFERENCES "vacancies"("vacancy_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vacancy_experiences" ADD CONSTRAINT "FK_33600e18342ca09784325272f9d" FOREIGN KEY ("vacancy_id") REFERENCES "vacancies"("vacancy_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
