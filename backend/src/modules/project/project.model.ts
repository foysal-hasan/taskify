import { Schema, model, Document } from 'mongoose';

enum TaskAccessibility {
  ASSIGNED_USERS = 'assigned_users',
  PROJECT_USERS = 'project_users',
}

interface Project extends Document {
  title: string;
  status: Schema.Types.ObjectId;
  priority: Schema.Types.ObjectId;
  budget: number;
  startsAt: Date;
  endsAt: Date;
  taskAccessibility: TaskAccessibility;
  clientCanDiscuss: boolean;
  users: Schema.Types.ObjectId[];
  clients: Schema.Types.ObjectId[];
  tags: string[];
  description: string;
  note: string;
  user: Schema.Types.ObjectId;
}

const projectSchema = new Schema<Project>({
  title: {
    type: String,
    required: true,
  },
  status: {
    type: Schema.Types.ObjectId,
    ref: 'Status',
    required: true,
  },
  priority: {
    type: Schema.Types.ObjectId,
    ref: 'Priority'
  },
  budget: {
    type: Number,
  },
  startsAt: {
    type: Date,
  },
  endsAt: {
    type: Date,
  },
  taskAccessibility: {
    type: String,
    enum: Object.values(TaskAccessibility),
    default: TaskAccessibility.ASSIGNED_USERS,
  },
  clientCanDiscuss: {
    type: Boolean,
    default: false,
  },
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  clients: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  tags: [{
    type: String,
  }],
  description: {
    type: String,
  },
  note: {
    type: String,
  },
  user: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }
}, {
    timestamps: true
});

const ProjectModel = model<Project>('Project', projectSchema);

export default ProjectModel;