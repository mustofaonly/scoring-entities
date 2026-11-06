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
} from "../../entities";

export interface AthletesRepository
  extends
    WriteRepository<AthletesModel, string>,
    ReadRepository<AthletesModel, string>,
    DataTableRepository<
      DataTableRequest<keyof ListAthletesResponse>,
      DataTableResponse<ListAthletesResponse>
    > {}
