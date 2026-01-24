import { StepConfig } from "../types/types";

export const ONBOARD_STEPS: StepConfig[] = [
  {
    key: "goal",
    question: "What is your primary goal right now?",
    options: [
      {
        id: "goal-learn",
        value: "learn-scratch",
        title: "Learn from scratch",
        description: "Start your journey with foundational concepts",
      },
      {
        id: "goal-improve",
        value: "improve-skills",
        title: "Improve existing skills",
        description: "Build upon your current knowledge",
      },
      {
        id: "goal-exam",
        value: "exam-prep",
        title: "Prepare for an exam/interview",
        description: "Get ready for assessments or interviews",
      },
      {
        id: "goal-apply",
        value: "real-projects",
        title: "Apply knowledge in real projects",
        description: "Put theory into practice with hands-on work",
      },
    ],
  },
  {
    key: "level",
    question: "How would you rate your current level in this subject?",
    options: [
      {
        id: "level-beginner",
        value: "beginner",
        title: "Beginner",
        description: "Just starting out with the basics",
      },
      {
        id: "level-intermediate",
        value: "intermediate",
        title: "Intermediate",
        description: "Comfortable with core concepts",
      },
      {
        id: "level-advanced",
        value: "advanced",
        title: "Advanced",
        description: "Experienced and looking to master the subject",
      },
    ],
  },
  {
    key: "learningPreference",
    question: "How do you prefer to learn?",
    options: [
      {
        id: "pref-step",
        value: "step-by-step",
        title: "Step-by-step explanations",
        description: "Detailed guidance through each concept",
      },
      {
        id: "pref-examples",
        value: "examples-cases",
        title: "Examples and case studies",
        description: "Learn through real-world scenarios",
      },
      {
        id: "pref-practice",
        value: "practice-quizzes",
        title: "Practice and quizzes",
        description: "Learn by doing and testing yourself",
      },
      {
        id: "pref-mix",
        value: "mix-all",
        title: "A mix of everything",
        description: "Combine all learning methods",
      },
    ],
  },
  {
    key: "constraints",
    question: "Do you have any constraints we should consider?",
    options: [
      {
        id: "constraint-fundamentals",
        value: "struggle-fundamentals",
        title: "Struggle with fundamentals",
        description: "Need extra help with basic concepts",
      },
      {
        id: "constraint-examples",
        value: "need-examples",
        title: "Need real-world examples",
        description: "Practical applications are important",
      },
      {
        id: "constraint-theory",
        value: "minimal-theory",
        title: "Prefer minimal theory",
        description: "Focus on practical skills over theory",
      },
      {
        id: "constraint-none",
        value: "no-constraints",
        title: "No constraints",
        description: "Ready to learn in any format",
      },
    ],
  },
]