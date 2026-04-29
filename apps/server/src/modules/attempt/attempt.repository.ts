import Attempt from "../../models/Attempts.js";

export const AttemptRepository = {
    findAll: (payload: any) => Attempt.find(payload),
    findOne: (payload: any) => Attempt.findOne(payload),
    create: (payload: any) => Attempt.create(payload),
}