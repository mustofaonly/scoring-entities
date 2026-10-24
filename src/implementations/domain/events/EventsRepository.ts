import {
  DataTableRepository,
  DataTableRequest,
  DataTableResponse,
  ReadRepository,
  WriteRepository,
} from "../../../abstractions";
import {
  EventsModel,
  ListEventsResponse,
  listEventsResponseSchema,
} from "../../entities";

export interface EventsRepository
  extends
    WriteRepository<EventsModel>,
    ReadRepository<EventsModel>,
    DataTableRepository<
      DataTableRequest<typeof listEventsResponseSchema>,
      DataTableResponse<ListEventsResponse>
    > {}
