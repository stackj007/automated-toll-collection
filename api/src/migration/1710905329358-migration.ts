import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1710905329358 implements MigrationInterface {
    name = 'migration1710905329358'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "user" (
            "id" SERIAL PRIMARY KEY,
            "email" varchar(255) NOT NULL,
            "name" varchar(255) NOT NULL,
            "password" varchar(255) NOT NULL,
            "isAdmin" smallint NOT NULL DEFAULT 0,
            UNIQUE ("email")
    )`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }
}
