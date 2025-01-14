import { Schema, model, Document } from 'mongoose';
import { Role } from '../user/user.model';

interface Status extends Document {
    title: string;
    color: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark';
    whoCanChange: Role[];
    user: Schema.Types.ObjectId;
}

const statusSchema = new Schema<Status>({
    title: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
        enum: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark'],
    },
    whoCanChange: {
        type: [String],
        enum: Object.values(Role),
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true
});

const StatusModel = model<Status>('Status', statusSchema);

export default StatusModel;