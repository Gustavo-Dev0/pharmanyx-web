import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { Dialog } from './dialog';

describe('Dialog', () => {
  let service: Dialog;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()]
    });
    service = TestBed.inject(Dialog);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
