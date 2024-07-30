import { type PlansForUser } from "../../functions/db/plan/get-active-plans-for-user.ts";
import { type UserDbType } from "../../functions/db/user/upsert-user-db";
import { type DeckOrFolderDbType } from "../../functions/db/plan/can-duplicate-deck-or-folder-db.ts";

export const canDuplicateDeckOrFolder = (
  user: UserDbType,
  deckOrFolder: DeckOrFolderDbType,
  plans?: PlansForUser,
) => {
  if (user.is_admin) {
    return true;
  }
  if (!plans?.some((plan) => plan.advanced_duplicate)) {
    return;
  }

  const isPublic = deckOrFolder.is_public;
  const isUserAuthor = user.id === deckOrFolder.author_id;
  return isUserAuthor || isPublic;
};
