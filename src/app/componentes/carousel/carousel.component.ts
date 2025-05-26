import { Component, ViewChild } from '@angular/core';
import { AnimationService } from '../../services/animation.service';
import { QuadroComponent } from '../quadro/quadro.component';

@Component({
  selector: 'app-carousel',
  imports: [QuadroComponent],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
  animations: [AnimationService.getAnimationTrigger()]
})
export class CarouselComponent {

  @ViewChild(QuadroComponent) quadroComponent!: QuadroComponent;

  public items: {
    image: string; 
    link: string; 
    label: string 
  }[] = [
    {
      image: 'assets/xixgamestudio.png',
      link: 'https://play.google.com/pc-store/games/details?id=br.com.ugo.quemcomquem&hl=pt_BR',
      label: 'XIX Game Studio'
    },
    {
      image: 'assets/work.jpeg',
      link: 'https://www.linkedin.com/in/ugo-c%C3%A9sar-de-oliveira-moreira-243887a7/details/experience/',
      label: 'Professional Experience'
    },
    {
      image: 'assets/academic.jpeg',
      link: 'https://www.linkedin.com/in/ugo-c%C3%A9sar-de-oliveira-moreira-243887a7/details/education/',
      label: 'Academic Path'
    },
    {
      image: 'assets/github.png',
      link: 'https://github.com/UgoCesar19',
      label: 'GitHub Page'
    }
  ];

  public indice: number = 0;

  constructor(private animationService: AnimationService) {}

  public getState(index: number): string {
    return this.animationService.getState(index, this.indice, this.items.length);
  }

  public anterior() {
    if (this.indice === 0) {
      this.indice = this.items.length - 1;
    } else {
      this.indice -= 1;
    }
    console.log(this.indice);
    this.quadroComponent.moveCharacter(-1);
  }

  public proximo() {
    if (this.indice === this.items.length - 1) {
      this.indice = 0;
    } else {
      this.indice += 1;
    }
    console.log(this.indice);
    this.quadroComponent.moveCharacter(1);
  }

}