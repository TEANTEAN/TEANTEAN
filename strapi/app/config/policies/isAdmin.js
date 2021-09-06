module.exports = async (ctx, next) => {
  if (ctx.state.user.role.name === "Genyus Admin") {
    // Go to next policy or will reach the controller's action.
    return await next();
  }
  ctx.unauthorized(`Only Genyus Admins can perform this action!`);
};
