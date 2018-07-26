import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutEditorComponent } from './about-editor.component';

describe('AboutEditorComponent', () => {
  let component: AboutEditorComponent;
  let fixture: ComponentFixture<AboutEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
