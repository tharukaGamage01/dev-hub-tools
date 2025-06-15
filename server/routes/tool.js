const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
  createTool,
  getTools,
  updateTool,
  deleteTool,
} = require('../controllers/toolController');

router.use(protect); 

router.post('/', createTool);
router.get('/', getTools);
router.put('/:id', updateTool);
router.delete('/:id', deleteTool);

module.exports = router;
