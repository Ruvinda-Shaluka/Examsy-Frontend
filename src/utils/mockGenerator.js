/**
 * Simulates an AI-generated question set based on student input.
 * @param {string} topic - The subject entered by the student.
 * @param {number} count - Number of questions requested (1-20).
 * @param {string} difficulty - 'beginner' | 'intermediate' | 'advanced'.
 * @returns {Array} Array of question objects.
 */
export const generateMockExamData = (topic, count, difficulty) => {
    const difficultyPrefix = {
        beginner: "Fundamentals of ",
        intermediate: "Applied Concepts in ",
        advanced: "Complex Analysis of "
    };

    return Array.from({ length: count }, (_, i) => {
        const correctIndex = Math.floor(Math.random() * 4);

        return {
            id: `mock-${Date.now()}-${i}`,
            q: `${difficultyPrefix[difficulty]}${topic}: Which of the following represents a critical standard or theoretical framework often utilized in this field?`,
            options: [
                `Standard implementation of ${topic} protocols.`,
                `Theoretical limitation within ${topic} frameworks.`,
                `Advanced optimization for ${topic} workflows.`,
                `Generalized industry baseline for ${topic}.`
            ],
            correct: correctIndex,
            explanation: `This simulated explanation confirms that ${topic} is critical for ensuring high-performance output in ${difficulty} level environments.`
        };
    });
};