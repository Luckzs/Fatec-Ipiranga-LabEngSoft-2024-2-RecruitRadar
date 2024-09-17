import { MigrationInterface, QueryRunner } from "typeorm";

export class Vacancyperiodcontract1726400243157 implements MigrationInterface {
    name = 'Vacancyperiodcontract1726400243157'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vacancies" ADD "contract_period" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vacancies" DROP COLUMN "contract_period"`);
    }

}
