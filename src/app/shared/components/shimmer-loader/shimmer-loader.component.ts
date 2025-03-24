import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-shimmer-loader',
  templateUrl: './shimmer-loader.component.html',
  styleUrl: './shimmer-loader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShimmerLoaderComponent {}
