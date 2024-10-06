/*import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";
  import { v4 as uuid } from "uuid";
  
  @Entity("deliveries")
  class Delivery {
    @PrimaryColumn()
    readonly id!: string ;
  
    @Column()
      idsales!: string;

    @Column()
    dt_entrega!: Date;

    @Column()
    obs!: string;

    @CreateDateColumn()
      created_at!: Date;
  
    @UpdateDateColumn()
      updated_at!: Date;
  
    constructor() {
      if (!this.id) {
        this.id = uuid();
      }
    }
  }
  
  export { Delivery };*/