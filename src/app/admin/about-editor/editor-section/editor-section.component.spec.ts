import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorSectionComponent } from './editor-section.component';

describe('EditorSectionComponent', () => {
  let component: EditorSectionComponent<any>;
  let fixture: ComponentFixture<EditorSectionComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
