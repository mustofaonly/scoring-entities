import { ReadRepository, WriteRepository } from "../../../abstractions";
import { KategoriModel } from "../../entities";

export interface KategoriRepository
  extends
    ReadRepository<KategoriModel, string>,
    WriteRepository<KategoriModel, string> {}
