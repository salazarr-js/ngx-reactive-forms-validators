import { Component } from '@angular/core';

export interface BucketInterface {
  name: string;
  budget: number;
  isExpanded: boolean;
  opt: string;

  bidding: any;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  buckets: Array<BucketInterface>;
  maxAccountBudget: number;
  accountBudget: number;

  constructor() {
    this.accountBudget    = 0;

    this.buckets = [{
      isExpanded: true,
      name: `Bucket #1`,
      budget: null,
      opt: null,
      bidding: {}
    }];
  }

  /** */
  addBucket(): void {
    this.buckets.forEach(bucket => {
      bucket.isExpanded = false;
    });

    this.buckets.push({
      isExpanded: true,
      name: `Bucket #${this.buckets.length + 1}`,
      budget: null,
      opt: null,
      bidding: {}
    });
  }

  /** */
  deleteBucket(index: number): void {
    this.buckets.splice(index, 1);
  }

  /** */
  toggleExpandedBucket(index: number, value: boolean): void {
    this.buckets[index].isExpanded = value;
  }

  /** */
  onBiddingChange(bucket: BucketInterface, index: number): void {
    this.buckets[index].bidding = {};
  }

  /** */
  recalculateAccountBudget(): void {
    this.accountBudget = this.buckets.reduce((prev, value) => prev + value.budget, 0);
  }

}
