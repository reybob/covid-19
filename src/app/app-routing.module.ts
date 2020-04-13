import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GraphicsComponent } from './graphics/graphics.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'graficas', component: GraphicsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
