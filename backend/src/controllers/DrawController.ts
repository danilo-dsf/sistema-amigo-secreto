import { Request, Response } from 'express';
import { DrawParticipantsService } from 'services/DrawParticipantsService';
import SaveNewParticipantService from 'services/SaveNewParticipantService';

export default class DrawController {
  public async index(request: Request, response: Response): Promise<Response> {
    const drawParticipantsService = new DrawParticipantsService;

    try {
      await drawParticipantsService.execute();
  
      return response.json();
    } catch (error) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }
  }
}