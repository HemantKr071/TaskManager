
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title:{
     type: String,
    required: true
  },
  description:{
     type: String,
    required: true
  },
  
  status: {
    type: String,
    enum: ['todo', 'in-progress', 'done'],
    default: 'todo'
  },
  
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  
  dueDate: Date,
  email:String,
  documents: [String],
  
}, {
  timestamps: true
});

const Task = mongoose.model('Task', taskSchema);

export default Task
