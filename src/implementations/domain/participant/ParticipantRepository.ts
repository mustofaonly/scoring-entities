import {
  DataTableRepository,
  DataTableRequest,
  DataTableResponse,
  ReadRepository,
  WriteRepository,
} from "../../../abstractions";
import { ListParticipantResponse, ParticipantModel } from "../../entities";

export interface ParticipantRepository
  extends
    ReadRepository<ParticipantModel, string>,
    WriteRepository<ParticipantModel, string>,
    DataTableRepository<
      DataTableRequest<keyof ListParticipantResponse>,
      DataTableResponse<ListParticipantResponse>
    > {}
