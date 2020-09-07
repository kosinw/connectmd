import { Field, ID, InterfaceType, ObjectType } from "type-graphql";
import { AuthProviderKind } from "../types";

@InterfaceType({
  resolveType: (type) => type.kind,
})
export abstract class AuthProvider {
  @Field((type) => ID)
  readonly id: number;

  kind: AuthProviderKind;
}

@ObjectType({ implements: AuthProvider })
export class LocalAuthProvider {
  @Field((type) => String)
  email: string;
}
