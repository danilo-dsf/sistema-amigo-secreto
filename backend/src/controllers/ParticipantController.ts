import { Request, Response } from 'express';
import DeleteParticipantService from 'services/DeleteParticipantService';
import FindAllParticipants from 'services/FindAllParticipantsService';
import SaveNewParticipantService from 'services/SaveNewParticipantService';
import UpdateParticipantService from 'services/UpdateParticipantService';

export default class ParticipantController {
  public async index(request: Request, response: Response): Promise<Response> {
    const findAllParticipants = new FindAllParticipants();

    try {
      const participants = await findAllParticipants.execute();

      return response.json(participants);
    } catch (error) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const { id } = request.params;

    const updateParticipant = new UpdateParticipantService();

    try {
      const participant = await updateParticipant.execute({
        name,
        email,
        id,
      });

      return response.json(participant);
    } catch (error) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteParticipant = new DeleteParticipantService();

    try {
      deleteParticipant.execute({ id });

      return response.status(200).json();
    } catch (error) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    const saveNewParticipant = new SaveNewParticipantService();

    try {
      const participant = await saveNewParticipant.execute({ name, email });

      return response.json(participant);
    } catch (error) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }
  }
}