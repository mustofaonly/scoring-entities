import { ReadRepository, WriteRepository } from "../../../abstractions";
import { KelasModel } from "../../entities";

export interface KelasRepository
  extends
    ReadRepository<KelasModel, string>,
    WriteRepository<KelasModel, string> {}
