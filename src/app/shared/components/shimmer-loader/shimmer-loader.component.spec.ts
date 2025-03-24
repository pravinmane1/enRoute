import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShimmerLoaderComponent } from './shimmer-loader.component';

describe('DropdownShimmerComponent', () => {
  let component: ShimmerLoaderComponent;
  let fixture: ComponentFixture<ShimmerLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShimmerLoaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShimmerLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
