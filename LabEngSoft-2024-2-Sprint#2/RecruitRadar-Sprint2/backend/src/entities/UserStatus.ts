import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
  } from "typeorm";
  import { v4 as uuid } from "uuid";
  
  @Entity("user_statuses")
  class Userstatus {
    @PrimaryColumn()
      readonly user_status_id!: string ;

    @Column()
      name!: string;

    @DeleteDateColumn()
      deleted_at!: Date;
    //

    @CreateDateColumn()
      created_at!: Date;
  
    @UpdateDateColumn()
      updated_at!: Date;

    constructor() {
      if (!this.user_status_id) {
        this.user_status_id = uuid();
      }
    }
  }
  
  export { Userstatus };