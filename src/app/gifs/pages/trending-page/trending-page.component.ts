import { AfterViewInit, Component, ElementRef, inject, viewChild } from '@angular/core';
import { GifService } from '../../services/gifs.service';
import { ScrollStateService } from 'src/app/shared/services/scroll-state.service';

@Component({
  selector: 'app-trending-page.component',
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent implements AfterViewInit {
  gifService = inject(GifService);
  scrollStateService = inject(ScrollStateService);

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;
    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();
  }

  onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;
    const scrollTop = scrollDiv.scrollTop; // cantidad de px de scroll para bajo que hemos hecho
    const clientHeight = scrollDiv.clientHeight; //px de altura del cliente (viewpoint)
    const scrollHeight = scrollDiv.scrollHeight; // el scroll que podemos hacer
    // Si suma de scrolltop y client height se acerca o supera el scrollheight, habrá que hace rla petición ya que estamos llegando al final
    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight; // los 300 px es de ventaja para la petición se haga antes del final
    this.scrollStateService.trendingScrollState.set(scrollTop);

    if (isAtBottom) {
      this.gifService.loadTrendingGifs();
    }
  }
}
