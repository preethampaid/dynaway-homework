export interface Asset {
  id: string
  type: string
  name: string
  locationId: string
  locationName: string
  image?: string
}

export interface AssetResponseModel {
  ok: boolean,
  data: Asset[]
}