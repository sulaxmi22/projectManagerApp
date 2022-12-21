const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema(
    {
        name: {
            type: String,
            index: { unique: true },
        },
        description: String,
        repository: String,
        manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

ProjectSchema.virtual('user', {
    ref: 'User',
    localField: '_id',
    foreignField: 'project',
});


const Project = mongoose.model('Project', ProjectSchema);
module.exports = Project;
