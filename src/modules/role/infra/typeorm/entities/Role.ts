import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToMany,
  JoinTable
} from "typeorm"
import Permission from "../../../../permission/infra/typeorm/entities/Permission"

const PERMISSION_ROLE = 'permission_role'
const PERMISSION_ID = 'permission_id'
const ROLE_ID = 'role_id'
const ROLE = 'role'

@Entity(ROLE)
class Role {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToMany(() => Permission)
  @JoinTable({
    name: PERMISSION_ROLE,
    joinColumns: [{ name: ROLE_ID }],
    inverseJoinColumns: [{ name: PERMISSION_ID }],
    })
  permission: Permission[];
}

export { Role }
