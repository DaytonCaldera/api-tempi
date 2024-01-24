import { MigrationInterface, QueryRunner } from 'typeorm';

export class Grupo1705676696024 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "grupo" (
            "id" INT AUTO_INCREMENT PRIMARY KEY,
            "nombre" VARCHAR(255) NOT NULL
        )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "grupo"`);
  }
}
