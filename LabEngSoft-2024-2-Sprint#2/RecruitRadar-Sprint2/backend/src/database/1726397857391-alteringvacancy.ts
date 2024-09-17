import { MigrationInterface, QueryRunner } from "typeorm";

export class Alteringvacancy1726397857391 implements MigrationInterface {
    name = 'Alteringvacancy1726397857391'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vacancies" ADD "salary_min" integer`);
        await queryRunner.query(`ALTER TABLE "vacancies" ADD "webid" character varying`);
        await queryRunner.query(`ALTER TABLE "vacancies" ADD "url" character varying`);
        await queryRunner.query(`ALTER TABLE "vacancies" ADD "contract_type" character varying`);
        await queryRunner.query(`ALTER TABLE "vacancies" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vacancies" ALTER COLUMN "salary" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vacancies" ALTER COLUMN "address" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vacancies" ALTER COLUMN "complement" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vacancies" ALTER COLUMN "city" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vacancies" ALTER COLUMN "state" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vacancies" ALTER COLUMN "postal_code" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vacancies" ALTER COLUMN "sex" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vacancies" ALTER COLUMN "pcd" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vacancies" ALTER COLUMN "pcd" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vacancies" ALTER COLUMN "sex" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vacancies" ALTER COLUMN "postal_code" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vacancies" ALTER COLUMN "state" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vacancies" ALTER COLUMN "city" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vacancies" ALTER COLUMN "complement" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vacancies" ALTER COLUMN "address" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vacancies" ALTER COLUMN "salary" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vacancies" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vacancies" DROP COLUMN "contract_type"`);
        await queryRunner.query(`ALTER TABLE "vacancies" DROP COLUMN "url"`);
        await queryRunner.query(`ALTER TABLE "vacancies" DROP COLUMN "webid"`);
        await queryRunner.query(`ALTER TABLE "vacancies" DROP COLUMN "salary_min"`);
    }

}
