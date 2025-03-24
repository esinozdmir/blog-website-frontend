import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { HomeComponent } from '../components/home/home.component';
import { BlogCreateComponent } from '../components/blog-create/blog-create.component';
import { PostDetailsComponent } from '../components/post-details/post-details.component';
import { ProfileComponent } from '../components/profile/profile.component';



export const routes: Routes = [
    {
        path:'', component:HomeComponent
    },
    {
        path:'login', component:LoginComponent
    },
    {
        path:'register',component:RegisterComponent
    },
    {
        path:'home',component:HomeComponent
    },
    {
        path:'blog-create',component:BlogCreateComponent
    },
    {
        path:'post-details',component:PostDetailsComponent
    },
    {
        path:'profile',component:ProfileComponent
    }

];
