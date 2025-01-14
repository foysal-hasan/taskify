import { Schema, model, Document, Types } from 'mongoose';

interface ITodo extends Document {
  title: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  description?: string;
  user: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const TodoSchema = new Schema<ITodo>(
  {
    title: { type: String, required: true },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
    completed: { type: Boolean, default: false },
    description: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const Todo = model<ITodo>('Todo', TodoSchema);

export default Todo;