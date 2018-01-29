import { Component } from '@angular/core';

@Component({
	selector :  'app-product-list',
	template : `
		<h2>Product List</h2>
		<hr/>
		<label>Product Name : </label>
		<input type="text" #txtProductName/>
		<input type="button" value="Add New" (click)="onAddNewClick(txtProductName.value)"/>
		<ol>
			<li *ngFor="let product of products">{{product}}</li>
		</ol>
	`
})
export class ProductListComponent{

	products : string[] = [];

	onAddNewClick(productName){
		this.products.push(productName);
	}
}