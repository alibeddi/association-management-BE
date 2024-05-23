/**
 * @swagger
 * /admins/ban/{id}:
 *   post:
 *     summary: admin ban user
 *     tags:
 *       - BAN ⛔
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id to be banned
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               banExpiresAt:
 *                 type: date
 *           example:
 *             banExpiresAt: "2015-11-19"
 *     responses:
 *       200:
 *         description: OK
 */
