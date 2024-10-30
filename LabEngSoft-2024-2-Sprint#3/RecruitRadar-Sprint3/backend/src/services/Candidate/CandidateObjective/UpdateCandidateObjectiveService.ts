import { connectionSource } from "../../../config/ormconfig";
import { Candidate } from "../../../entities/Candidate";
import { CandidateObjective } from "../../../entities/CandidateObjective";

interface ICandidateObjectiveRequest {
    candidate_objective_id: string;
    job: string;
    salary_expectation: string;
    work_model: string;
    distance_radius: number;
}

class UpdateCandidateObjectiveService {
    async execute(objectives: ICandidateObjectiveRequest) {

        const candidateObjectiveRepository = connectionSource.getRepository(CandidateObjective);

        const { candidate_objective_id, job, salary_expectation, work_model, distance_radius } = objectives;

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
        candidateObjectiveAlreadyExists.Candidate.distance_radius = distance_radius ? distance_radius : candidateObjectiveAlreadyExists.Candidate.distance_radius;
        candidateObjectiveAlreadyExists.updated_at = new Date();

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