import { registerAs } from "@nestjs/config";

/* this is specific to this module 
   We can not inject this file app module because if you do, it will be available to other modules too
*/

export default registerAs('profileConfig', () => ({
  
  apiKey: process.env.PROFILE_API_KEY,

}))