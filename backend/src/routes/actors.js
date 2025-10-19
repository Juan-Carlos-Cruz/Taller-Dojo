import { Router } from 'express';
import { query } from '../db.js';
import { toCamel } from '../utils.js';

const router = Router();

/**
 * GET /api/actors?page=&limit=&search=
 * Respuesta: { data, total, pages, page, limit }
 */
router.get('/', async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page ?? '1', 10), 1);
    const limit = Math.max(parseInt(req.query.limit ?? '10', 10), 1);
    const search = (req.query.search ?? '').trim();

    const where = [];
    const params = [];
    if (search) {
      params.push(`%${search}%`);
      where.push(`last_name ILIKE $${params.length}`);
    }
    const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';

    // total
    const countSql = `SELECT COUNT(*)::int AS total FROM actors ${whereSql}`;
    const { rows: countRows } = await query(countSql, params);
    const total = countRows[0]?.total ?? 0;
    const pages = Math.max(Math.ceil(total / limit), 1);
    const offset = (page - 1) * limit;

    // data
    const dataSql = `
      SELECT id, first_name, last_name, last_update
      FROM actors
      ${whereSql}
      ORDER BY id ASC
      LIMIT $${params.length + 1} OFFSET $${params.length + 2};
    `;
    const { rows } = await query(dataSql, [...params, limit, offset]);

    const data = rows.map((r) => ({
      ...toCamel(r),
      filmCount: 0
    }));

    res.json({ data, total, pages, page, limit });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/actors/:id
 */
router.get('/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isInteger(id)) return res.status(400).json({ message: 'Invalid id' });

    const { rows } = await query(
      `SELECT id, first_name, last_name, last_update FROM actors WHERE id=$1`,
      [id]
    );
    if (!rows.length) return res.status(404).json({ message: 'Actor not found' });

    const actor = toCamel(rows[0]);
    res.json(actor);
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/actors
 * body: { firstName, lastName }
 */
router.post('/', async (req, res, next) => {
  try {
    const firstName = String(req.body?.firstName ?? '').trim();
    const lastName = String(req.body?.lastName ?? '').trim();
    if (!firstName || !lastName) {
      return res.status(400).json({ message: 'firstName and lastName are required' });
    }

    const { rows } = await query(
      `INSERT INTO actors(first_name, last_name)
       VALUES($1, $2)
       RETURNING id, first_name, last_name, last_update`,
      [firstName, lastName]
    );

    const actor = toCamel(rows[0]);
    res.status(201).json(actor);
  } catch (err) {
    next(err);
  }
});

/**
 * PUT /api/actors/:id
 */
router.put('/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isInteger(id)) return res.status(400).json({ message: 'Invalid id' });

    const firstName = String(req.body?.firstName ?? '').trim();
    const lastName = String(req.body?.lastName ?? '').trim();
    if (!firstName || !lastName) {
      return res.status(400).json({ message: 'firstName and lastName are required' });
    }

    const { rows } = await query(
      `UPDATE actors
       SET first_name=$1, last_name=$2
       WHERE id=$3
       RETURNING id, first_name, last_name, last_update`,
      [firstName, lastName, id]
    );

    if (!rows.length) return res.status(404).json({ message: 'Actor not found' });

    const actor = toCamel(rows[0]);
    res.json(actor);
  } catch (err) {
    next(err);
  }
});

/**
 * DELETE /api/actors/:id
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isInteger(id)) return res.status(400).json({ message: 'Invalid id' });

    const { rowCount } = await query(`DELETE FROM actors WHERE id=$1`, [id]);
    if (!rowCount) return res.status(404).json({ message: 'Actor not found' });

    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;
