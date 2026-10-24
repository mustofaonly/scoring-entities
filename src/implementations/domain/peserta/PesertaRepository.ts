import {
  DataTableRepository,
  DataTableRequest,
  DataTableResponse,
  ReadRepository,
  WriteRepository,
} from "../../../abstractions";
import { ListPesertaResponse, PesertaModel } from "../../entities";

export interface PesertaRepository
  extends
    ReadRepository<PesertaModel, string>,
    WriteRepository<PesertaModel, string>,
    DataTableRepository<
      DataTableRequest<string>,
      DataTableResponse<ListPesertaResponse>
    > {}
