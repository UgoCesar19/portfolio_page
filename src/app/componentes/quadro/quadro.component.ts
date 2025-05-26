import { Component } from '@angular/core';
import { AfterViewInit } from '../../../../node_modules/@angular/core/index';

@Component({
  selector: 'app-quadro',
  imports: [],
  templateUrl: './quadro.component.html',
  styleUrl: './quadro.component.css',
  host: {
    'class': 'd-block position-relative w-100 h-100'
  }
})
export class QuadroComponent implements AfterViewInit {

  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private nightBg = new Image();

  private viewerX = 100;
  private velocity = 0;
  private isMoving = false;
  
  private readonly MOVE_SPEED = 4;
  private readonly ANIMATION_DURATION_MS = 1000;
  
  constructor() {}

  public ngAfterViewInit(): void {
    this.canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.canvas.width = window.innerWidth;
    this.canvas.height = 1024;

    this.nightBg.src = 'assets/night-background.png';
    
    requestAnimationFrame(() => this.animate());
  }

  public moveCharacter(direction: number): void {
    this.velocity = direction * this.MOVE_SPEED;
    this.isMoving = true;
    setTimeout(() => { 
      this.isMoving = false;
      this.velocity = 0;
    }, this.ANIMATION_DURATION_MS);
  }

  private animate(): void {

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawBackground(this.nightBg);

    if (this.isMoving) {
      if ((this.velocity > 0) && (this.viewerX + this.velocity >= this.nightBg.width)) {
        this.viewerX = this.viewerX - this.nightBg.width;
      }
      if ((this.velocity < 0) && (this.viewerX - this.velocity <= -this.nightBg.width)) {
        this.viewerX = this.viewerX + this.nightBg.width;
      }
      this.viewerX += this.velocity;
    }

    requestAnimationFrame(() => this.animate());
  }

  private drawBackground(bg: HTMLImageElement): void {
    this.ctx.drawImage(bg, -this.viewerX - (bg.width * 2), 0);
    this.ctx.drawImage(bg, -this.viewerX - bg.width, 0);
    this.ctx.drawImage(bg, -this.viewerX, 0);
    this.ctx.drawImage(bg, -this.viewerX + bg.width, 0);
    this.ctx.drawImage(bg, -this.viewerX + (bg.width * 2), 0);
  }

}