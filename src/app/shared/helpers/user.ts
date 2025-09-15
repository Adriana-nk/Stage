import { IUser } from "src/app/core/models/user.model";
import { LocalStorage } from './localStorage';

export class UserHelper {

  /**
   * Vérifie si un utilisateur est connecté
   */
  static isConnect(): boolean {
    return !!LocalStorage.getItem(LocalStorage.USER_KEY);
  }

  /**
   * Déconnexion : supprime les données de l'utilisateur et le token
   */
  static logoutUser(): void {
    LocalStorage.clearAll();
  }

  /**
   * Récupère l'utilisateur courant
   */
  static getUser(): IUser | null {
    const user = LocalStorage.getItem(LocalStorage.USER_KEY);
    if (!user) return null;
    try {
      return JSON.parse(user) as IUser;
    } catch (e) {
      console.error('Erreur parsing user depuis localStorage', e);
      return null;
    }
  }

  /**
   * Récupère l'ID de l'utilisateur courant
   */
  static getUserId(): string | number | null {
    const user = this.getUser();
    return user ? user.id : null;
  }

  /**
   * Récupère un paramètre spécifique de l'utilisateur
   */
  static getUserParam(param: string): any {
    const user = this.getUser();
    return user ? (user as any)[param] : null;
  }

  /**
   * Récupère le token de l'utilisateur
   */
  static getUserToken(): string | null {
    const token = LocalStorage.getToken();
    return token ? token : null;
  }

  /**
   * Sauvegarde l'utilisateur et le token
   */
  static saveUser(user: IUser, token: string): void {
    LocalStorage.saveUser(user);
    LocalStorage.saveToken(token);
  }
}
