export type TableTransaction = {
  From: string
  To: string
  creation_date: string
  offered_item_name?: string
  request_id: string
  requested_item_name?: string
}

export type ExchangeItem = {
  description: string
  price: number
  title: string
}
