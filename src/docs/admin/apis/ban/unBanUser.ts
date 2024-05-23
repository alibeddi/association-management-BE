/**
 * @swagger
 * /admins/unban/{id}:
 *   post:
 *     summary: admin unban user
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id to be unbanned
 *     requestBody:
 *        required: false
 *     tags: [BAN ⛔]
 *     responses:
 *       200:
 *         description: OK
 */
