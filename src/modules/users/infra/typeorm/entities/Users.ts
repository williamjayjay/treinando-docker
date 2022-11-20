import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn
} from "typeorm"

@Entity("users")
class Users {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;
}

export { Users }
