import { ReadRepository, WriteRepository } from "../../../abstractions";
import { GolonganModel } from "../../entities";

export interface GolonganRepository
  extends WriteRepository<GolonganModel>, ReadRepository<GolonganModel> {}
