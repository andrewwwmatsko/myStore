import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAccoutComponent } from './my-accout.component';

describe('MyAccoutComponent', () => {
  let component: MyAccoutComponent;
  let fixture: ComponentFixture<MyAccoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAccoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAccoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
