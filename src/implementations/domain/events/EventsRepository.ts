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
} from "../../entities";

export interface EventsRepository
  extends
    WriteRepository<EventsModel>,
    ReadRepository<EventsModel>,
    DataTableRepository<
      DataTableRequest<keyof ListEventsResponse>,
      DataTableResponse<ListEventsResponse>
    > {}
