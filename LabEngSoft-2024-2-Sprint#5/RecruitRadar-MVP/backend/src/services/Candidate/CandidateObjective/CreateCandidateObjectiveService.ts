import { connectionSource } from "../../../config/ormconfig";
import { Candidate } from "../../../entities/Candidate";
import { CandidateObjective } from "../../../entities/CandidateObjective";

interface ICandidateObjectiveRequest {
  email: string;
  job: string;
  work_model: string;
  salary_expectation: string;
  distance_radius: number;
  professional_area: string;
}

class CreateCandidateObjectiveService {
  async execute(data: ICandidateObjectiveRequest) {

    const candidateObjectiveRepository = connectionSource.getRepository(CandidateObjective);

    if (!data) {
      throw new Error("Invalid data");
    }

    const { email, job, salary_expectation, work_model, distance_radius,professional_area } = data;

    const candidateRepository = connectionSource.getRepository(Candidate);

    const candidate = await candidateRepository.findOne({
      where: { User: { email } },
      relations: ["User"],
    });

    if (!candidate) {
      throw new Error("Candidato não encontrado");
    }

    if (distance_radius !== candidate.distance_radius) {
      await candidateRepository.update(candidate.candidate_id, {
        distance_radius: distance_radius ? distance_radius : candidate.distance_radius,
        updated_at: new Date(),
      });
    }

    const candidateObjectiveAlreadyExists = await candidateObjectiveRepository.findOne({
      where: { candidate_id: candidate.candidate_id, job },
    });

    if (candidateObjectiveAlreadyExists) {
      throw new Error("Objetivo de Candidato já existente");
    }

    const candidateObjective = candidateObjectiveRepository.create({
      candidate_id: candidate.candidate_id,
      job,
      salary_expectation,
      work_model,
      professional_area
    });

    await candidateObjectiveRepository.save(candidateObjective);

    return candidateObjective;
  }
}

export { CreateCandidateObjectiveService };