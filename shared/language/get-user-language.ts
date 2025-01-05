import type { UserDbType } from "../../functions/db/user/upsert-user-db";

export const getUserLanguage = (user: UserDbType) => {
  return user.force_language_code || user.language_code || "en";
}
