import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1713240724393 implements MigrationInterface {
    name = 'Migration1713240724393'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`session\` (\`expiredAt\` bigint NOT NULL, \`id\` varchar(255) NOT NULL, \`json\` text NOT NULL, \`destroyedAt\` datetime(6) NULL, INDEX \`IDX_28c5d1d16da7908c97c9bc2f74\` (\`expiredAt\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tollGate\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`address\` varchar(255) NOT NULL, \`fee\` int NOT NULL, UNIQUE INDEX \`IDX_b6ef5c86c205096659b3a13204\` (\`address\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`userVehicleRequest\` (\`id\` int NOT NULL AUTO_INCREMENT, \`vehicleNumber\` varchar(255) NOT NULL, \`idCardUrl\` varchar(255) NULL, \`driverLicenseUrl\` varchar(255) NULL, \`vehicleRCBookUrl\` varchar(255) NULL, \`status\` varchar(255) NOT NULL DEFAULT 'pending', \`userId\` int NULL, UNIQUE INDEX \`IDX_b3ea88ca552f79626f6f87066b\` (\`vehicleNumber\`), UNIQUE INDEX \`REL_93d8e80e1dfae3318746e9fcc4\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`isAdmin\` tinyint NOT NULL DEFAULT 0, \`balance\` varchar(255) NOT NULL DEFAULT '0', UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`transaction\` (\`id\` varchar(36) NOT NULL, \`stripeSessionId\` varchar(255) NULL, \`amount\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL DEFAULT 'pending', \`type\` varchar(255) NOT NULL DEFAULT 'fee', \`date\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`userId\` int NULL, UNIQUE INDEX \`IDX_4a21aaf44c6e3120e743264431\` (\`stripeSessionId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`userVehicleRequest\` ADD CONSTRAINT \`FK_93d8e80e1dfae3318746e9fcc44\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD CONSTRAINT \`FK_605baeb040ff0fae995404cea37\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP FOREIGN KEY \`FK_605baeb040ff0fae995404cea37\``);
        await queryRunner.query(`ALTER TABLE \`userVehicleRequest\` DROP FOREIGN KEY \`FK_93d8e80e1dfae3318746e9fcc44\``);
        await queryRunner.query(`DROP INDEX \`IDX_4a21aaf44c6e3120e743264431\` ON \`transaction\``);
        await queryRunner.query(`DROP TABLE \`transaction\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP INDEX \`REL_93d8e80e1dfae3318746e9fcc4\` ON \`userVehicleRequest\``);
        await queryRunner.query(`DROP INDEX \`IDX_b3ea88ca552f79626f6f87066b\` ON \`userVehicleRequest\``);
        await queryRunner.query(`DROP TABLE \`userVehicleRequest\``);
        await queryRunner.query(`DROP INDEX \`IDX_b6ef5c86c205096659b3a13204\` ON \`tollGate\``);
        await queryRunner.query(`DROP TABLE \`tollGate\``);
        await queryRunner.query(`DROP INDEX \`IDX_28c5d1d16da7908c97c9bc2f74\` ON \`session\``);
        await queryRunner.query(`DROP TABLE \`session\``);
    }

}
