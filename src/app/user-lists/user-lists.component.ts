import { Component, OnInit, OnChanges } from '@angular/core';
import { UserListsService } from './user-lists.service';
import { UserList } from "./user-lists";
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

class FilterForm {
	search: String;
	fromAge: String;
	toAge: String;
	position: String;
	fromHeight: String;
	toHeight: String;
	fromWeight: String;
	toWeight: String;
	video: String;
}

@Component({
  selector: 'app-user-lists',
  templateUrl: './user-lists.component.html',
  styleUrls: ['./user-lists.component.css']
})
export class UserListsComponent implements OnInit {
  filterForm: FilterForm;
	user_lists: UserList[];
	is_closed: boolean = false;
	selected_index = -1;
	is_details_loaded: boolean = false;

	constructor(
		private userListsService: UserListsService,
		private router: Router,
		private route: ActivatedRoute,
	) { 
		route.params.subscribe(val => {
			this.initialiseInvites();
		});
	}

	ngOnInit() {
			// this.router.events.subscribe((e: any) => {
			// 	// If it is a NavigationEnd event re-initalise the component
			// 	if (e instanceof NavigationEnd) {
			// 		this.router.navigated = false;
			// 		console.log('kkk');
			// 		this.initialiseInvites();
			// 	}
			// });
			// this.initialiseInvites();
	}

	initialiseInvites() {
		this.is_details_loaded = false;
		this.filterForm = new FilterForm;
		if (this.route.snapshot.params['search'])
			this.filterForm.search = this.route.snapshot.params['search'];
		if (this.route.snapshot.params['fromAge'])
			this.filterForm.fromAge = this.route.snapshot.params['fromAge'];
		if (this.route.snapshot.params['toAge'])
			this.filterForm.toAge = this.route.snapshot.params['toAge'];
		if (this.route.snapshot.params['position'])
			this.filterForm.position = this.route.snapshot.params['position'];
		if (this.route.snapshot.params['fromHeight'])
			this.filterForm.fromHeight = this.route.snapshot.params['fromHeight'];
		if (this.route.snapshot.params['toHeight'])
			this.filterForm.toHeight = this.route.snapshot.params['toHeight'];
		if (this.route.snapshot.params['fromWeight'])
			this.filterForm.fromWeight = this.route.snapshot.params['fromWeight'];
		if (this.route.snapshot.params['toWeight'])
    	this.filterForm.toWeight = this.route.snapshot.params['toWeight'];
		if (this.route.snapshot.params['video'])
			this.filterForm.video = this.route.snapshot.params['video'];
		this.userListsService.getUserLists(this.filterForm).subscribe(user_lists => {
			this.user_lists = user_lists;
			this.is_details_loaded = true;
			console.log(user_lists)}
		);
	}

	gotoUserProfile(jugador: UserList, i) {
		this.is_closed = true;
		this.selected_index = i;
		setTimeout(() => this.router.navigate(['/user-profile/', jugador.slug]), 1000);
	}

	getUbicacion(provincia, code) {
		if (provincia && code){
			return provincia + " " + code;
		}
		return "";
	}
}
	