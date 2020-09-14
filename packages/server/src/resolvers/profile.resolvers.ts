import { Arg, Authorized, Mutation, Resolver } from "type-graphql";
import {
  EditProfileInput,
  EditProfileResponse,
} from "../models/profile.models";

@Resolver()
export class ProfileResolver {
  @Authorized()
  @Mutation((type) => EditProfileResponse)
  async editProfile(
    @Arg("input") input: EditProfileInput
  ): Promise<EditProfileResponse> {
    console.dir(input);
    return {
      profile: input,
    };
  }
}
