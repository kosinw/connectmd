import cuid from "cuid";
import { Model } from "objection";
import { Field, ID } from "type-graphql";

export class BaseModel extends Model {
  @Field((type) => ID)
  id: string;

  $beforeInsert() {
    this.id = cuid();
  }
}
