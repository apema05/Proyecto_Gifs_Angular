import { Component, input } from '@angular/core';
import { GifListItemComponent } from '../gif-list-item/gif-list-item.component';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'gifs-list',
  imports: [GifListItemComponent],
  templateUrl: './gif-list.component.html',
})
export class GifListComponent {
  listaGifs = input.required<Gif[]>();
}
