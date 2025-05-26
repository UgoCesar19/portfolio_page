import { CarouselComponent } from './componentes/carousel/carousel.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [CarouselComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'carrossel';
}