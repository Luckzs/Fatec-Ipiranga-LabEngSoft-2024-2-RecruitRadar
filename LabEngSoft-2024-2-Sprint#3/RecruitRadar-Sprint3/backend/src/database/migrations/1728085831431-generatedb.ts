import { MigrationInterface, QueryRunner } from "typeorm";

export class Generatedb1728085831431 implements MigrationInterface {
    name = 'Generatedb1728085831431'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "matches" ADD "applied" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "matches" DROP COLUMN "applied"`);
    }

}
