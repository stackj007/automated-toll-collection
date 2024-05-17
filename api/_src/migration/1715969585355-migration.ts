import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1715969585355 implements MigrationInterface {
    name = 'Migration1715969585355'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tollGate\` CHANGE \`fee\` \`priceList\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tollGate\` DROP COLUMN \`priceList\``);
        await queryRunner.query(`ALTER TABLE \`tollGate\` ADD \`priceList\` json NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tollGate\` DROP COLUMN \`priceList\``);
        await queryRunner.query(`ALTER TABLE \`tollGate\` ADD \`priceList\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tollGate\` CHANGE \`priceList\` \`fee\` int NOT NULL`);
    }

}
