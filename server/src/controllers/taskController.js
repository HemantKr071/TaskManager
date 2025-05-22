import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate,email} = req.body;
    const documents = req.files?.map(file => file.path) || [];

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      documents,
      email
    });

    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error.message);
    res.status(500).json({ error: 'Failed to create task' });
  }
};

export const getTasks = async (req, res) => {
  const email = req.query.email;
  try {
    const tasks = await Task.find({email});
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error.message);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

export const getTaskById = async (req, res) => {
  
  try {
    const task = await Task.findById(req.params.id).lean();
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    // Converting int Document URLS => 
    const documentURLs = task.documents.map(filename =>
      `${req.protocol}://${req.get('host')}/uploads/${filename}`
    );

    task.documents = documentURLs;

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching task', message: err.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const updates = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      priority: req.body.priority,
      dueDate: req.body.dueDate,
      email: req.body.email,
    };
    const task = await Task.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true
    });

    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (error) {
    console.error('Error updating task:', error.message);
    res.status(500).json({ error: 'Failed to update task' });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    res.sendStatus(204);
  } catch (error) {
    console.error('Error deleting task:', error.message);
    res.status(500).json({ error: 'Failed to delete task' });
  }
};

