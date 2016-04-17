import mongoose from 'mongoose';

export default mongoose.model('widget', mongoose.Schema({
	name: String,
	description: String,
	color: String,
	size: String,
	quantity: Number,
	owner: {
		id: Number,
		name: String
	}
}));
