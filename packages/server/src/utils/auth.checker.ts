import { AuthChecker } from "type-graphql";
import { UserIdentity } from "../models/user.models";
import { ContextType } from "../types";

export const authChecker: AuthChecker<ContextType> = async (
  { context: { req } },
  roles
) => {
  if (!!req.session.userId) {
    const query = UserIdentity.query().findById(req.session.userId);

    for (let i = 0; i < roles.length; ++i) {
      query.orWhere("role", ">=", roles[i]);
    }

    return !!(await query);
  }

  return false;
};
