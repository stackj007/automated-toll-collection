import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1715954825787 implements MigrationInterface {
    name = 'Migration1715954825787'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`userVehicleRequest\` ADD \`vehicleType\` varchar(255) NOT NULL DEFAULT 'car'`);
        await queryRunner.query(`ALTER TABLE \`userVehicleRequest\` ADD \`vehicleName\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`userVehicleRequest\` DROP COLUMN \`vehicleName\``);
        await queryRunner.query(`ALTER TABLE \`userVehicleRequest\` DROP COLUMN \`vehicleType\``);
    }
}
