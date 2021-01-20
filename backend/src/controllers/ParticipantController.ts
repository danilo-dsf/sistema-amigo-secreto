import { Request, Response } from 'express';
import DeleteParticipantService from 'services/DeleteParticipantService';
import FindAllParticipants from 'services/FindAllParticipantsService';
import SaveNewParticipantService from 'services/SaveNewParticipantService';
import UpdateParticipantService from 'services/UpdateParticipantService';

export default class ParticipantController {
  public async index(request: Request, response: Response): Promise<Response> {
    const findAllParticipants = new FindAllParticipants();

    const participants = await findAllParticipants.execute();

    return response.json(participants);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email, id } = request.body;

    const updateParticipant = new UpdateParticipantService();

    const participant = await updateParticipant.execute({
      name,
      email,
      id,
    });

    return response.json(participant);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteParticipant = new DeleteParticipantService();

    deleteParticipant.execute({ id });

    return response.status(200).json();
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    const saveNewParticipant = new SaveNewParticipantService;

    const participant = await saveNewParticipant.execute({ name, email });

    return response.json(participant);
  }
}