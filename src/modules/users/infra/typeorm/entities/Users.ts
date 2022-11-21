import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  JoinTable,
  ManyToMany
} from "typeorm"
import { Role } from "../../../../role/infra/typeorm/entities/Role"

const USERS_ROLE = 'users_role'
const USERS = 'users'
const ROLE_ID = 'role_id'
const USERS_ID = 'users_id'

@Entity(USERS)
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

  @ManyToMany(() => Role)
  @JoinTable({
    name: USERS_ROLE,
    joinColumns: [{ name: USERS_ID }],
    inverseJoinColumns: [{ name: ROLE_ID }],
    })
  role: Role[];
}

export { Users }
