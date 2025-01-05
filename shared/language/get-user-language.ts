import type { UserDbType } from "../../functions/db/user/upsert-user-db";
import { LanguageShared } from "./language-shared.ts";

export const getUserLanguage = (user: UserDbType): LanguageShared => {
  return user.force_language_code || user.language_code || "en" as any;
}
