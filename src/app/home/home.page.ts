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
        console.log('error');
      }
    });
  }
}
