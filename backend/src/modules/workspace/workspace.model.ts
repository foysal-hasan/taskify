import { Schema, model, Document } from 'mongoose';

interface Workspace extends Document {
  title: string;
  users: Schema.Types.ObjectId[];
  clients: Schema.Types.ObjectId[];
  user: Schema.Types.ObjectId;
}

const workspaceSchema = new Schema<Workspace>({
  title: {
    type: String,
    required: true,
  },
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  clients: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

const WorkspaceModel = model<Workspace>('Workspace', workspaceSchema);

export default WorkspaceModel;