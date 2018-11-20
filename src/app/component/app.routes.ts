import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { LoginComponent } from './authentication/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ArticleTaskComponent } from './tasks/articletask.component';

export const AppRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'task', component: ArticleTaskComponent },
    { path: '', redirectTo: '/login',  pathMatch: 'full' },
];
export const ROUTING: ModuleWithProviders = RouterModule.forRoot(AppRoutes);
