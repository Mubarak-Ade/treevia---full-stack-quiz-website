import { QuizFormData, QuizSchema } from "@/schema/quiz.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

export const useQuizForm = () => {
    const methods = useForm<QuizFormData>({resolver: zodResolver(QuizSchema)})
    return methods
}