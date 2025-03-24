import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/usermodel';
import { UserLocalStorage } from '../../services/userlocalstorage';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchService } from '../../services/searchservice';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  user!:User;

  searchQuery: string = '';

  constructor(private router:Router,private searchService: SearchService){}

  ngOnInit():void{
    this.user = UserLocalStorage.getUser() || new User();
  }

  blogCreateClicked(){
    this.router.navigate(['/blog-create']);
  }
  goToHome(){
    this.router.navigate(['/home']);
  }

  navigateToProfile(){
    this.router.navigate(['/profile']);
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['/home']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
  navigateToRegister(){
    this.router.navigate(['/register']);
  }

  authentication():boolean{

    if(!UserLocalStorage.getUser()){
      return false;
    }
    else
    return true;
  }

  onSearch() {
    this.searchService.updateSearchTerm(this.searchQuery);
  }

}
