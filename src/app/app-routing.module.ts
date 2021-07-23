import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { NavResolver } from './pages/navResolver';
import {BtrabajoComponent} from './pages/btrabajo/btrabajo.component'


const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
  onSameUrlNavigation: 'reload',
  scrollOffset: [0, 0],
  useHash: false
};

const routes: Routes = [
  { path: '',   redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'about', component: AboutComponent},
  { path:'btrabajo', component: BtrabajoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})

export class AppRoutingModule {

  onActivate(event) {
    let scrollToTop = window.setInterval(() => {
        let pos = window.pageYOffset;
        if (pos > 0) {
            window.scrollTo(0, pos - 20); // how far to scroll on each step
        } else {
            window.clearInterval(scrollToTop);
        }
    }, 16);
}
}
