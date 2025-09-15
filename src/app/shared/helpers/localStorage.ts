export class LocalStorage {
  static salt = 'PATNUC';

  // 🔑 Clés uniformisées pour l'application
  static readonly TOKEN_KEY = 'PATNUC_space_token';
  static readonly USER_KEY = 'PATNUC_user';

  /**
   * Encrypt data and save it in local storage
   * @param label Label of stored item
   * @param data Stringified data to be stored
   */
  static setItem(label: string, data: string): void {
    localStorage.setItem(label, this.encrypt(data));
  }

  /**
   * Encrypt data
   * @param data Stringified data to be stored
   */
  static encrypt(data: string): string {
    data = data + this.salt;
    return btoa(unescape(encodeURIComponent(data)));
  }

  /**
   * Decrypt data
   * @param data Stringified data stored
   */
  static decrypt(data: string): string {
    data = decodeURIComponent(escape(window.atob(data)));
    return data.replace(this.salt, '');
  }

  /**
   * Get an item from local storage
   * @param label Label of element to be extracted
   */
  static getItem(label: string): string | null {
    const data = window.localStorage.getItem(label);
    if (data != null) {
      return this.decrypt(data);
    }
    return null;
  }

  /**
   * Remove an element from local storage
   * @param label Label of the element to remove
   */
  static delete(label: string): void {
    localStorage.removeItem(label);
  }

  /**
   * Helpers to save/retrieve token and user
   */
  static saveToken(token: string): void {
    this.setItem(this.TOKEN_KEY, token);
  }

  static getToken(): string | null {
    return this.getItem(this.TOKEN_KEY);
  }

  static saveUser(user: any): void {
    this.setItem(this.USER_KEY, JSON.stringify(user));
  }

  static getUser(): any {
    const data = this.getItem(this.USER_KEY);
    return data ? JSON.parse(data) : null;
  }

  static clearAll(): void {
    this.delete(this.TOKEN_KEY);
    this.delete(this.USER_KEY);
  }
}
