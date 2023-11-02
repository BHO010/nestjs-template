import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAccessAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for examp"le, call super.logIn(request) to establish a session.
    //console.log("context", context)
    return super.canActivate(context);
  }
  handleRequest(err, user, info) {
    console.log("err", err)
    console.log("user", user)
    console.log("info", info)
    // You can throw an exception based on either "info" or "err" arguments
    if(info && info.toString().includes("TokenExpiredError")) {
      throw new UnauthorizedException(info ? info.toString() : '');
    }
    if (err || !user) {
      throw err || new UnauthorizedException(info ? info.toString() : '');
    }
    return user;
  }
}
