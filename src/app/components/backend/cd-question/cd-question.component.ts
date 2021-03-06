import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CdQuestionService } from 'src/app/services/backend/cd-question.service';
import {NgbAccordionConfig} from '@ng-bootstrap/ng-bootstrap';



import Swal from 'sweetalert2';
@Component({
  selector: 'app-cd-question',
  templateUrl: './cd-question.component.html',
  styleUrls: ['./cd-question.component.css'],
})
export class CdQuestionComponent implements OnInit {

  //https://stackoverflow.com/questions/35446955/how-to-go-back-last-page
  // https://viblo.asia/p/angular-reactive-forms-cach-su-dung-formarray-07LKXepkZV4
  constructor(
    config: NgbAccordionConfig,
    private route:ActivatedRoute,
    private CdQuestionService:CdQuestionService,
  ) {
    config.closeOthers = true;
    config.type = 'info';
  }
  page = 1;
  count = 0;
  tableSize = 8;
  tableSizes = [this.tableSize, 10 ,12,14,16,18,20 ];
  questions:Array <any>=[];
  cateForm: string = "";

  formValueAdd:FormGroup = new FormGroup({
    id : new FormControl(),
    text : new FormControl('',[Validators.required]),
    quiz_id : new FormControl(this.getIdSubject()),
    answers: new FormArray([])
  });
 
  answersArr = this.formValueAdd.get('answers') as FormArray;

  addArrAnwserAdd() {
    const group = new FormGroup({
      id: new FormControl(),
      text: new FormControl('',[Validators.required]),
      is_correct: new FormControl('false')
    });
    this.answersArr.push(group);
  }
  addArrAnwserEdit() {
    const group = new FormGroup({
      id: new FormControl(),
      text: new FormControl([Validators.required]),
      is_correct: new FormControl('false')
    });
   const answersArr = this.formValueAdd.get('answers') as FormArray;
    this.answersArr.push(group);
    answersArr.push(group);
  }


  removeArrAnwserAdd(index: number) {
    this.answersArr.removeAt(index);
  }
  removeArrAnwserEdit(index: number) {
    this.answersArr.removeAt(index);
    const answersArr = this.formValueAdd.get('answers') as FormArray;
    answersArr.removeAt(index)
  }
  ngOnInit(): void {
    this.listQuestion();
  }

  listQuestion(){
    this.CdQuestionService.getQuestionQuiz(this.getIdSubject()).subscribe({
      next:(res)=>{
        this.questions =res
        // console.log(res);
      },
      error:(err)=>{
      }
    })
  }
  getIdSubject(){
    return this.route.snapshot.paramMap.get('id_quiz');
  }
  create(){
    this.resetForm()
    this.cateForm = 'add';
    this.addArrAnwserAdd()
    this.addArrAnwserAdd()
  }
  store(){
    this.CdQuestionService.store(this.formValueAdd.value).subscribe((res:any)=>{
      this.listQuestion()
      this.resetForm()
      this.swalSuccess("Th??m m???i th??nh c??ng !")
    })
  }
  edit(id_question :any){
    this.resetForm()
    this.cateForm = 'edit';
    this.CdQuestionService.edit(id_question).subscribe( res=>{
      this.formValueAdd = new FormGroup({
        id : new FormControl( res.id),
        text : new FormControl( res.text),
        quiz_id : new FormControl(this.getIdSubject()),
        answers: new FormArray([])
      });
      for (let index = 0; index < res.answers.length; index++) {
        const key = res.answers[index];
        const group = new FormGroup({
          id: new FormControl(key.id),
          text: new FormControl(key.text),
          is_correct: new FormControl(key.is_correct)
        });
        const  answersArr = this.formValueAdd.get('answers') as FormArray;
        this.answersArr.push(group);
        answersArr.push(group);
      }
    });
  }
  update(){
    this.CdQuestionService.findId(this.formValueAdd.value.id).subscribe(res=>{
      this.CdQuestionService.update(this.formValueAdd.value.id ,this.formValueAdd.value).subscribe( res=>{
        this.resetForm();
        this.listQuestion();
        this.swalSuccess("C???p nh???p th??nh c??ng !")
      
      });
    })
  }

  destroy(id_question:any){
    Swal.fire({
      title: 'B???n c?? ch???c mu???n lo???i b??? ?',
      text: 'B???n s??? kh??ng th??? kh??i ph???c t???p n??y !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'CHU???N !',
      cancelButtonText: 'Th??i , tao ?????i ?? !'
    }).then((result) => {
      if (result.value) {
         this.CdQuestionService.destroy(id_question).subscribe(res=>{
          this.listQuestion()
          this.resetForm()
          this.swalSuccess("X??a th??nh c??ng !")
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          '???? h???y',
          'T???p v???n c??n nha :)',
          'error'
        )
      }
    })
   
  }
  changeTextarea(e:any){
    console.log(e.target.value);
  }

  resetForm(){
   this. formValueAdd = new FormGroup({
      id : new FormControl(),
      text : new FormControl(),
      quiz_id : new FormControl(this.getIdSubject()),
      answers: new FormArray([])
    });
   this.answersArr = this.formValueAdd.get('answers') as FormArray;
  }
  swalSuccess(text:any){
    Swal.fire({
      icon: 'success',
      title: text,
      showConfirmButton: true,
      timer: 1500
    })
  }
  onTableDataChange(event:any){
    this.page = event;
    this.listQuestion();
  }  
  onTableSizeChange(event:any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.listQuestion();
  }  
}
