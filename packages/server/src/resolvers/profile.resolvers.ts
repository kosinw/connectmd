import { Field, ObjectType } from "type-graphql";
import { UserProfile } from "../models/profile.model";

@ObjectType({ implements: UserProfile })
export class OtherProfile extends UserProfile {
  @Field((type) => String)
  speciality: string;
}
