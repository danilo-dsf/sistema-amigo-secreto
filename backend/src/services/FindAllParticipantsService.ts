import Participant from "model/Participant";
import { getRepository } from "typeorm";

class FindAllParticipants {
  async execute(): Promise<Participant[]> {
    const participantsRepository = getRepository(Participant);

    const participants = participantsRepository.find();

    return participants;
  }
}

export default FindAllParticipants;