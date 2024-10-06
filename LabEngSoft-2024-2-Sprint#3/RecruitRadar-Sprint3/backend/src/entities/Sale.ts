/*(import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";
  import { v4 as uuid } from "uuid";
  
  @Entity("sales")
  class Sale {
    @PrimaryColumn()
    readonly id!: string ;
  
    @Column()
      productid!: string;
  
    @Column()
      userid!: string;
  
    @Column()
      total!: string;
  
    @Column()
    obs!: string;

    @Column()
      desc!: string;
  
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
  
  export { Sale };*/