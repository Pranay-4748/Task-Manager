import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, IconButton, CssBaseline, Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Checkbox, MenuItem, Select } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, editTask, deleteTask, toggleTaskCompletion, filterTasks } from './taskSlice';

const drawerWidth = 240;

const SidebarAndNavbar = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.filteredTasks);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentTask, setCurrentTask] = useState({ title: '', description: '', dueDate: '', completed: false });
  const [editIndex, setEditIndex] = useState(null);
  const [filter, setFilter] = useState('All');

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentTask({ title: '', description: '', dueDate: '', completed: false });
    setEditIndex(null);
  };

  const handleSaveTask = () => {
    if (editIndex !== null) {
      dispatch(editTask({ index: editIndex, task: currentTask }));
    } else {
      dispatch(addTask(currentTask));
    }
    handleCloseDialog();
  };

  const handleEditTask = (index) => {
    setEditIndex(index);
    setCurrentTask(tasks[index]);
    handleOpenDialog();
  };

  const handleDeleteTask = (index) => {
    dispatch(deleteTask(index));
  };

  const handleMarkCompleted = (index) => {
    dispatch(toggleTaskCompletion(index));
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    dispatch(filterTasks(event.target.value));
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* Navbar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: '#1e293b',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Vuexy Clone
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#1f2937',
            color: '#fff',
          },
        }}
      >
        <Toolbar />
        <List>
          {['Dashboards'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, backgroundColor: '#f8fafc', height: '100vh' }}
      >
        <Toolbar />
        <Typography variant="h4">Task Manager</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Button variant="contained" onClick={handleOpenDialog}>
            Add Task
          </Button>
          <Select value={filter} onChange={handleFilterChange}>
            <MenuItem value="All">All Tasks</MenuItem>
            <MenuItem value="Completed">Completed Tasks</MenuItem>
            <MenuItem value="Pending">Pending Tasks</MenuItem>
            <MenuItem value="Overdue">Overdue Tasks</MenuItem>
          </Select>
        </Box>
        <List>
          {tasks.map((task, index) => (
            <ListItem key={index} sx={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox
                checked={task.completed}
                onChange={() => handleMarkCompleted(index)}
              />
              <ListItemText
                primary={task.title}
                secondary={`Due: ${task.dueDate}`}
                sx={{ textDecoration: task.completed ? 'line-through' : 'none' }}
              />
              <IconButton onClick={() => handleEditTask(index)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDeleteTask(index)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>

        {/* Task Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>{editIndex !== null ? 'Edit Task' : 'Add Task'}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Title"
              fullWidth
              value={currentTask.title}
              onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Description"
              fullWidth
              value={currentTask.description}
              onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Due Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={currentTask.dueDate}
              onChange={(e) => setCurrentTask({ ...currentTask, dueDate: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSaveTask}>Save</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default SidebarAndNavbar;
