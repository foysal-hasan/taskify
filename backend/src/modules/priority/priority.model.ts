import { Schema, model, Document } from 'mongoose';

interface Priority extends Document {
    title: string;
    color: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark';
    user: Schema.Types.ObjectId;
}

const prioritySchema = new Schema<Priority>({
    title: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
        enum: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark'],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true
});

const PriorityModel = model<Priority>('Priority', prioritySchema);

export default PriorityModel;