import mongoose from "mongoose";

export const matchStage = ( userId: string ) => ( {
    $match: {
        user: new mongoose.Types.ObjectId( userId )
    }
} )

export const calcuteTotalQuestion = {
    $addFields: {
        totalQuestion: {
            $add: [ "$totalCorrect", "$totalFailed" ]
        }

    }
}
export const calculateAccuracy = {
    $addFields: {
        accuracy: {
            $cond: [
                { $eq: [ "$totalQuestion", 0 ] },
                0,
                {
                    $multiply: [
                        { $divide: [ "$totalCorrect", "$totalQuestion" ] },
                        100
                    ]
                }
            ]
        }
    }
}