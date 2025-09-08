// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript",
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50,
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150,
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500,
    },
  ],
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47,
    },
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150,
    },
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400,
    },
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39,
    },
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140,
    },
  },
];

function getLearnerData(courseInfo, assignmentGroup, learnerSubmissions) {
  try {
    // Validate that assignment group belongs to the course
    if (assignmentGroup.course_id !== courseInfo.id) {
      throw new Error(
        "The assignment group does not belong to the given course."
      );
    }

    const resultsByLearnerId = {};
    const currentDate = new Date();

    // Create a map for assignments by assignment id and raising an error for invalid data
    const assignmentMapById = {};
    for (const assignment of assignmentGroup.assignments) {
      if (
        typeof assignment.points_possible !== "number" ||
        assignment.points_possible < 0
      ) {
        throw new Error(
          `Invalid points possible for assignment with ID ${assignment.id}`
        );
      }
      assignmentMapById[assignment.id] = assignment;
    }

    console.log(resultsByLearnerId);
    console.log(currentDate);
    // loop through submissions and check
    // Process each learner submission
    for (const learnerSubmission of learnerSubmissions) {
      const learnerId = learnerSubmission.learner_id;
      const assignmentForSubmission =
        assignmentMapById[learnerSubmission.assignment_id];

      if (assignmentForSubmission) {
        // check if assignment exists
        const assignmentDueDate = new Date(assignmentForSubmission.due_at);
        const submissionDate = new Date(
          learnerSubmission.submission.submitted_at
        );
        let scoreEarned = learnerSubmission.submission.score;
        const pointsPossible = assignmentForSubmission.points_possible;

        // Only process assignments that are due and have valid points
        if (assignmentDueDate <= currentDate && pointsPossible > 0) {
          // student get deducted 10% of points if submision pass due date
          switch (true) {
            case assignmentDueDate > currentDate:
              break;
            case pointsPossible <= 0:
              break;
            default:
              break;
          }

          const scorePercentage = scoreEarned / pointsPossible;

          // Initialize the learner object if it doesn't exist yet
          if (resultsByLearnerId[learnerId] === undefined) {
            resultsByLearnerId[learnerId] = {
              id: learnerId,
              totalScore: 0,
              totalPointsPossible: 0,
            };
          }

          // Store individual assignment percentage
          resultsByLearnerId[learnerId][assignmentForSubmission.id] = Number(
            scorePercentage.toFixed(3)
          );
          resultsByLearnerId[learnerId].totalScore += scoreEarned;
          resultsByLearnerId[learnerId].totalPointsPossible += pointsPossible;
        }
      }
    }

    // Convert results object to an array and calculate weighted averages
    const learnersDataArray = Object.values(resultsByLearnerId).map(
      (learner) => {
        const averageScore =
          learner.totalPointsPossible > 0 ? learner.totalScore / learner.totalPointsPossible : 0;
        const {
          id,
          totalScore,
          totalPointsPossible,
          ...assignmentPercentages
        } = learner;

        return {
          id: id,
          avg: Number(averageScore.toFixed(3)),
          ...assignmentPercentages,
        };
      }
    );

    return learnersDataArray;
  } catch (error) {
    console.error("Error processing learner data:", error.message);
    return [];
  }
}

// Call the function with full descriptive variable names
const learnerResults = getLearnerData(
  CourseInfo,
  AssignmentGroup,
  LearnerSubmissions
);
console.log(learnerResults);
