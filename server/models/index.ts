import { Auth } from './Auth';
import { User } from './User';
import { Pet } from './Pet';
User.hasOne(Auth);
Auth.belongsTo(User);
User.hasMany(Pet);
Pet.belongsTo(User);

// Adjunto los models, configuro sus relaciones
// con sus claves foraneas y las exporto a los controllers

export { Auth, User, Pet };
