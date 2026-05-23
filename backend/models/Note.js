const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
    id: { type: String, required: true },
    reference_value: { type: mongoose.Schema.Types.Mixed, default: null },
    seq: { type: Number, default: 499 }
}, { collection: 'counters' });

const Counter = mongoose.models.Counter || mongoose.model('Counter', counterSchema);

const noteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    ticket: {
        type: Number,
        unique: true
    }
},
{
    timestamps: true,
}
);

noteSchema.pre('save', async function() {
    const doc = this;
    if (doc.isNew && !doc.ticket) {
        const counter = await Counter.findOneAndUpdate(
            { id: 'ticketNums', reference_value: null },
            { $inc: { seq: 1 } },
            { returnDocument: 'after', upsert: true, setDefaultsOnInsert: true }
        );
        doc.ticket = counter.seq;
    }
});

module.exports = mongoose.model('Note', noteSchema);