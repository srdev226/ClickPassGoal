import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FilterService } from './filter.service';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @Output() filterData = new EventEmitter<FormGroup>();

  filterForm = new FormGroup({
    search: new FormControl(''),
    fromAge: new FormControl(''),
    toAge: new FormControl(''),
    position: new FormControl('0'),
    fromHeight: new FormControl(''),
    toHeight: new FormControl(''),
    fromWeight: new FormControl(''),
    toWeight: new FormControl(''),
    video: new FormControl(false),
  });

  posicion: string;
  positionDatas: string[];
  is_details_loaded: boolean = false;

  constructor(private router: Router,
              private filterService: FilterService) {
    
  }

  onSubmit() {
    this.filterData.emit(this.filterForm);
    // console.log(this.filterForm.controls);
    // this.router.navigate(['/user-lists/', this.filterForm.controls]);
  }

  ngOnInit() {
    this.is_details_loaded = false;
    this.filterService.getPosition().subscribe(position => {
      this.positionDatas = position;
      console.log(position);
      this.is_details_loaded = true;
    })
  }

}
