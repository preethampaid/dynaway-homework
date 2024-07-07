import { Component } from '@angular/core'
import { Asset } from '../shared/models/asset.model'
import { AssetService } from '../shared/services/asset.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  assets: Asset[] = [];
  skeletonList: Asset[] = Array(6).fill(undefined);
  isAlertOpen: boolean = false;
  alertHeader: string = 'Error';
  alertMessage: string = 'An unexpected error has occured. Please try again after some time.';
  alertButtons = ['OK'];

  constructor(private assetService: AssetService) {}

  ionViewWillEnter(): void {
    this.assets = [];
    this.assetService.getAll().subscribe({
      next: (assets) => {
        if (assets.ok) {
          this.assets = assets.data;
        }
      },
      error: () => {
        this.manageAlertVisibility(true);
      }
    });
  }

  manageAlertVisibility(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  get displayedAssets() {
    return this.assets.length > 0 ? this.assets : this.skeletonList;
  }
}
