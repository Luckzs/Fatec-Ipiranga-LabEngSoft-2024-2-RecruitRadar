import { connectionSource } from "../../../config/ormconfig";
import { Candidate } from "../../../entities/Candidate";
import { CandidateObjective } from "../../../entities/CandidateObjective";

interface ICandidateObjectiveRequest {
    candidate_objective_id: string;
    job: string;
    salary_expectation: string;
    work_model: string;
    professional_area: string;
    distance_radius: number;
}

class UpdateCandidateObjectiveService {
    async execute(objectives: ICandidateObjectiveRequest) {

        const candidateObjectiveRepository = connectionSource.getRepository(CandidateObjective);

        const { candidate_objective_id, job, salary_expectation, work_model, distance_radius,professional_area } = objectives;

        if (!candidate_objective_id) {
            throw new Error("Invalid data");
        }

        const candidateObjectiveAlreadyExists = await candidateObjectiveRepository.findOne({
            where: { candidate_objective_id },
            relations: ["Candidate"]
        });

        console.log(candidateObjectiveAlreadyExists);

        if (!candidateObjectiveAlreadyExists) {
            throw new Error("Objetivo de Candidato não existe");
        };

        candidateObjectiveAlreadyExists.job = job ? job : candidateObjectiveAlreadyExists.job;
        candidateObjectiveAlreadyExists.salary_expectation = salary_expectation ? salary_expectation : candidateObjectiveAlreadyExists.salary_expectation;
        candidateObjectiveAlreadyExists.work_model = work_model ? work_model : candidateObjectiveAlreadyExists.work_model;
        candidateObjectiveAlreadyExists.professional_area = professional_area ? professional_area : candidateObjectiveAlreadyExists.professional_area;
        candidateObjectiveAlreadyExists.updated_at = new Date();

        candidateObjectiveAlreadyExists.Candidate.distance_radius = distance_radius;
        await connectionSource.transaction(async (transactionalEntityManager) => {
            await transactionalEntityManager.save(candidateObjectiveAlreadyExists.Candidate);
        });

        return await candidateObjectiveRepository.update(candidate_objective_id, candidateObjectiveAlreadyExists)
            .then(f => {
                console.log(f);
                var messageUpdate = {
                    message: "Registro atualizado com sucesso"
                }

                return messageUpdate;
            }, err => {
                throw new Error("Erro na atualização");
            }
            );
    }
}

export { UpdateCandidateObjectiveService };
