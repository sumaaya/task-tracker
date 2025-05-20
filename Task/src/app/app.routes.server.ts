import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
      path: 'task/:id',
      renderMode:  RenderMode.Server,
  },

  {
    path: 'edit/:id' ,
    renderMode : RenderMode.Server,
  },


  {
    path: '**',
    renderMode: RenderMode.Prerender
  },

 
];
