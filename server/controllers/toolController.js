const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create Tool

exports.createTool = async (req, res) => {
    const { name, description, url, category } = req.body;
    const userId = req.user?.userId;
  
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: Missing userId" });
    }
  
    try {
      const tool = await prisma.tool.create({
        data: {
          name,
          description,
          url,
          category,
          userId,
        },
      });
      res.status(201).json(tool);
    } catch (error) {
      res.status(500).json({ message: "Error creating tool", error: error.message });
    }
  };
  
  
// Get All Tools 
exports.getTools = async (req, res) => {
    const userId = req.user?.userId;
  
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: Missing userId" });
    }
  
    try {
      const tools = await prisma.tool.findMany({
        where: { userId }
      });
  
      res.status(200).json(tools);
    } catch (error) {
      res.status(500).json({ message: "Error fetching tools", error: error.message });
    }
  };
  
// Update Tool
exports.updateTool = async (req, res) => {
    const userId = req.user?.userId;
    const toolId = parseInt(req.params.id);
    const { name, description, url, category } = req.body;
  
    if (!userId) return res.status(401).json({ message: "Unauthorized" });
  
    try {

      const existing = await prisma.tool.findUnique({ where: { id: toolId } });
      if (!existing || existing.userId !== userId) {
        return res.status(403).json({ message: "Not allowed to update this tool" });
      }
  
      const updated = await prisma.tool.update({
        where: { id: toolId },
        data: { name, description, url, category },
      });
  
      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({ message: "Error updating tool", error: error.message });
    }
  };
  
// Delete Tool
exports.deleteTool = async (req, res) => {
    const userId = req.user?.userId;
    const toolId = parseInt(req.params.id);
  
    if (!userId) return res.status(401).json({ message: "Unauthorized" });
  
    try {
      const existing = await prisma.tool.findUnique({ where: { id: toolId } });
      if (!existing || existing.userId !== userId) {
        return res.status(403).json({ message: "Not allowed to delete this tool" });
      }
  
      await prisma.tool.delete({ where: { id: toolId } });
      res.status(204).send(); 
    } catch (error) {
      res.status(500).json({ message: "Error deleting tool", error: error.message });
    }
  };
  