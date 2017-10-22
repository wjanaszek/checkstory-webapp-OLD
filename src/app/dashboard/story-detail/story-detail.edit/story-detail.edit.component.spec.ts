import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryDetailEditComponent } from './story-detail.edit.component';

describe('StoryDetail.EditComponent', () => {
  let component: StoryDetailEditComponent;
  let fixture: ComponentFixture<StoryDetailEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryDetailEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
