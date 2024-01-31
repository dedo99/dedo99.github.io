import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { BlogComponent } from './blog/blog.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  {path: "post", component: PostDetailsComponent},
  {path: "homepage", component: HomepageComponent},
  {path: "blog", component: BlogComponent},
  {path: "about", component: AboutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
