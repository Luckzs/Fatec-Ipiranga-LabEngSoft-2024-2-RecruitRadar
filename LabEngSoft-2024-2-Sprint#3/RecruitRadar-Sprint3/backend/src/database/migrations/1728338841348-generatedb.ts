import { MigrationInterface, QueryRunner } from "typeorm";

export class Generatedb1728338841348 implements MigrationInterface {
    name = 'Generatedb1728338841348'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "experiences" ("experience_id" character varying NOT NULL, "title" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c2f45242963ea2ccbe16aa907b2" PRIMARY KEY ("experience_id"))`);
        await queryRunner.query(`CREATE TABLE "vacancy_experiences" ("vacancy_experience_id" character varying NOT NULL, "period" character varying, "vacancy_id" character varying NOT NULL, "experience_id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fb4978c0ba47377653c8ab33f07" PRIMARY KEY ("vacancy_experience_id"))`);
        await queryRunner.query(`CREATE TABLE "skills" ("skill_id" character varying NOT NULL, "text" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_55ac384c23eb7bf7a8929836317" PRIMARY KEY ("skill_id"))`);
        await queryRunner.query(`CREATE TABLE "vacancy_skills" ("vacancy_skill_id" character varying NOT NULL, "vacancy_id" character varying NOT NULL, "skill_id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_971946b0edaa87b40bb481602bb" PRIMARY KEY ("vacancy_skill_id"))`);
        await queryRunner.query(`CREATE TABLE "studies" ("study_id" character varying NOT NULL, "education" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2f2f6a8812b500daa25a356a603" PRIMARY KEY ("study_id"))`);
        await queryRunner.query(`CREATE TABLE "vacancy_studies" ("vacancy_study_id" character varying NOT NULL, "situation" character varying, "start_date" TIMESTAMP, "completion_date" TIMESTAMP, "vacancy_id" character varying NOT NULL, "study_id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9550c40af1f92370e8a65c83121" PRIMARY KEY ("vacancy_study_id"))`);
        await queryRunner.query(`CREATE TABLE "user_statuses" ("user_status_id" character varying NOT NULL, "name" character varying NOT NULL, "deleted_at" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_798834c48e858365c325d1d9ed1" PRIMARY KEY ("user_status_id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("user_id" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying NOT NULL, "admin" boolean NOT NULL, "deleted_at" TIMESTAMP, "activated_at" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_status_id" character varying NOT NULL, "passwordResetToken" character varying, "passwordResetExpires" TIMESTAMP, CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "candidate_experiences" ("candidate_experience_id" character varying NOT NULL, "company_name" character varying NOT NULL, "start_date" TIMESTAMP NOT NULL, "end_date" TIMESTAMP NOT NULL, "period" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "candidate_id" character varying NOT NULL, "experience_id" character varying NOT NULL, CONSTRAINT "PK_9aee228314823cba3814364bd7a" PRIMARY KEY ("candidate_experience_id"))`);
        await queryRunner.query(`CREATE TABLE "candidate_objectives" ("candidate_objective_id" character varying NOT NULL, "job" character varying NOT NULL, "work_model" character varying, "salary_expectation" character varying NOT NULL, "candidate_id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6cca370c335ba9ebdf39039833e" PRIMARY KEY ("candidate_objective_id"))`);
        await queryRunner.query(`CREATE TABLE "languages" ("language_id" character varying NOT NULL, "course_name" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_108420613c85f301619cf49234d" PRIMARY KEY ("language_id"))`);
        await queryRunner.query(`CREATE TABLE "candidate_languages" ("candidate_language_id" character varying NOT NULL, "level" character varying NOT NULL, "candidate_id" character varying NOT NULL, "language_id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_627eacc8e0f4ef1378080bf9017" PRIMARY KEY ("candidate_language_id"))`);
        await queryRunner.query(`CREATE TABLE "candidate_skills" ("candidate_skill_id" character varying NOT NULL, "candidate_id" character varying NOT NULL, "skill_id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0c095caf88eae14d6d74404482e" PRIMARY KEY ("candidate_skill_id"))`);
        await queryRunner.query(`CREATE TABLE "candidate_studies" ("candidate_study_id" character varying NOT NULL, "institution_name" character varying NOT NULL, "course_name" character varying, "situation" character varying NOT NULL, "start_date" TIMESTAMP NOT NULL, "completion_date" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "candidate_id" character varying NOT NULL, "study_id" character varying NOT NULL, CONSTRAINT "PK_e7fd34b719c61227c0ff8e0d06b" PRIMARY KEY ("candidate_study_id"))`);
        await queryRunner.query(`CREATE TABLE "candidates" ("candidate_id" character varying NOT NULL, "CPF" character varying NOT NULL, "full_name" character varying NOT NULL, "sex" character varying NOT NULL, "pcd" boolean NOT NULL, "birth_date" TIMESTAMP NOT NULL, "address" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "postal_code" character varying NOT NULL, "distance_radius" integer NOT NULL, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" character varying NOT NULL, CONSTRAINT "REL_94a5fe85e7f5bd0221fa7d6f19" UNIQUE ("user_id"), CONSTRAINT "PK_2d9f6cff02a13bbd30792e5eebd" PRIMARY KEY ("candidate_id"))`);
        await queryRunner.query(`CREATE TABLE "matches" ("match_id" character varying NOT NULL, "candidate_id" character varying NOT NULL, "vacancy_id" character varying NOT NULL, "score" integer NOT NULL, "applied" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fc1e0ceed974649e53f113ca67e" PRIMARY KEY ("match_id"))`);
        await queryRunner.query(`CREATE TABLE "vacancies" ("vacancy_id" character varying NOT NULL, "company_name" character varying NOT NULL, "logo" character varying, "title" character varying NOT NULL, "description" character varying, "salary" character varying, "salary_max" character varying, "address" character varying, "complement" character varying, "city" character varying, "state" character varying, "postal_code" character varying, "sex" character varying, "pcd" boolean, "work_model" character varying, "webid" character varying, "url" character varying, "contract_type" character varying, "contract_period" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ccd792c6a163e3ddd0d92f78ba8" PRIMARY KEY ("vacancy_id"))`);
        await queryRunner.query(`CREATE TABLE "vacancy_languages" ("vacancy_language_id" character varying NOT NULL, "vacancy_id" character varying NOT NULL, "language_id" character varying NOT NULL, "level" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_31384f519a4f64fe8d7af51bc48" PRIMARY KEY ("vacancy_language_id"))`);
        await queryRunner.query(`ALTER TABLE "vacancy_experiences" ADD CONSTRAINT "FK_33600e18342ca09784325272f9d" FOREIGN KEY ("vacancy_id") REFERENCES "vacancies"("vacancy_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "vacancy_experiences" ADD CONSTRAINT "FK_7aa6acce5d335805d9884c11953" FOREIGN KEY ("experience_id") REFERENCES "experiences"("experience_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vacancy_skills" ADD CONSTRAINT "FK_e9fb9b8bf0940be78459af00351" FOREIGN KEY ("vacancy_id") REFERENCES "vacancies"("vacancy_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "vacancy_skills" ADD CONSTRAINT "FK_978961a3de63e5180716dc2657e" FOREIGN KEY ("skill_id") REFERENCES "skills"("skill_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vacancy_studies" ADD CONSTRAINT "FK_c88d6009dfc28b569cdc49db5cc" FOREIGN KEY ("vacancy_id") REFERENCES "vacancies"("vacancy_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "vacancy_studies" ADD CONSTRAINT "FK_ae2a2b284a30905ad372d01f4c7" FOREIGN KEY ("study_id") REFERENCES "studies"("study_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_a39ec5232a0d1688c2a3e6f5384" FOREIGN KEY ("user_status_id") REFERENCES "user_statuses"("user_status_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "candidate_experiences" ADD CONSTRAINT "FK_6476a2c9f72bbec10c5c9286a7b" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("candidate_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "candidate_experiences" ADD CONSTRAINT "FK_0c2c65cb517dbff6d5b99840f0f" FOREIGN KEY ("experience_id") REFERENCES "experiences"("experience_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "candidate_objectives" ADD CONSTRAINT "FK_404eef37dbcff4098b27f94c3a9" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("candidate_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "candidate_languages" ADD CONSTRAINT "FK_dbcdd48e60c72f143c42694d7a0" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("candidate_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "candidate_languages" ADD CONSTRAINT "FK_e36d97db1e100f22b7daf0fbc1d" FOREIGN KEY ("language_id") REFERENCES "languages"("language_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "candidate_skills" ADD CONSTRAINT "FK_bb3474452a29e2537ebd0ea22f8" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("candidate_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "candidate_skills" ADD CONSTRAINT "FK_c84d2943849a7f0f8bec796572d" FOREIGN KEY ("skill_id") REFERENCES "skills"("skill_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "candidate_studies" ADD CONSTRAINT "FK_9e1dd98a33e513c991d4186eb8b" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("candidate_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "candidate_studies" ADD CONSTRAINT "FK_d473817bdc0878de4661b3d9a1b" FOREIGN KEY ("study_id") REFERENCES "studies"("study_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "candidates" ADD CONSTRAINT "FK_94a5fe85e7f5bd0221fa7d6f19c" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "matches" ADD CONSTRAINT "FK_18979acf85b4cbf59e2e92ff3d0" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("candidate_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "matches" ADD CONSTRAINT "FK_b6aa04074071f574e80f6057638" FOREIGN KEY ("vacancy_id") REFERENCES "vacancies"("vacancy_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vacancy_languages" ADD CONSTRAINT "FK_d77e23e0497b48299c4a9ffe28d" FOREIGN KEY ("vacancy_id") REFERENCES "vacancies"("vacancy_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "vacancy_languages" ADD CONSTRAINT "FK_24093eb6b0c6cc19bb590c9bae6" FOREIGN KEY ("language_id") REFERENCES "languages"("language_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vacancy_languages" DROP CONSTRAINT "FK_24093eb6b0c6cc19bb590c9bae6"`);
        await queryRunner.query(`ALTER TABLE "vacancy_languages" DROP CONSTRAINT "FK_d77e23e0497b48299c4a9ffe28d"`);
        await queryRunner.query(`ALTER TABLE "matches" DROP CONSTRAINT "FK_b6aa04074071f574e80f6057638"`);
        await queryRunner.query(`ALTER TABLE "matches" DROP CONSTRAINT "FK_18979acf85b4cbf59e2e92ff3d0"`);
        await queryRunner.query(`ALTER TABLE "candidates" DROP CONSTRAINT "FK_94a5fe85e7f5bd0221fa7d6f19c"`);
        await queryRunner.query(`ALTER TABLE "candidate_studies" DROP CONSTRAINT "FK_d473817bdc0878de4661b3d9a1b"`);
        await queryRunner.query(`ALTER TABLE "candidate_studies" DROP CONSTRAINT "FK_9e1dd98a33e513c991d4186eb8b"`);
        await queryRunner.query(`ALTER TABLE "candidate_skills" DROP CONSTRAINT "FK_c84d2943849a7f0f8bec796572d"`);
        await queryRunner.query(`ALTER TABLE "candidate_skills" DROP CONSTRAINT "FK_bb3474452a29e2537ebd0ea22f8"`);
        await queryRunner.query(`ALTER TABLE "candidate_languages" DROP CONSTRAINT "FK_e36d97db1e100f22b7daf0fbc1d"`);
        await queryRunner.query(`ALTER TABLE "candidate_languages" DROP CONSTRAINT "FK_dbcdd48e60c72f143c42694d7a0"`);
        await queryRunner.query(`ALTER TABLE "candidate_objectives" DROP CONSTRAINT "FK_404eef37dbcff4098b27f94c3a9"`);
        await queryRunner.query(`ALTER TABLE "candidate_experiences" DROP CONSTRAINT "FK_0c2c65cb517dbff6d5b99840f0f"`);
        await queryRunner.query(`ALTER TABLE "candidate_experiences" DROP CONSTRAINT "FK_6476a2c9f72bbec10c5c9286a7b"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_a39ec5232a0d1688c2a3e6f5384"`);
        await queryRunner.query(`ALTER TABLE "vacancy_studies" DROP CONSTRAINT "FK_ae2a2b284a30905ad372d01f4c7"`);
        await queryRunner.query(`ALTER TABLE "vacancy_studies" DROP CONSTRAINT "FK_c88d6009dfc28b569cdc49db5cc"`);
        await queryRunner.query(`ALTER TABLE "vacancy_skills" DROP CONSTRAINT "FK_978961a3de63e5180716dc2657e"`);
        await queryRunner.query(`ALTER TABLE "vacancy_skills" DROP CONSTRAINT "FK_e9fb9b8bf0940be78459af00351"`);
        await queryRunner.query(`ALTER TABLE "vacancy_experiences" DROP CONSTRAINT "FK_7aa6acce5d335805d9884c11953"`);
        await queryRunner.query(`ALTER TABLE "vacancy_experiences" DROP CONSTRAINT "FK_33600e18342ca09784325272f9d"`);
        await queryRunner.query(`DROP TABLE "vacancy_languages"`);
        await queryRunner.query(`DROP TABLE "vacancies"`);
        await queryRunner.query(`DROP TABLE "matches"`);
        await queryRunner.query(`DROP TABLE "candidates"`);
        await queryRunner.query(`DROP TABLE "candidate_studies"`);
        await queryRunner.query(`DROP TABLE "candidate_skills"`);
        await queryRunner.query(`DROP TABLE "candidate_languages"`);
        await queryRunner.query(`DROP TABLE "languages"`);
        await queryRunner.query(`DROP TABLE "candidate_objectives"`);
        await queryRunner.query(`DROP TABLE "candidate_experiences"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "user_statuses"`);
        await queryRunner.query(`DROP TABLE "vacancy_studies"`);
        await queryRunner.query(`DROP TABLE "studies"`);
        await queryRunner.query(`DROP TABLE "vacancy_skills"`);
        await queryRunner.query(`DROP TABLE "skills"`);
        await queryRunner.query(`DROP TABLE "vacancy_experiences"`);
        await queryRunner.query(`DROP TABLE "experiences"`);
    }

}
