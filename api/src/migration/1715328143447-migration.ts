import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1715328143447 implements MigrationInterface {
    name = 'Migration1715328143447'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD \`tollGateId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD CONSTRAINT \`FK_5ebf7f47c22a0a9ad7fadb0c95c\` FOREIGN KEY (\`tollGateId\`) REFERENCES \`tollGate\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP FOREIGN KEY \`FK_5ebf7f47c22a0a9ad7fadb0c95c\``);
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP COLUMN \`tollGateId\``);
    }

}
