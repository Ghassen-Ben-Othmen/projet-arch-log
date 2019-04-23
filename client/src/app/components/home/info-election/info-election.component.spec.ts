import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoElectionComponent } from './info-election.component';

describe('InfoElectionComponent', () => {
  let component: InfoElectionComponent;
  let fixture: ComponentFixture<InfoElectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoElectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoElectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
