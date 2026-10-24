import { AthletesModel } from "../../entities/athletes";
import { AllAthletesResponse } from "../../entities/athletes/schema/allAthletesSchema";
import {
  InfoAthletesRequest,
  InfoAthletesResponse,
} from "../../entities/athletes/schema/infoAthletesSchema";
import {
  ListAthletesResponse,
  listAthletesResponseSchema,
} from "../../entities/athletes/schema/listAthletesSchema";
import {
  DataTableRequest,
  DataTableResponse,
} from "../datatable/DataTableDomain";

export interface AthletesRepository {
  infoAthletes(payload: InfoAthletesRequest): Promise<InfoAthletesResponse>;
  listAthletes(
    payload: DataTableRequest<typeof listAthletesResponseSchema>,
  ): Promise<DataTableResponse<ListAthletesResponse>>;
  allAthletes(): Promise<AllAthletesResponse[]>;
  createAthletes?(payload: AthletesModel): Promise<AthletesModel>;
  updateAthletes?(payload: AthletesModel): Promise<AthletesModel>;
  deleteAthletes?(id: string): Promise<boolean>;
}
