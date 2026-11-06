import { ReadRepository, WriteRepository } from "../../../abstractions";
import { ParticipantTeamModel } from "../../entities";

export interface ParticipantTeamRepository
  extends ReadRepository<ParticipantTeamModel, string>, WriteRepository<ParticipantTeamModel, string> {}
