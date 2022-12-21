const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
        firstName: String,
        lastName: String,
        position: String,
        isActive: Boolean,
        project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    }
);


const User = mongoose.model('User', UserSchema);
module.exports = User;
