import { Model } from "objection";
import { AuthProviderKind } from "../types";
import * as argon2 from "argon2";

export class AuthProviderModel extends Model {
  id!: number;
  kind!: AuthProviderKind;
  email?: string;
  password?: string;
  identity_id!: number;

  static tableName = "users.auth_provider";

  async $beforeInsert(): Promise<void> {
    if (this.kind === AuthProviderKind.LocalAuthProvider) {
      this.password! = await argon2.hash(this.password!);
    }
  }

  async verifyPassword(password: string): Promise<boolean> {
    if (this.kind === AuthProviderKind.LocalAuthProvider) {
      return await argon2.verify(this.password!, password);
    }

    return false;
  }
}
