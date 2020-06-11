import { Component, OnInit } from '@angular/core';
import { Reviews } from '../../shared/reviews';
import { ReviewsService } from '../../service/reviews.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as $ from "jquery";
import { CafecapgeminiComponentBase } from '../../CafeCapgemini-component';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent extends CafecapgeminiComponentBase implements OnInit {
  reviews: Reviews[] = [];
  showReviewsSpinner: boolean = false;
  viewReviewsCheckBoxes: any;

  sortBy: string = "review_date";
  sortDirection: string = "ASC";

  newReviewsForm: FormGroup;
  newReviewsDisabled: boolean = false;
  newReviewsFormErrorMessages: any;

  editReviewsForm: FormGroup;
  editReviewsDisabled: boolean = false;
  editReviewsFormErrorMessages: any;

  deleteReviewsForm: FormGroup;
  deleteReviewsDisabled: boolean = false;

  constructor(private reviewsService: ReviewsService) {
    super();
    this.newReviewsForm = new FormGroup({
      empId: new FormControl(null),
      rating_id: new FormControl(null),
      review_date: new FormControl(null, [Validators.required]),
      rating: new FormControl(null, [Validators.required, Validators.pattern(/^[1-5]$/)]),
      review: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(40)]),
      review_type: new FormControl(null, [Validators.required]),
      cafe_id: new FormControl(null, [Validators.required]),
      cafe_location: new FormControl(null, [Validators.required]),
      item_id: new FormControl(null, [Validators.required]),
      item_name: new FormControl(null, [Validators.required]),
    });

    this.newReviewsFormErrorMessages = {     
      review_date: { required: "Review Date can't be blank" },
      rating: { required: "Rating can't be blank", pattern: "Should be between 1-5" },
      review: { required: "review can't be blank", pattern: "It should be 4-40 characters long " },
      review_type: { required: "review_type can't be blank" },
      cafe_id: { required: "cafe_id can't be blank" },
      cafe_location: { required: "cafe_location can't be blank" },
      item_id: { required: "item_id can't be blank" },
      item_name: { required: "item_name can't be blank" },
    };



    this.editReviewsForm = new FormGroup({
      empId: new FormControl(null),
      rating_id: new FormControl(null),
      review_date: new FormControl(null, [Validators.required]),
      rating: new FormControl(null, [Validators.required, Validators.pattern(/^[1-5]$/)]),
      review: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(40)]),
      review_type: new FormControl(null, [Validators.required]),
      cafe_id: new FormControl(null, [Validators.required]),
      cafe_location: new FormControl(null, [Validators.required]),
      item_id: new FormControl(null, [Validators.required]),
      item_name: new FormControl(null, [Validators.required]),
    });

    this.editReviewsFormErrorMessages = {
      review_date: { required: "Review Date can't be blank" },
      rating: { required: "Rating can't be blank", pattern: "Should be between 1-5" },
      review: { required: "review can't be blank", pattern: "It should be 4-40 characters long " },
      review_type: { required: "review_type can't be blank" },
      cafe_id: { required: "cafe_id can't be blank" },
      cafe_location: { required: "Review Date can't be blank" },
      item_id: { required: "Review Date can't be blank" },
      item_name: { required: "Review Date can't be blank" },
    };

    this.viewReviewsCheckBoxes = {
      empId:true,
      review_date: true,
      rating: true,
      review: true,
      cafe_id: true,
      cafe_location: true,
      item_id: true,
      item_name: true,



    };

    this.deleteReviewsForm = new FormGroup({
      empId: new FormControl(null),
      rating_id: new FormControl(null),
      review: new FormControl(null),
      review_date: new FormControl(null)
    });
  }

  // ngOnInit()
  // {
  //   this.showReviewsSpinner = true;
  //   this.reviewsService.GetAllReviews().subscribe((response) =>
  //   {
  //     this.reviews = response;
  //     this.showReviewsSpinner = false;
  //   }, (error) =>
  //     {
  //       console.log(error);
  //     })
  // }


  ngOnInit() {
    this.showReviewsSpinner = true;
    var empId: number = JSON.parse(localStorage.getItem('empId'));
    var empType: string = localStorage.getItem('empType');
    if (empType == "ADMIN") {
      this.reviewsService.GetAllReviews().subscribe((response) => {
        if (response != null && response.length > 0) {
          this.reviews = response;
        }
        this.showReviewsSpinner = false;
      }, (error) => {
        console.log(error);
      })
    }
    else {
      this.reviewsService.GetReviewByEmpId(empId).subscribe((response) => {
        if (response != null && response.length > 0) {
          this.reviews = response;
        }
        this.showReviewsSpinner = false;
      }, (error) => {
        console.log(error);
      })
    }
  }

  onCreateReviewsClick() {
    this.newReviewsForm.reset();
    this.newReviewsForm["submitted"] = false;
  }

  onAddReviewsClick(event) {
    this.newReviewsForm["submitted"] = true;
    if (this.newReviewsForm.valid) {
      this.newReviewsDisabled = true;
      var reviews: Reviews = this.newReviewsForm.value;

      this.reviewsService.AddReview(reviews).subscribe((addResponse) => {
        this.newReviewsForm.reset();
        $("#btnAddReviewsCancel").trigger("click");
        this.newReviewsDisabled = false;
        this.showReviewsSpinner = true;

        this.reviewsService.GetAllReviews().subscribe((getResponse) => {
          this.showReviewsSpinner = false;
          this.reviews = getResponse;
        }, (error) => {
          console.log(error);
        });
      },
        (error) => {
          console.log(error);
          this.newReviewsDisabled = false;
        });
    }
    else {
      super.getFormGroupErrors(this.newReviewsForm);
    }
  }



  getFormControlCssClass(formControl: FormControl, formGroup: FormGroup): any {
    return {
      'is-invalid': formControl.invalid && (formControl.dirty || formControl.touched || formGroup["submitted"]),
      'is-valid': formControl.valid && (formControl.dirty || formControl.touched || formGroup["submitted"])
    };
  }

  getFormControlErrorMessage(formControlName: string, validationProperty: string): string {
    return this.newReviewsFormErrorMessages[formControlName][validationProperty];
  }

  getCanShowFormControlErrorMessage(formControlName: string, validationProperty: string, formGroup: FormGroup): boolean {
    return formGroup.get(formControlName).invalid && (formGroup.get(formControlName).dirty || formGroup.get(formControlName).touched || formGroup['submitted']) && formGroup.get(formControlName).errors[validationProperty];
  }



  onEditReviewsClick(index) {
    this.editReviewsForm.reset();
    this.editReviewsForm["submitted"] = false;
    this.editReviewsForm.patchValue({
      empId: this.reviews[index].empId,
      rating_id: this.reviews[index].rating_id,
      review_date: this.reviews[index].review_date,
      rating: this.reviews[index].rating,
      review: this.reviews[index].review,
      review_type: this.reviews[index].review_type,
      cafe_id: this.reviews[index].cafe_id,
      cafe_location: this.reviews[index].cafe_location,
      item_id: this.reviews[index].item_id,
      item_name: this.reviews[index].item_name,

    });
  }

  onUpdateReviewsClick(event) {
    this.editReviewsForm["submitted"] = true;
    if (this.editReviewsForm.valid) {
      this.editReviewsDisabled = true;
      var reviews: Reviews = this.editReviewsForm.value;

      this.reviewsService.UpdateReview(reviews, reviews.rating_id).subscribe((updateResponse) => {
        this.editReviewsForm.reset();
        $("#btnUpdateReviewsCancel").trigger("click");
        this.editReviewsDisabled = false;
        this.showReviewsSpinner = true;

        this.reviewsService.GetAllReviews().subscribe((getResponse) => {
          this.showReviewsSpinner = false;
          this.reviews = getResponse;
        }, (error) => {
          console.log(error);
        });
      },
        (error) => {
          console.log(error);
          this.editReviewsDisabled = false;
        });
    }
    else {
      super.getFormGroupErrors(this.editReviewsForm);
    }
  }



  onDeleteReviewsClick(index) {
    this.deleteReviewsForm.reset();
    this.deleteReviewsForm["submitted"] = false;
    this.deleteReviewsForm.patchValue({

      empId: this.reviews[index].empId,
      rating_id: this.reviews[index].rating_id,
      review: this.reviews[index].review,
      review_date: this.reviews[index].review_date
    });
  }

  onDeleteReviewsConfirmClick(event) {
    this.deleteReviewsForm["submitted"] = true;
    if (this.deleteReviewsForm.valid) {
      this.deleteReviewsDisabled = true;
      var reviews: Reviews = this.deleteReviewsForm.value;

      this.reviewsService.DeleteReview(reviews.rating_id).subscribe((deleteResponse) => {
        this.deleteReviewsForm.reset();
        $("#btnDeleteReviewsCancel").trigger("click");
        this.deleteReviewsDisabled = false;
        this.showReviewsSpinner = true;

        this.reviewsService.GetAllReviews().subscribe((getResponse) => {
          this.showReviewsSpinner = false;
          this.reviews = getResponse;
        }, (error) => {
          console.log(error);
        });
      },
        (error) => {
          console.log(error);
          this.deleteReviewsDisabled = false;
        });
    }
    else {
      super.getFormGroupErrors(this.deleteReviewsForm);
    }
  }



  onViewSelectAllClick() {
    for (let propertyName of Object.keys(this.viewReviewsCheckBoxes)) {
      this.viewReviewsCheckBoxes[propertyName] = true;
    }
  }

  onViewDeselectAllClick() {
    for (let propertyName of Object.keys(this.viewReviewsCheckBoxes)) {
      this.viewReviewsCheckBoxes[propertyName] = false;
    }
  }

  onBtnSortClick() {
    this.reviews.sort((a, b) => {
      let comparison = 0;
      let value1 = ((typeof a[this.sortBy]) == 'string') ? a[this.sortBy].toUpperCase() : a[this.sortBy];
      let value2 = ((typeof b[this.sortBy]) == 'string') ? b[this.sortBy].toUpperCase() : b[this.sortBy];

      if (this.sortBy == "creationDateTime" || this.sortBy == "lastModifiedDateTime") {
        var tt = value1.split("/");
        var d1 = new Date(tt[2], tt[1], tt[0]);
        tt = value2.split("/");
        var d2 = new Date(tt[2], tt[1], tt[0]);
        if (d2 > d1) comparison = -1;
        else comparison = 1;
      }
      else {
        if (value1 < value2) {
          comparison = -1;
        }
        else if (value1 > value2) {
          comparison = 1;
        }
      }
      if (this.sortDirection == "DESC")
        comparison = comparison * -1;

      return comparison;
    });

  }
}



