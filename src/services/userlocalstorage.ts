import { User } from "../models/usermodel";

export class UserLocalStorage {
  
  static getUser(): User | null {
    const userJson = localStorage.getItem("user");
    if (!userJson) {
      return null;
    }
    
    try {
      const user = JSON.parse(userJson) as User;
      return user;
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      return null;
    }
  }  
}