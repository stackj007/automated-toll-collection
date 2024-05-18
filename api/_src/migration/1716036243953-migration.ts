import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1716036243953 implements MigrationInterface {
    name = 'Migration1716036243953'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`userVehicleRequest\` DROP FOREIGN KEY \`FK_93d8e80e1dfae3318746e9fcc44\``);
        await queryRunner.query(`ALTER TABLE \`userVehicleRequest\` ADD CONSTRAINT \`FK_93d8e80e1dfae3318746e9fcc44\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`userVehicleRequest\` DROP FOREIGN KEY \`FK_93d8e80e1dfae3318746e9fcc44\``);
        await queryRunner.query(`ALTER TABLE \`userVehicleRequest\` ADD CONSTRAINT \`FK_93d8e80e1dfae3318746e9fcc44\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
