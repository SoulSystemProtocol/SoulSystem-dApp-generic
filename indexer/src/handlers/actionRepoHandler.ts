import { indexer, type Action } from 'envio';

const actionIdFromActionAdded = (guid: string) => guid.toLowerCase();

indexer.onEvent(
  { contract: 'ActionRepo', event: 'ActionAdded' },
  async ({ event, context }) => {
    const id = actionIdFromActionAdded(event.params._1);
    const existing = await context.Action.get(id);

    if (existing) {
      return;
    }

    context.Action.set({
      id,
      subject: event.params._2,
      verb: event.params._3,
      object: event.params._4,
      tool: event.params._5,
      uri: undefined,
      metadata: undefined,
    });
  },
);

indexer.onEvent(
  { contract: 'ActionRepo', event: 'ActionURI' },
  async ({ event, context }) => {
    const id = event.params._0.toLowerCase();
    const existing = await context.Action.get(id);

    if (!existing) {
      return;
    }

    const updated: Action = {
      ...existing,
      uri: event.params._1,
    };

    context.Action.set(updated);
  },
);
