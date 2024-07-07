import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
import { AssetService } from '../shared/services/asset.service';
import { of, throwError } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let assetServiceMock: jasmine.SpyObj<AssetService>;

  beforeEach(waitForAsync(async () => {
    const assetServiceSpy = jasmine.createSpyObj('AssetService', ['getAll']);

    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot()],
      providers: [{ provide: AssetService, useValue: assetServiceSpy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    assetServiceMock = TestBed.inject(AssetService) as jasmine.SpyObj<AssetService>;

    fixture.detectChanges();
  }));

  it('should create home page', () => {
    expect(component).toBeTruthy()
  })

  it('should initialize with the correct default values', () => {
    expect(component.assets).toEqual([]);
    expect(component.isAlertOpen).toBeFalse();
    expect(component.alertHeader).toBe('Error');
    expect(component.alertMessage).toBe('An unexpected error has occured. Please try again after some time.');
    expect(component.alertButtons).toEqual(['OK']);
    expect(component.skeletonList).toEqual(Array(6).fill(undefined));
  });

  it('should populate assets on successful response', () => {
    const assets = [{
      id: 'string',
      type: 'string',
      name: 'string',
      locationId: 'string',
      locationName: 'string'
    }];
    assetServiceMock.getAll.and.returnValue(of({ ok: true, data: assets }));

    component.ionViewWillEnter();

    expect(component.assets).toEqual(assets);
    expect(component.isAlertOpen).toBeFalse();
  });

  it('should open alert on error response', () => {
    assetServiceMock.getAll.and.returnValue(throwError('error'));

    component.ionViewWillEnter();

    expect(component.assets).toEqual([]);
    expect(component.isAlertOpen).toBeTrue();
  });

  it('should return assets if assets array is not empty', () => {
    const assets = [{
      id: 'string',
      type: 'string',
      name: 'string',
      locationId: 'string',
      locationName: 'string'
    }];
    component.assets = assets;

    expect(component.displayedAssets).toEqual(component.assets);
  });

  it('should return skeletonList if assets array is empty', () => {
    component.assets = [];

    expect(component.displayedAssets).toEqual(component.skeletonList);
  });

  it('should set alert visibility to true', () => {
    component.manageAlertVisibility(true);
    expect(component.isAlertOpen).toBeTrue();
  });

  it('should set alert visibility to false', () => {
    component.manageAlertVisibility(false);
    expect(component.isAlertOpen).toBeFalse();
  });
});
