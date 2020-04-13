import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'covid';
  modoNoche: boolean = false;
  ngOnInit() {
  }

  public cambiarModo() {
    var cuerpoWeb = document.body;
    cuerpoWeb.classList.toggle('oscuro');
    if (cuerpoWeb.classList.value) {
      this.modoNoche = true;
    } else {
      this.modoNoche = false;
    }
  }
}
