import { ReadRepository, WriteRepository } from "../../../abstractions";
import { PesertaTeamModel } from "../../entities";

export interface PesertaTeamRepository
  extends ReadRepository<PesertaTeamModel, string>, WriteRepository<PesertaTeamModel, string> {}
