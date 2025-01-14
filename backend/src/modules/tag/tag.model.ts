import { Schema, model, Document } from 'mongoose';

interface Tag extends Document {
    title: string;
    color: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark';
    user: Schema.Types.ObjectId;
}

const tagSchema = new Schema<Tag>({
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

const TagModel = model<Tag>('Tag', tagSchema);

export default TagModel;