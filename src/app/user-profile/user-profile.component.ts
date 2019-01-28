import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserProfile } from '../user-profile/user-profile';
import { UserProfileService } from './user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  opened: boolean[] = [];
  jugador: UserProfile;
  slug: string;
  is_details_loaded = false;
  comeOutAnimation = "fadeIn";
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userProfileService: UserProfileService
  ) {
    route.params.subscribe(val => {
			this.format();
		});
  }

  ngOnInit() {
    for (let i = 0; i < 6; i ++) {
      this.opened.push(false);
    }
  }

  format(type = 0) {
    this.slug = this.route.snapshot.params['slug'];
    for (let i = 0; i < 6; i ++) {
      this.opened[i] = false;
    }
    // setInterval(() => this.opened[0] = true, 6000);
    this.is_details_loaded = false;
    this.userProfileService.getUserProfile(this.slug, type).subscribe(jugador => {
      this.jugador = jugador;
      console.log(this.jugador);
      this.is_details_loaded = true;
      this.slug = this.jugador.slug;
      setTimeout(() => this.opened[0] = true, 750);
      setTimeout(() => this.opened[4] = true, 1500);
      setTimeout(() => this.opened[5] = true, 2250);
    })
  }

  initialize(jugador) {

  }

  getUbicacion(provincia, code) {
		if (provincia && code){
			return provincia + " " + code;
		}
		return "";
  }
  
  formatHeight(num) {
    let str: string = num.toString();
    let retval = "";
    for (let i = str.length - 1; i >= 0; i --) {
      if ((str.length - i) == 3) retval = ',' + retval;
      retval = str[i] + retval;
    }
    return retval;
  }

  previousProfile() {
    this.userProfileService.getUserProfile(this.slug, 1).subscribe(jugador => {
      if (jugador.slug)
        this.router.navigate(['/user-profile/', jugador.slug])
    });
  }

  nextProfile() {
    this.userProfileService.getUserProfile(this.slug, 2).subscribe(jugador => {
      if (jugador.slug)
        this.router.navigate(['/user-profile/', jugador.slug])
    });
  }
}
