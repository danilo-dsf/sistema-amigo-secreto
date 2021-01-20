import { Request, Response } from 'express';
import { DrawParticipantsService } from 'services/DrawParticipantsService';
import SaveNewParticipantService from 'services/SaveNewParticipantService';

export default class DrawController {
  public async index(request: Request, response: Response): Promise<Response> {
    const drawParticipantsService = new DrawParticipantsService;

    await drawParticipantsService.execute();

    return response.json();
  }
}