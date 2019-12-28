/***********************************
 *  Dependencies
 ***********************************/
// import Router from 'koa-router';
import koa from 'koa';
import isUUID from 'is-uuid';
import debug from 'debug';
import db from '../db';

/***********************************
 *  Variables & Initializations
 ***********************************/
const logger = debug('user-service:router');

/***********************************
 *  Controllers
 ***********************************/
const getAllUsers = async (ctx: koa.Context, next: Function) => {
  try {
    const users = await db.users.getAll();
    ctx.body = users;
    ctx.response.status = 200;
    return;
  } catch (err) {
    logger(err);
    ctx.response.status = 500;
    ctx.body = 'error querying database';
  }
};

const getUserById = async (ctx: koa.Context, next: Function) => {
  const { id } = ctx.params;
  if (!id || !isUUID.v4(id)) {
    ctx.body = 'malformed request';
    ctx.response.status = 422;
    return;
  }
  try {
    const user = await db.users.getById(id);
    if (!user) {
      ctx.response.status = 200;
      ctx.body = {};
    } else {
      ctx.response.status = 200;
      ctx.body = user;
    }
    return;
  } catch (err) {
    logger(err);
    ctx.response.status = 500;
    ctx.body = 'error querying database';
    return;
  }
};

/***********************************
 *  Routing
 ***********************************/
export const path = '';
export const routing = [
  ['GET', '/all', getAllUsers],
  ['GET', '/id/:id', getUserById],
];

export default { path, routing };
