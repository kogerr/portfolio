import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidelistComponent } from './slidelist.component';

describe('SlidelistComponent', () => {
  let component: SlidelistComponent;
  let fixture: ComponentFixture<SlidelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlidelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
