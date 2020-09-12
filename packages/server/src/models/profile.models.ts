import {
  Field,
  InputType,
  InterfaceType,
  ObjectType,
  registerEnumType,
} from "type-graphql";
import { FieldError, ProfileKind, StudentProfileEducation } from "../types";

registerEnumType(ProfileKind, { name: "ProfileKind" });
registerEnumType(StudentProfileEducation, { name: "StudentProfileEducation" });

@InterfaceType({
  resolveType: (value: UserProfile) => value.kind as string,
})
export class UserProfile {
  @Field((type) => String, { nullable: true })
  firstName?: string;

  @Field((type) => String, { nullable: true })
  lastName?: string;

  @Field((type) => String, { nullable: true })
  profileUri?: string;

  kind: ProfileKind;

  speciality?: string;

  education?: StudentProfileEducation;
  schoolName?: string;
}

@ObjectType({ implements: UserProfile })
export class OtherProfile extends UserProfile {
  @Field((type) => String)
  speciality: string;
}

@ObjectType({ implements: UserProfile })
export class StudentProfile extends UserProfile {
  @Field((type) => StudentProfileEducation)
  education: StudentProfileEducation;

  @Field((type) => String)
  schoolName: string;
}

@InputType()
export class EditProfileInput implements Partial<UserProfile> {
  @Field((type) => ProfileKind)
  kind: ProfileKind;

  @Field((type) => String, { nullable: true })
  firstName?: string;

  @Field((type) => String, { nullable: true })
  lastName?: string;

  @Field((type) => String, { nullable: true })
  profileUri?: string;

  @Field((type) => String, { nullable: true })
  speciality?: string;

  @Field((type) => StudentProfileEducation, { nullable: true })
  education?: StudentProfileEducation;

  @Field((type) => String, { nullable: true })
  schoolName?: string;
}

@ObjectType()
export class EditProfileResponse {
  @Field((type) => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field((type) => UserProfile, { nullable: true })
  profile?: UserProfile;
}
