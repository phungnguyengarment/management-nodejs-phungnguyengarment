export type LevelState = 'Error' | 'Warning' | 'Success'

export interface StepRound {
  name: string
  type: LevelState
}

export interface ProductResponse {
  productID?: number
  productCode?: string
  quantityPO?: number
  dateOutputFCR?: string
  stepRounds: StepRound[]
  orderNumber?: number
}
