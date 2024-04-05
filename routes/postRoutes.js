const express = require('express')
const postController = require('../controllers/postController')
const checkAuthMiddleware = require('../middleware/checkAuth')

const router = express.Router();

router.post('/', checkAuthMiddleware.checkAuth ,postController.save);
router.get('/', postController.index)
router.get('/:id', postController.show)
router.patch('/:id', checkAuthMiddleware.checkAuth ,postController.update)
router.delete('/:id', checkAuthMiddleware.checkAuth ,postController.destroy)

module.exports = router;