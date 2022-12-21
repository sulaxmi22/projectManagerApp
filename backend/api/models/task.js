const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema(
    {
        timeline: {
            assigned: Date,
            due: Date,
            updated: { 
                type: Date, 
                default: Date.now()
            }
        },
        name: String,
        details: String,
        priority: { type: String, enum: ['low', 'medium', 'high'] },
        status: {
            type: String,
            enum: ['assigned', 'in-progress', 'in-review', 'completed']
        },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

TaskSchema.virtual('project', {
    ref: 'Project',
    localField: '_id',
    foreignField: 'tasks',
});


const Task = mongoose.model('Task', TaskSchema)
module.exports = Task;
