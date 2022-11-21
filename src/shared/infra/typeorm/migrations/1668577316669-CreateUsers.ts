
import { MigrationInterface, QueryRunner, Table } from "typeorm"
const MAIN_TABLE = 'users'

export class CreateUsers1668577316669 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: MAIN_TABLE,
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            // default: "uuid_generate_v4()" FUNCAO ANTIGA, NAO HA MAIS MANUTENCAO
            default: "gen_random_uuid()"
          },
          {
            name: "name",
            type: "varchar"
          },
          {
            name: "username",
            type: "varchar"
          },
          {
            name: "password",
            type: "varchar"
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()"
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(MAIN_TABLE)
  }
}
