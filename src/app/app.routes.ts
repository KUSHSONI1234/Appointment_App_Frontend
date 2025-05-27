import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { AboutComponent } from './components/about/about.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';

export const routes: Routes = [
    {path:'',component:HomeComponent,pathMatch:'full'},
    {path:'home',component:HomeComponent},
    {
        path:'register',component:RegisterComponent
    },
    {
        path:'login',component:LoginComponent
    },
    {
        path:'my-profile',component:MyProfileComponent
    },
    {
        path:'about',component:AboutComponent
    },
    {
        path:'contact-us',component:ContactUsComponent
    }
];
