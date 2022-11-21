import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

const MAIN_TABLE = 'users_role'

const USERS_ID = 'users_id'
const ROLE_ID = 'role_id'
const USERS_TABLE = 'users'
const ROLE_TABLE = 'role'
const FK_ROLE_TO_USERS = 'fk_role_users'
const FK_USERS_TO_ROLE = 'fk_users_roles'

export class CreateUsersRole1668987422438 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: MAIN_TABLE,
        columns: [
          { name: ROLE_ID, type: "uuid" },
          { name: USERS_ID, type: "uuid" }
        ]
      })
    )

    await queryRunner.createForeignKey(
      MAIN_TABLE,
      new TableForeignKey({
        columnNames: [ROLE_ID],
        referencedColumnNames: ["id"],
        referencedTableName: ROLE_TABLE,
        name: FK_ROLE_TO_USERS,
        onDelete: "CASCADE",
        onUpdate: "SET NULL"
      })
    )

    await queryRunner.createForeignKey(
      MAIN_TABLE,
      new TableForeignKey({
        columnNames: [USERS_ID],
        referencedColumnNames: ["id"],
        referencedTableName: USERS_TABLE,
        name: FK_USERS_TO_ROLE,
        onDelete: "CASCADE",
        onUpdate: "SET NULL"
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(MAIN_TABLE, FK_ROLE_TO_USERS)
    await queryRunner.dropForeignKey(MAIN_TABLE, FK_USERS_TO_ROLE)

    await queryRunner.dropTable(MAIN_TABLE)
  }
}
