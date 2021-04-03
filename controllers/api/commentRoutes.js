//Import dependencies
const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//Create a new comment
router.post('/', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.create({
            comment_text: req.body.comment_text,
            user_id: req.session.user_id,
            post_id: req.session.post_id
        });

        res.status(200).json(commentData);

    } catch (err) {
        res.status(400).json(err);
    }
});

//Delete a comment
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }

        res.status(200).json(commentData);

    } catch (err) {
        res.status(500).json(err);
    }
});

//Update comment

module.exports = router;