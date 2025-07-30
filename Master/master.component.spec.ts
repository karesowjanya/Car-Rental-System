// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { MasterComponent } from './master.component';

// describe('MasterComponent', () => {
//   let component: MasterComponent;
//   let fixture: ComponentFixture<MasterComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [MasterComponent]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(MasterComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MasterComponent } from './master.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('MasterComponent', () => {
  let component: MasterComponent;
  let fixture: ComponentFixture<MasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MasterComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' }), // mock route params
            queryParams: of({}),       // mock query params if needed
            snapshot: {
              paramMap: {
                get: (key: string) => '123' // mock snapshot paramMap
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
