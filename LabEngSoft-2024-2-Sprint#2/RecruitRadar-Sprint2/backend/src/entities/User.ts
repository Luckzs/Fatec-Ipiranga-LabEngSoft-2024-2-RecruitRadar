import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
    JoinColumn,
    ManyToOne,
  } from "typeorm";
  import { v4 as uuid } from "uuid";
  import { Userstatus } from "./UserStatus";
  
  @Entity("users")
  class User {
    @PrimaryColumn()
      readonly user_id!: string ;
  
    @Column()
      email!: string;

    @Column()
      password!: string;
  
    //Provavelmente será retirado
    @Column()
      name!: string;
    
    @Column()
      admin!: boolean;
      
    @DeleteDateColumn()
      deleted_at!: Date;
    //

    @Column({ nullable: true })
      activated_at!: Date;

    @CreateDateColumn()
      created_at!: Date;
  
    @UpdateDateColumn()
      updated_at!: Date;

    @Column()
      user_status_id!: string;

    @Column({ nullable: true })
      passwordResetToken!: string;

    @Column({ nullable: true })
      passwordResetExpires!: Date;

    @ManyToOne(() => Userstatus)
    @JoinColumn({name: "user_status_id"})
    Userstatus!: Userstatus;
    
    constructor() {
      if (!this.user_id) {
        this.user_id = uuid();
      }
    }
  }
  
  export { User };