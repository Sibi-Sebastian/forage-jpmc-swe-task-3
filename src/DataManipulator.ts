import { ServerRespond } from './DataStreamer';

interface Row {
  price_abc: number,
  price_def: number,
  ratio: number,
  upper_bound: number,
  lower_bound: number,
  trigger_alert: number | undefined,
  timestamp: Date,
}

class DataManipulator {
  static generateRow(serverRespond: ServerRespond[]): Row {
    const priceABC = serverRespond[0].top_ask.price;
    const priceDEF = serverRespond[1].top_bid.price;
    const ratio = priceABC / priceDEF;
    const upperBound = 1.05;
    const lowerBound = 0.95;
    return {
      price_abc: priceABC,
      price_def: priceDEF,
      ratio: ratio,
      upper_bound: upperBound,
      lower_bound: lowerBound,
      trigger_alert: (ratio > upperBound || ratio < lowerBound) ? ratio : undefined,
      timestamp: serverRespond[0].timestamp,
    };
  }
}

export { DataManipulator, Row };
