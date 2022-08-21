export const getBMI = (weight: string, height: string) => {
    const parseHeight = Number(height) / 100;
    const parseWeight = Number(weight);
    const result = parseWeight / (parseHeight * parseHeight);
    return Number(result.toFixed(2));
};

export const bmiIndicator = (bmi: number) => {
    if (bmi < 18.5) {
        return 'Underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
        return 'Normal';
    } else if (bmi >= 25 && bmi < 30) {
        return 'Overweight';
    } else {
        return 'Obese';
    }
};
