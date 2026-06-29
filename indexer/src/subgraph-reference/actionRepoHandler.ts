import { Action } from "../../generated/schema";
import { ActionAdded, ActionURI } from "../../generated/ActionRepo/ActionRepo";
import { safeIpfsCat } from "../ipfs";

/**
 * Handle a action added event to create an action entity.
 */
export function handleActionAdded(event: ActionAdded): void {
  // Skip if entity exists
  if (Action.load(event.params.guid.toHexString())) return;
  // Create entity
  let entity = new Action(event.params.guid.toHexString());
  entity.subject = event.params.subject;
  entity.verb = event.params.verb;
  entity.object = event.params.object;
  entity.tool = event.params.tool;
  entity.save();
}

/**
 * Handle a action uri event to update an action entity.
 */
export function handleActionURI(event: ActionURI): void {
  // Find entity and return if not found
  const entity = Action.load(event.params.guid.toHexString());
  if (!entity) return;
  // Load uri data
  const metadata = safeIpfsCat(event.params.uri, "ActionRepo.handleActionURI");
  // Update entity's params
  entity.uri = event.params.uri;
  entity.metadata = metadata;
  entity.save();
}
