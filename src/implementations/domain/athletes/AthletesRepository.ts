import {
  DataTableRepository,
  DataTableRequest,
  DataTableResponse,
  ReadRepository,
  WriteRepository,
} from "../../../abstractions";
import {
  AthletesModel,
  ListAthletesResponse,
  listAthletesResponseSchema,
} from "../../entities";

export interface AthletesRepository
  extends
    WriteRepository<AthletesModel, string>,
    ReadRepository<AthletesModel, string>,
    DataTableRepository<
      DataTableRequest<typeof listAthletesResponseSchema>,
      DataTableResponse<ListAthletesResponse>
    > {}
