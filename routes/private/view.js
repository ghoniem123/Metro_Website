const db = require('../../connectors/db');
const roles = require('../../constants/roles');
const { getSessionToken } = require('../../utils/session');

const getUser = async function(req) {
  const sessionToken = getSessionToken(req);
  if (!sessionToken) {
    return res.status(301).redirect('/');
  }

  const user = await db.select('*')
    .from('se_project.sessions')
    .where('token', sessionToken)
    .innerJoin('se_project.users', 'se_project.sessions.userid', 'se_project.users.id')
    .innerJoin('se_project.roles', 'se_project.users.roleid', 'se_project.roles.id')
    .first();
  
  console.log('user =>', user)
  user.isNormal = user.roleid === roles.user;
  user.isAdmin = user.roleid === roles.admin;
  user.isSenior = user.roleid === roles.senior;

  return user;  
}

module.exports = function(app) {
  // Register HTTP endpoint to render /users page
  app.get('/dashboard', async function(req, res) {
    const user = await getUser(req);
    return res.render('dashboard', user);
  });

  // Register HTTP endpoint to render /users page
  app.get('/users', async function(req, res) {
    const users = await db.select('*').from('se_project.users');
    return res.render('users', { users });
  });

  app.get('/resetPassword', async function(req, res) {
    const user = await getUser(req);
    return res.render('resetpassword', user);
  });

  app.get('/prices', async function(req, res) {
    const user = await getUser(req);
    const stations = await db.select('*').from('se_project.stations');
    return res.render('prices', {user,stations});
  });

  app.get('/subscriptions', async function(req, res) {
    const user = await getUser(req);
    const sub = await db.select('*').from('se_project.subsription').where("userid",user.userid);
    return res.render('subscriptions', {user,sub});
  });
  
  app.get('/buysubscription', async function(req, res) {
    const user = await getUser(req);
    return res.render('buysubscription', user);
  });

  app.get('/viewtickets', async function(req, res) {
    const user = await getUser(req);
    const ticket = await db.select('*').from('se_project.tickets').where("userid",user.userid );
    return res.render('view_ticket', {user,ticket});
  });

  app.get('/tickets', async function(req, res) {
    const user = await getUser(req);
    return res.render('tickets',user);
  });
  app.get('/ticket_sub', async function(req, res) {
    const user = await getUser(req);
    return res.render('pay_ticket_sub',user);
    
  });
  app.get('/requests/refund', async function(req, res) {
    const user = await getUser(req);
    const refund = await db.select('*').from('se_project.refund_requests').where("userid",user.userid );
    return res.render('refundrequests', {user,refund});
  });
  app.get('/requests/senior', async function(req, res) {
    const user = await getUser(req);
    const senior = await db.select('*').from('se_project.senior_requests').where("userid",user.userid );
    return res.render('seniorrequest',{senior,user});
  });
  app.get('/rises/simulate', async function(req, res) {
    const user = await getUser(req);
    const upcoming = await db.select('*').from('se_project.rides').where("userid",user.userid ).where("status","upcoming");
    const completed = await db.select('*').from('se_project.rides').where("userid",user.userid ).where("status","completed");
    const stations = await db.select('*').from('se_project.stations');
    return res.render('rides',{upcoming,completed,user,stations});
  });
  // Register HTTP endpoint to render /courses page
  app.get('/manage/stations', async function(req, res) {
    const user = await getUser(req);
    const stations = await db.select('*').from('se_project.stations');
    return res.render('stations', {user, stations });
  });

  app.get('/manage/stations/create', async function(req, res) {
    const user = await getUser(req);
    return res.render('createStation', user);
  });


  app.get('/manage/stations/edit', async function(req, res) {
    const user = await getUser(req);
    const stationID = req.query.stationId;
    return res.render('updateStation', {user,stationID});
  });


  app.get('/requests/senior', async function(req, res) {
    const user = await getUser(req);
    const senior = await db.select('*').from('se_project.senior_requests').where("userid",user.userid );
    return res.render('seniorrequest',{senior,user});
  });

};