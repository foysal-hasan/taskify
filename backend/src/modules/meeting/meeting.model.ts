import { Schema, model, Document } from 'mongoose';

interface Meeting extends Document {
  title: string;
  startsAt: Date;
  startTime: string;
  endsAt: Date;
  endTime: string;
  users: Schema.Types.ObjectId[];
  clients: Schema.Types.ObjectId[];
  user: Schema.Types.ObjectId;
}

const meetingSchema = new Schema<Meeting>({
  title: {
    type: String,
    required: true,
  },
  startsAt: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endsAt: {
    type: Date,
    required: true,
  },
  endTime: {
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

const MeetingModel = model<Meeting>('Meeting', meetingSchema);

export default MeetingModel;