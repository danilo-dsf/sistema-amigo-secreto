import Participant from "model/Participant";
import { getRepository } from "typeorm";

interface IRequest {
  name: string;
  email: string;
}

class SaveNewParticipantService {
  async execute({ name, email }: IRequest): Promise<Participant> {
    const participantsRepository = getRepository(Participant);

    const checkParticipantExists = await participantsRepository.findOne({
      where: { email },
    });

    if (checkParticipantExists) {
      throw new Error('This participant already exists.');
    }

    const participant = participantsRepository.create({ name, email });

    await participantsRepository.save(participant);

    return participant;
  }
}

export default SaveNewParticipantService;