import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  universityId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  role: {
    type: String,
    enum: ["Student", "Advisor", "Instructor"],
    default: "Student"
  },
  department: {
    type: String,
    default: ""
  },
  password: {
    type: String,
    required: true
  },
  assignedAdvisor: {
    type: String,
    default: "Alaa Mohammed"
  },
  courses: {
    type: Array,
    default: [
      {
        course: "CS302",
        attendance: "90%",
        grade: "A",
        status: "On Track",
        plan: "Continue current study plan"
      },
      {
        course: "CS309",
        attendance: "85%",
        grade: "B+",
        status: "On Track",
        plan: "Seek additional help and resources"
      }
    ]
  },
  advisingReviews: {
    type: Array,
    default: [
      {
        date: "2024-01-15",
        advisor: "Alaa Mohammed",
        summary: "Focus on improving understanding of the material and seek help when needed."
      }
    ]
  }
});

export default mongoose.model("User", userSchema);
