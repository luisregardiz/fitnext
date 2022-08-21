interface Exercise {
    bodyPart: string;
    equipment: string;
    gifUrl: string;
    id: string;
    name: string;
    target: string;
}

interface ExerciseData extends Exercise {
    currentPage: string | number;
    perPage: string | number;
    totalCount: string | number;
    pageCount: string | number;
    start: string | number;
    end: string | number;
    exercises: Exercise[];
}

interface Weight {
    weight: number;
    date: string;
    id?: string;

    createdAt?: string;
    updatedAt?: string;
}

type WeightInputs = {
    weight: string;
    date: string;
};

interface WeightStats extends Weight {
    name: string;
}
