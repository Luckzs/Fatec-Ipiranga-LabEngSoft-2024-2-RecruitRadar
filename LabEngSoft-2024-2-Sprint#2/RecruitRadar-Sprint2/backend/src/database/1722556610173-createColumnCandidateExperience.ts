import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateColumnCandidateExperience1722556610173 implements MigrationInterface {
    name = 'CreateColumnCandidateExperience1722556610173'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vacancies" ("vacancy_id" character varying NOT NULL, "company_name" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "salary" integer NOT NULL, "address" character varying NOT NULL, "complement" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "postal_code" character varying NOT NULL, "sex" character varying NOT NULL, "pcd" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ccd792c6a163e3ddd0d92f78ba8" PRIMARY KEY ("vacancy_id"))`);
        await queryRunner.query(`CREATE TABLE "vacancy_studies" ("vacancy_study_id" character varying NOT NULL, "situation" character varying NOT NULL, "start_date" TIMESTAMP NOT NULL, "completion_date" TIMESTAMP NOT NULL, "vacancy_id" character varying NOT NULL, "study_id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9550c40af1f92370e8a65c83121" PRIMARY KEY ("vacancy_study_id"))`);
        await queryRunner.query(`CREATE TABLE "vacancy_skills" ("vacancy_skill_id" character varying NOT NULL, "vacancy_id" character varying NOT NULL, "skill_id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_971946b0edaa87b40bb481602bb" PRIMARY KEY ("vacancy_skill_id"))`);
        await queryRunner.query(`CREATE TABLE "vacancy_languages" ("vacancy_language_id" character varying NOT NULL, "vacancy_id" character varying NOT NULL, "language_id" character varying NOT NULL, "level" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_31384f519a4f64fe8d7af51bc48" PRIMARY KEY ("vacancy_language_id"))`);
        await queryRunner.query(`CREATE TABLE "vacancy_experiences" ("vacancy_experience_id" character varying NOT NULL, "period" character varying NOT NULL, "vacancy_id" character varying NOT NULL, "experience_id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fb4978c0ba47377653c8ab33f07" PRIMARY KEY ("vacancy_experience_id"))`);
        await queryRunner.query(`CREATE TABLE "matches" ("match_id" character varying NOT NULL, "candidate_id" character varying NOT NULL, "vacancy_id" character varying NOT NULL, "score" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fc1e0ceed974649e53f113ca67e" PRIMARY KEY ("match_id"))`);
        await queryRunner.query(`ALTER TABLE "candidate_experiences" ADD "period" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vacancy_studies" ADD CONSTRAINT "FK_c88d6009dfc28b569cdc49db5cc" FOREIGN KEY ("vacancy_id") REFERENCES "vacancies"("vacancy_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vacancy_studies" ADD CONSTRAINT "FK_ae2a2b284a30905ad372d01f4c7" FOREIGN KEY ("study_id") REFERENCES "studies"("study_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vacancy_skills" ADD CONSTRAINT "FK_e9fb9b8bf0940be78459af00351" FOREIGN KEY ("vacancy_id") REFERENCES "vacancies"("vacancy_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vacancy_skills" ADD CONSTRAINT "FK_978961a3de63e5180716dc2657e" FOREIGN KEY ("skill_id") REFERENCES "skills"("skill_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vacancy_languages" ADD CONSTRAINT "FK_d77e23e0497b48299c4a9ffe28d" FOREIGN KEY ("vacancy_id") REFERENCES "vacancies"("vacancy_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vacancy_languages" ADD CONSTRAINT "FK_24093eb6b0c6cc19bb590c9bae6" FOREIGN KEY ("language_id") REFERENCES "languages"("language_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vacancy_experiences" ADD CONSTRAINT "FK_33600e18342ca09784325272f9d" FOREIGN KEY ("vacancy_id") REFERENCES "vacancies"("vacancy_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vacancy_experiences" ADD CONSTRAINT "FK_7aa6acce5d335805d9884c11953" FOREIGN KEY ("experience_id") REFERENCES "experiences"("experience_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "matches" ADD CONSTRAINT "FK_18979acf85b4cbf59e2e92ff3d0" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("candidate_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "matches" ADD CONSTRAINT "FK_b6aa04074071f574e80f6057638" FOREIGN KEY ("vacancy_id") REFERENCES "vacancies"("vacancy_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "matches" DROP CONSTRAINT "FK_b6aa04074071f574e80f6057638"`);
        await queryRunner.query(`ALTER TABLE "matches" DROP CONSTRAINT "FK_18979acf85b4cbf59e2e92ff3d0"`);
        await queryRunner.query(`ALTER TABLE "vacancy_experiences" DROP CONSTRAINT "FK_7aa6acce5d335805d9884c11953"`);
        await queryRunner.query(`ALTER TABLE "vacancy_experiences" DROP CONSTRAINT "FK_33600e18342ca09784325272f9d"`);
        await queryRunner.query(`ALTER TABLE "vacancy_languages" DROP CONSTRAINT "FK_24093eb6b0c6cc19bb590c9bae6"`);
        await queryRunner.query(`ALTER TABLE "vacancy_languages" DROP CONSTRAINT "FK_d77e23e0497b48299c4a9ffe28d"`);
        await queryRunner.query(`ALTER TABLE "vacancy_skills" DROP CONSTRAINT "FK_978961a3de63e5180716dc2657e"`);
        await queryRunner.query(`ALTER TABLE "vacancy_skills" DROP CONSTRAINT "FK_e9fb9b8bf0940be78459af00351"`);
        await queryRunner.query(`ALTER TABLE "vacancy_studies" DROP CONSTRAINT "FK_ae2a2b284a30905ad372d01f4c7"`);
        await queryRunner.query(`ALTER TABLE "vacancy_studies" DROP CONSTRAINT "FK_c88d6009dfc28b569cdc49db5cc"`);
        await queryRunner.query(`ALTER TABLE "candidate_experiences" DROP COLUMN "period"`);
        await queryRunner.query(`DROP TABLE "matches"`);
        await queryRunner.query(`DROP TABLE "vacancy_experiences"`);
        await queryRunner.query(`DROP TABLE "vacancy_languages"`);
        await queryRunner.query(`DROP TABLE "vacancy_skills"`);
        await queryRunner.query(`DROP TABLE "vacancy_studies"`);
        await queryRunner.query(`DROP TABLE "vacancies"`);
    }

}
